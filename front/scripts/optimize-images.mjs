#!/usr/bin/env node
/**
 * 이미지 최적화 산출물 생성기.
 *
 *   node scripts/optimize-images.mjs          변경분만 생성
 *   node scripts/optimize-images.mjs --force  전부 다시 생성
 *   node scripts/optimize-images.mjs --check  산출물이 최신인지만 확인 (CI용, 생성 안 함)
 *
 * 원칙
 * - 원본(public/images/**)은 절대 수정하지 않는다. 산출물은 public/images/optimized/** 에만 만든다.
 * - 각 이미지의 목표 해상도는 "실제 표시 폭 x 디바이스 픽셀비"다.
 *   모바일은 DPR 3, 데스크톱은 DPR 2 를 상한으로 본다(MOBILE_DPR / DESKTOP_DPR).
 *   한 파일이 여러 곳에서 쓰이면 가장 큰 사용처를 기준으로 한다. 그보다 작게 줄이면 화질 저하다.
 * - 원본 해상도를 넘겨 확대하지 않는다.
 * - 자산 성격에 따라 품질을 나눈다. 텍스트·로고가 든 그래픽을 손실 압축하면 글자 가장자리가 뭉개진다.
 *
 * 표시 폭 수치는 컴포넌트의 Tailwind 클래스 체인을 따라가 산정한 값이다.
 * 레이아웃을 바꿨다면 이 표도 함께 갱신해야 한다.
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { existsSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const SRC_DIR = path.join(PUBLIC_DIR, "images");
const OUT_DIR = path.join(PUBLIC_DIR, "images", "optimized");
const MANIFEST = path.join(ROOT, "src", "lib", "imageManifest.json");

const FORCE = process.argv.includes("--force");
const CHECK = process.argv.includes("--check");

/**
 * 표시 폭(CSS px) — [모바일, 데스크톱]. 브레이크포인트 경계는 Tailwind 의 pc(1024px)다.
 * 목록에 없는 파일은 소스에서 참조되지 않으므로 변환하지 않는다.
 * hover 확대(scale-105)나 object-cover 오버스캔이 있는 경우 그 값까지 반영한 수치다.
 */
const DISPLAY_WIDTH = {
  "case-thumb.jpg": [295, 430],
  "feature-bg-01.jpg": [364, 305],
  "feature-bg-02.jpg": [795, 378],
  "feature-bg-03.jpg": [450, 378],
  "feature-bg-04.jpg": [240, 189],
  "feature-bg-05.jpg": [240, 189],
  "footer-logo-partners.jpg": [600, 1662],
  "hero-portrait-main.png": [722, 1920],
  "hero-thumb-video-01.jpg": [335, 456],
  "hero-thumb-video-02.jpg": [335, 456],
  "icons/icon-ad.png": [28, 40],
  "icons/icon-labor.png": [26, 37],
  "icons/icon-manual.png": [28, 40],
  "icons/icon-path.png": [28, 40],
  "icons/icon-place.png": [28, 40],
  "icons/icon-reels.png": [28, 40],
  "icons/icon-review.png": [28, 40],
  "icons/icon-turnover.png": [28, 40],
  "instagram/franchise-1-thumb.png": [270, 337],
  "instagram/franchise-2-thumb.png": [270, 337],
  "instagram/franchise-3-thumb.png": [270, 337],
  "instagram/franchise-4-thumb.png": [270, 337],
  "instagram/franchise-5-thumb.png": [270, 337],
  "marketing/ad-operation.png": [295, 323],
  "marketing/market-analysis.png": [365, 399],
  "marketing/place-management.png": [295, 323],
  "mjsp-bg.png": [375, 375],
  "popup-franchise-status.png": [340, 360],
  "popup-franchise-status2.png": [340, 360],
  "receipt-bg-blur.jpg": [1079, 1920],
  "receipt-logo-colorful.png": [164, 215],
  "step-circle-01.jpg": [167, 257],
  "step-circle-02.jpg": [128, 212],
  "step-circle-03.jpg": [201, 318],
  "step-photo-lecture-02.jpg": [160, 160],
  "step-photo-lecture.jpg": [464, 464],
  "story-bg-food.jpg": [450, 1920],
  "system-bg.jpg": [1920, 1920],
};

/**
 * 자산군.
 * graphic  - 텍스트·로고가 든 그래픽. 손실 압축 시 글자가 뭉개진다.
 * textPhoto- 사진이지만 자막·문자가 얹혀 있다.
 * overlay  - 어두운 오버레이 아래 깔리는 배경. 품질을 낮춰도 보이지 않는다.
 * photo    - 일반 사진.
 */
const CLASS = {
  graphic: [
    /^popup-franchise-status/,
    /^icons\//,
    /^receipt-logo-colorful\.png$/,
    /^marketing\//,
  ],
  textPhoto: [/^hero-thumb-video/, /^footer-logo-partners\.jpg$/],
  overlay: [
    /^feature-bg-0[1-5]\.jpg$/,
    /^story-bg/,
    /^receipt-bg-blur\.jpg$/,
    /^system-bg\.jpg$/,
    /^mjsp-bg\.png$/,
  ],
};

const QUALITY = {
  graphic: { avif: 80, webp: 95, webpLossless: true },
  textPhoto: { avif: 70, webp: 90 },
  photo: { avif: 60, webp: 85 },
  overlay: { avif: 50, webp: 80 },
};

const LADDER = [640, 960, 1280, 1920, 2560, 3840];

/*
 * 디바이스 픽셀비 상한을 모바일과 데스크톱에 따로 둔다.
 * 요즘 아이폰 Pro 계열이 DPR 3 이라 모바일을 2 로 잡으면 그 기기들에서 원본보다 해상도가 낮아진다.
 * 반면 데스크톱 모니터는 사실상 DPR 1~2 라 3 배까지 만들면 아무도 받지 않는 거대한 변형만 남는다.
 */
const MOBILE_DPR = 3;
const DESKTOP_DPR = 2;
const IMG_EXT = new Set([".jpg", ".jpeg", ".png"]);

function classify(rel, format) {
  for (const [name, patterns] of Object.entries(CLASS)) {
    if (patterns.some((p) => p.test(rel))) {
      // 무손실은 원본이 PNG 일 때만 의미가 있다.
      // 원본이 이미 JPEG 면 손실을 거친 뒤라 무손실 재인코딩은 용량만 키운다.
      if (name === "graphic" && format !== "png") return "textPhoto";
      return name;
    }
  }
  return "photo";
}

/** 목표 해상도까지의 srcset 사다리. 원본을 넘겨 확대하지 않는다. */
function widthsFor(mobileWidth, desktopWidth, originalWidth) {
  const needed = Math.max(
    Math.ceil(mobileWidth * MOBILE_DPR),
    Math.ceil(desktopWidth * DESKTOP_DPR)
  );
  const cap = Math.min(needed, originalWidth);
  const set = new Set(LADDER.filter((w) => w < cap));
  set.add(cap);
  return [...set].sort((a, b) => a - b);
}

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === "optimized") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (IMG_EXT.has(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

const files = (await walk(SRC_DIR)).sort();
const manifest = {};
let generated = 0;
let stale = [];

// git 은 mtime 을 보존하지 않는다. 신선도 판정은 원본 내용 해시로 한다.
const prevManifest = existsSync(MANIFEST)
  ? JSON.parse(await readFile(MANIFEST, "utf8"))
  : {};

for (const file of files) {
  const rel = path.relative(SRC_DIR, file);
  const entry = DISPLAY_WIDTH[rel];
  if (!entry) continue; // 소스에서 참조되지 않는 파일
  const [mobileWidth, desktopWidth] = entry;

  const meta = await sharp(file).metadata();
  const cls = classify(rel, meta.format);
  const q = QUALITY[cls];
  const widths = widthsFor(mobileWidth, desktopWidth, meta.width);

  const key = "/images/" + rel;
  const sourceHash = createHash("sha256")
    .update(await readFile(file))
    .update(JSON.stringify({ widths, cls, q }))
    .digest("hex")
    .slice(0, 16);
  const unchanged = prevManifest[key]?.sourceHash === sourceHash;

  const base = rel.replace(/\.[^.]+$/, "");
  const outBase = path.join(OUT_DIR, base);
  await mkdir(path.dirname(outBase), { recursive: true });

  for (const w of widths) {
    for (const ext of ["avif", "webp"]) {
      const dest = `${outBase}-${w}.${ext}`;
      if (!FORCE && unchanged && existsSync(dest)) continue;
      if (CHECK) {
        stale.push(path.relative(ROOT, dest));
        continue;
      }
      const pipe =
        w < meta.width
          ? sharp(file).resize(w, null, { kernel: "lanczos3" })
          : sharp(file);
      const buf =
        ext === "avif"
          ? await pipe.avif({ quality: q.avif }).toBuffer()
          : await pipe
              .webp(q.webpLossless ? { lossless: true } : { quality: q.webp })
              .toBuffer();
      await writeFile(dest, buf);
      generated++;
    }
  }

  manifest[key] = {
    base: "/images/optimized/" + base,
    widths,
    sourceHash,
    // img 의 width/height 속성용. 실제 크기가 아니라 종횡비를 알려 CLS 를 막는 용도다.
    // 변형 크기를 쓰면 반올림 때문에 비율이 원본과 미세하게 달라져 레이아웃이 몇 px 밀린다.
    // 원본 치수를 그대로 쓰면 비율이 정확히 보존된다.
    width: meta.width,
    height: meta.height,
    // sizes 속성 생성용. 브레이크포인트마다 실제 표시 폭이 달라 모바일 전송량이 크게 줄어든다.
    mobileWidth,
    desktopWidth,
    class: cls,
  };
}

if (CHECK) {
  if (stale.length) {
    console.error(
      `이미지 산출물이 최신이 아닙니다 (${stale.length}건). npm run optimize:images 를 실행하세요.`
    );
    for (const s of stale.slice(0, 10)) console.error("  " + s);
    process.exit(1);
  }
  console.log("이미지 산출물이 최신입니다.");
  process.exit(0);
}

await mkdir(path.dirname(MANIFEST), { recursive: true });
const next = JSON.stringify(manifest, null, 2) + "\n";
const prev = existsSync(MANIFEST) ? await readFile(MANIFEST, "utf8") : "";
if (prev !== next) await writeFile(MANIFEST, next);

console.log(
  `이미지 ${Object.keys(manifest).length}개, 산출물 ${generated}건 생성.`
);
