// 이미지 최적화 유틸리티 함수들

// WebP 지원 여부 확인
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
};

// 이미지 경로를 최적화된 버전으로 변환
export const getOptimizedImagePath = (originalPath, options = {}) => {
  const { width, quality = 80, format = "webp" } = options;

  // 이미 최적화된 이미지인 경우
  if (originalPath.includes("/optimized/")) {
    return originalPath;
  }

  // 원본 이미지 경로에서 파일명 추출
  const pathParts = originalPath.split("/");
  const fileName = pathParts[pathParts.length - 1];
  const nameWithoutExt = fileName.split(".")[0];

  // 최적화된 이미지 경로 생성
  const optimizedPath = `/images/optimized/${nameWithoutExt}.${format}`;

  return optimizedPath;
};

// 반응형 이미지 소스셋 생성
export const getResponsiveImageSrcSet = (
  basePath,
  widths = [400, 800, 1200, 1920]
) => {
  return widths
    .map((width) => `${getOptimizedImagePath(basePath, { width })} ${width}w`)
    .join(", ");
};

// 이미지 프리로딩
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 중요 이미지들 프리로딩
export const preloadCriticalImages = async () => {
  const criticalImages = [
    "/images/optimized/main-logo.webp",
    "/images/optimized/main-highlight.webp",
    "/images/optimized/민지슈퍼전면1.webp",
  ];

  try {
    await Promise.all(criticalImages.map((img) => preloadImage(img)));
    console.log("✅ 중요 이미지 프리로딩 완료");
  } catch (error) {
    console.warn("⚠️ 이미지 프리로딩 실패:", error);
  }
};
