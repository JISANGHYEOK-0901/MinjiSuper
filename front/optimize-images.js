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

// 최적화할 이미지 목록
const imagesToOptimize = [
  // 대용량 이미지들 (WebP로 변환)
  {
    input: "public/images/con15-txt2-left.png",
    output: "public/images/optimized/con15-txt2-left.webp",
    quality: 75,
    width: 1920,
  },
  {
    input: "public/images/con16-txt1-left.png",
    output: "public/images/optimized/con16-txt1-left.webp",
    quality: 75,
    width: 1920,
  },
  {
    input: "public/images/con16-txt1-right.png",
    output: "public/images/optimized/con16-txt1-right.webp",
    quality: 75,
    width: 1920,
  },
  {
    input: "public/images/con9-background1.png",
    output: "public/images/optimized/con9-background1.webp",
    quality: 80,
    width: 1920,
  },
  {
    input: "public/images/con9-background2.png",
    output: "public/images/optimized/con9-background2.webp",
    quality: 80,
    width: 1920,
  },
  {
    input: "public/images/flipcard1.png",
    output: "public/images/optimized/flipcard1.webp",
    quality: 80,
    width: 800,
  },
  {
    input: "public/images/flipcard2.png",
    output: "public/images/optimized/flipcard2.webp",
    quality: 80,
    width: 800,
  },
  {
    input: "public/images/flipcard3.png",
    output: "public/images/optimized/flipcard3.webp",
    quality: 80,
    width: 800,
  },

  // 슬라이드 이미지들
  {
    input: "public/images/slide1.png",
    output: "public/images/optimized/slide1.webp",
    quality: 80,
    width: 800,
  },
  {
    input: "public/images/slide2.png",
    output: "public/images/optimized/slide2.webp",
    quality: 80,
    width: 800,
  },
  {
    input: "public/images/slide3.png",
    output: "public/images/optimized/slide3.webp",
    quality: 80,
    width: 800,
  },
  {
    input: "public/images/slide4.png",
    output: "public/images/optimized/slide4.webp",
    quality: 80,
    width: 800,
  },
  {
    input: "public/images/slide5.png",
    output: "public/images/optimized/slide5.webp",
    quality: 80,
    width: 800,
  },

  // 썸네일 이미지들
  {
    input: "public/images/shorts1-thumb.png",
    output: "public/images/optimized/shorts1-thumb.webp",
    quality: 85,
    width: 400,
  },
  {
    input: "public/images/shorts2-thumb.png",
    output: "public/images/optimized/shorts2-thumb.webp",
    quality: 85,
    width: 400,
  },
  {
    input: "public/images/shorts3-thumb.png",
    output: "public/images/optimized/shorts3-thumb.webp",
    quality: 85,
    width: 400,
  },
  {
    input: "public/images/shorts4-thumb.png",
    output: "public/images/optimized/shorts4-thumb.webp",
    quality: 85,
    width: 400,
  },

  // 배경 이미지들
  {
    input: "public/images/con2-row-image1.png",
    output: "public/images/optimized/con2-row-image1.webp",
    quality: 80,
    width: 1200,
  },
  {
    input: "public/images/con2-row-image2.png",
    output: "public/images/optimized/con2-row-image2.webp",
    quality: 80,
    width: 1200,
  },
  {
    input: "public/images/con4-right.png",
    output: "public/images/optimized/con4-right.webp",
    quality: 80,
    width: 800,
  },
  {
    input: "public/images/민지슈퍼전면1.png",
    output: "public/images/optimized/민지슈퍼전면1.webp",
    quality: 80,
    width: 1920,
  },
];

// 최적화 디렉토리 생성
const optimizedDir = "public/images/optimized";
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// 이미지 최적화 실행
async function runOptimization() {
  console.log("🔄 이미지 최적화를 시작합니다...\n");

  for (const image of imagesToOptimize) {
    await optimizeImage(image.input, image.output, {
      quality: image.quality,
      width: image.width,
      format: "webp",
    });
  }

  console.log("\n✅ 이미지 최적화가 완료되었습니다!");
  console.log(
    "📁 최적화된 이미지는 public/images/optimized/ 폴더에 저장되었습니다."
  );
}

runOptimization().catch(console.error);
