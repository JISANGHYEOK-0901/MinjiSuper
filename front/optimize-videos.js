const fs = require("fs");
const path = require("path");

// 비디오 최적화 정보 (실제 변환은 FFmpeg 필요)
const videoOptimizationInfo = [
  {
    input: "public/videos/shorts1.mp4",
    output: "public/videos/optimized/shorts1.mp4",
    currentSize: "5.6MB",
    targetSize: "2-3MB",
    optimization: "H.264, 720p, 30fps, 1.5Mbps",
  },
  {
    input: "public/videos/shorts2.mp4",
    output: "public/videos/optimized/shorts2.mp4",
    currentSize: "63MB",
    targetSize: "8-10MB",
    optimization: "H.264, 720p, 30fps, 2Mbps",
  },
  {
    input: "public/videos/shorts3.mp4",
    output: "public/videos/optimized/shorts3.mp4",
    currentSize: "13MB",
    targetSize: "4-5MB",
    optimization: "H.264, 720p, 30fps, 1.5Mbps",
  },
  {
    input: "public/videos/shorts4.mp4",
    output: "public/videos/optimized/shorts4.mp4",
    currentSize: "11MB",
    targetSize: "3-4MB",
    optimization: "H.264, 720p, 30fps, 1.5Mbps",
  },
];

// 최적화 디렉토리 생성
const optimizedVideoDir = "public/videos/optimized";
if (!fs.existsSync(optimizedVideoDir)) {
  fs.mkdirSync(optimizedVideoDir, { recursive: true });
}

console.log("🎬 비디오 최적화 가이드");
console.log("=====================================\n");

videoOptimizationInfo.forEach((video, index) => {
  console.log(`${index + 1}. ${path.basename(video.input)}`);
  console.log(`   현재 크기: ${video.currentSize}`);
  console.log(`   목표 크기: ${video.targetSize}`);
  console.log(`   최적화 설정: ${video.optimization}`);
  console.log(`   FFmpeg 명령어:`);
  console.log(
    `   ffmpeg -i "${video.input}" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -vf "scale=720:-1" "${video.output}"`
  );
  console.log("");
});

console.log("📋 수동 최적화 단계:");
console.log("1. FFmpeg 설치 (https://ffmpeg.org/download.html)");
console.log("2. 위의 명령어들을 터미널에서 실행");
console.log("3. 최적화된 비디오를 public/videos/optimized/ 폴더에 저장");
console.log("4. ShortsSlider.jsx에서 경로 업데이트");

// WebM 변환 가이드 (더 작은 파일 크기)
console.log("\n🌐 WebM 변환 (선택사항):");
console.log("WebM은 더 작은 파일 크기를 제공합니다:");
videoOptimizationInfo.forEach((video, index) => {
  const webmOutput = video.output.replace(".mp4", ".webm");
  console.log(
    `ffmpeg -i "${video.input}" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k -vf "scale=720:-1" "${webmOutput}"`
  );
});
