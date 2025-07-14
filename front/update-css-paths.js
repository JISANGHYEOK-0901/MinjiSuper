import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSS 파일에서 PNG 경로를 WebP로 변경하는 함수
function updateCSSPaths(cssFilePath) {
  try {
    let content = fs.readFileSync(cssFilePath, "utf8");
    let updated = false;

    // PNG 경로를 WebP로 변경
    const pngRegex = /url\(["']?\/images\/([^"']+)\.png["']?\)/g;
    const matches = content.match(pngRegex);

    if (matches) {
      content = content.replace(pngRegex, (match, imageName) => {
        // optimized 폴더에 해당 WebP 파일이 있는지 확인
        const webpPath = `public/images/optimized/${imageName}.webp`;
        if (fs.existsSync(webpPath)) {
          updated = true;
          return `url("/images/optimized/${imageName}.webp")`;
        }
        return match; // WebP 파일이 없으면 원본 유지
      });

      if (updated) {
        fs.writeFileSync(cssFilePath, content, "utf8");
        console.log(`✅ ${path.basename(cssFilePath)} 업데이트 완료`);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(
      `❌ ${path.basename(cssFilePath)} 업데이트 실패:`,
      error.message
    );
    return false;
  }
}

// 모든 CSS 파일 찾기
function getAllCSSFiles(dir) {
  const files = [];

  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && item.toLowerCase().endsWith(".css")) {
        files.push(fullPath);
      }
    }
  }

  scanDirectory(dir);
  return files;
}

// CSS 파일들 업데이트
async function updateAllCSSFiles() {
  console.log("🔄 CSS 파일의 이미지 경로를 업데이트합니다...\n");

  const cssFiles = getAllCSSFiles("src");
  let updatedCount = 0;

  for (const cssFile of cssFiles) {
    if (updateCSSPaths(cssFile)) {
      updatedCount++;
    }
  }

  console.log(`\n✅ 총 ${updatedCount}개 CSS 파일이 업데이트되었습니다.`);
  console.log("📝 이제 모든 이미지가 최적화된 WebP 버전을 사용합니다!");
}

updateAllCSSFiles().catch(console.error);
