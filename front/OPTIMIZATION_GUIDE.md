# 🚀 이미지 및 비디오 최적화 가이드

## 📊 현재 문제점

- **대용량 이미지**: 9MB+ 이미지들이 여러 개 존재
- **대용량 비디오**: shorts2.mp4가 63MB로 매우 큼
- **PNG 포맷**: WebP로 변환하면 70-80% 크기 감소 가능

## 🛠️ 최적화 단계

### 1단계: 의존성 설치

```bash
npm install
```

### 2단계: 이미지 최적화 실행

```bash
npm run optimize-images
```

- PNG → WebP 변환
- 이미지 리사이즈 (1920px 이하)
- 품질 최적화 (75-85%)

### 3단계: 비디오 최적화 (수동)

```bash
node optimize-videos.js
```

- FFmpeg 설치 필요
- 제공된 명령어로 비디오 압축

### 4단계: 최적화된 빌드

```bash
npm run build:optimized
```

## 📈 예상 성능 개선

### 이미지 최적화

| 파일명              | 현재 크기 | 최적화 후 | 감소율 |
| ------------------- | --------- | --------- | ------ |
| con15-txt2-left.png | 9.9MB     | ~2.5MB    | 75%    |
| con16-txt1-left.png | 8.7MB     | ~2.2MB    | 75%    |
| flipcard1.png       | 4.8MB     | ~1.2MB    | 75%    |
| slide1.png          | 4.0MB     | ~1.0MB    | 75%    |

### 비디오 최적화

| 파일명      | 현재 크기 | 최적화 후 | 감소율 |
| ----------- | --------- | --------- | ------ |
| shorts2.mp4 | 63MB      | ~8MB      | 87%    |
| shorts3.mp4 | 13MB      | ~4MB      | 69%    |
| shorts4.mp4 | 11MB      | ~3MB      | 73%    |

## 🎯 추가 최적화 팁

### 1. CDN 사용

```javascript
// Vercel의 경우 자동으로 CDN 제공
// 이미지 URL을 CDN으로 변경
const CDN_URL = "https://your-domain.vercel.app";
```

### 2. 이미지 지연 로딩 적용

```jsx
import LazyImage from './components/LazyImage/LazyImage';

// 기존
<img src="/images/slide1.png" alt="슬라이드 1" />

// 최적화 후
<LazyImage src="/images/optimized/slide1.webp" alt="슬라이드 1" />
```

### 3. 중요 이미지 프리로딩

```jsx
import { preloadCriticalImages } from "./utils/imageOptimizer";

useEffect(() => {
  preloadCriticalImages();
}, []);
```

### 4. 반응형 이미지 적용

```jsx
<img
  src="/images/optimized/slide1.webp"
  srcSet="/images/optimized/slide1-400.webp 400w,
          /images/optimized/slide1-800.webp 800w,
          /images/optimized/slide1-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="슬라이드 1"
/>
```

## 🔧 Vercel 최적화 설정

### vercel.json 추가

```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/videos/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 📱 모바일 최적화

### 1. 이미지 크기 조정

- 모바일: 400-800px
- 태블릿: 800-1200px
- 데스크톱: 1200-1920px

### 2. 비디오 품질 조정

- 모바일: 480p, 1Mbps
- 태블릿: 720p, 1.5Mbps
- 데스크톱: 720p, 2Mbps

## 🚨 주의사항

1. **원본 파일 백업**: 최적화 전 원본 파일들을 백업하세요
2. **품질 확인**: 최적화 후 이미지 품질을 확인하세요
3. **브라우저 호환성**: WebP는 IE에서 지원되지 않으므로 폴백 이미지 제공
4. **점진적 적용**: 한 번에 모든 이미지를 변경하지 말고 단계적으로 적용

## 📊 성능 모니터링

### Lighthouse 점수 개선 예상

- **Performance**: 60-70 → 90+
- **Best Practices**: 80-85 → 95+
- **SEO**: 90+ → 95+

### 로딩 시간 개선 예상

- **First Contentful Paint**: 3-4초 → 1-2초
- **Largest Contentful Paint**: 5-6초 → 2-3초
- **Cumulative Layout Shift**: 0.3-0.4 → 0.1 이하
