import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 이미지 최적화 함수
async function optimizeImage(inputPath, outputPath, options = {}) {
  const {
    quality = 80,
    width = null,
    height = null,
    format = "webp",
  } = options;

  try {
    let pipeline = sharp(inputPath);

    // 리사이즈
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // 포맷 변환 및 품질 설정
    if (format === "webp") {
      pipeline = pipeline.webp({ quality });
    } else if (format === "jpeg") {
      pipeline = pipeline.jpeg({ quality });
    } else if (format === "png") {
      pipeline = pipeline.png({ quality });
    }

    await pipeline.toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(1);

    console.log(
      `✅ ${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(
        1
      )}MB → ${(optimizedSize / 1024 / 1024).toFixed(1)}MB (${reduction}% 감소)`
    );
  } catch (error) {
    console.error(`❌ ${path.basename(inputPath)} 최적화 실패:`, error.message);
  }
}

// 모든 PNG 이미지 찾기
function getAllPNGFiles(dir) {
  const files = [];

  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && item !== "optimized") {
        scanDirectory(fullPath);
      } else if (stat.isFile() && item.toLowerCase().endsWith(".png")) {
        files.push(fullPath);
      }
    }
  }

  scanDirectory(dir);
  return files;
}

// 최적화할 이미지 목록 생성
const imagesDir = "public/images";
const pngFiles = getAllPNGFiles(imagesDir);

const imagesToOptimize = pngFiles.map((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  const fileName = path.basename(filePath, ".png");
  const outputPath = `public/images/optimized/${fileName}.webp`;

  // 이미지 크기에 따른 최적화 설정
  let width = 1920; // 기본값
  let quality = 80;

  // 특정 이미지들에 대한 맞춤 설정
  if (fileName.includes("thumb") || fileName.includes("short")) {
    width = 400;
    quality = 85;
  } else if (fileName.includes("slide")) {
    width = 800;
    quality = 80;
  } else if (fileName.includes("flipcard")) {
    width = 800;
    quality = 80;
  } else if (fileName.includes("background")) {
    width = 1920;
    quality = 75;
  } else if (
    fileName.includes("txt") ||
    fileName.includes("logo") ||
    fileName.includes("highlight")
  ) {
    width = 1200;
    quality = 85;
  }

  return {
    input: relativePath,
    output: outputPath,
    quality,
    width,
    format: "webp",
  };
});

// 최적화 디렉토리 생성
const optimizedDir = "public/images/optimized";
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// 이미지 최적화 실행
async function runOptimization() {
  console.log("🔄 모든 PNG 이미지 최적화를 시작합니다...\n");
  console.log(`📁 총 ${imagesToOptimize.length}개 이미지 발견\n`);

  for (const image of imagesToOptimize) {
    await optimizeImage(image.input, image.output, {
      quality: image.quality,
      width: image.width,
      format: image.format,
    });
  }

  console.log("\n✅ 모든 이미지 최적화가 완료되었습니다!");
  console.log(
    "📁 최적화된 이미지는 public/images/optimized/ 폴더에 저장되었습니다."
  );

  // CSS 업데이트 가이드 출력
  console.log("\n📝 CSS 업데이트 가이드:");
  console.log(
    "아래 명령어로 CSS 파일의 모든 PNG 경로를 WebP로 자동 변경할 수 있습니다:"
  );
  console.log("npm run update-css-paths");
}

runOptimization().catch(console.error);
