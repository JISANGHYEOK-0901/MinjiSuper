import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public/reviews/optimized";
const outputDir = "./public/reviews/optimized";

// 출력 디렉토리가 없으면 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;

    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(
      1
    );

    console.log(
      `${path.basename(inputPath)}: ${(originalSize / 1024).toFixed(1)}KB → ${(
        newSize / 1024
      ).toFixed(1)}KB (${reduction}% 감소)`
    );

    // 원본 PNG 파일 삭제
    fs.unlinkSync(inputPath);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log("리뷰 이미지 최적화 시작...\n");

  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.toLowerCase().endsWith(".png"));

  if (files.length === 0) {
    console.log("변환할 PNG 파일이 없습니다.");
    return;
  }

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.png$/i, ".webp"));
    await optimizeImage(inputPath, outputPath);
  }

  console.log("\n리뷰 이미지 최적화 완료!");
}

optimizeAllImages().catch(console.error);
