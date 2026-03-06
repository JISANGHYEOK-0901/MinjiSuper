# 픽셀 퍼펙트 웹사이트 퍼블리싱 요구사항 명세서

## 1. 글로벌 디자인 토큰 (Global Design Tokens)

### 1.1 뷰포트 (Viewport)

- **PC**: `max-width: 1920px` (콘텐츠 최대 너비 `1024px` 또는 `1200px`로 중앙 정렬)
- **Mobile**: `max-width: 390px` (iPhone 12/13/14 기준, 좌우 패딩 `20px`)

### 1.2 컬러 파레트 (Color Palette)

- **Primary Background (Dark)**: `#151515` (다크 그레이/블랙)
- **Primary Background (Light)**: `#F9F9F9` 또는 `#FFFFFF` (밝은 섹션 배경)
- **Point Color 1 (Yellow)**: `#FFD03B` (메인 CTA 버튼, 하이라이트 텍스트)
- **Point Color 2 (Red)**: `#D33535` (경고, 강조 텍스트, 영수증 섹션 라인)
- **Point Color 3 (Green)**: `#2A8741` (성공사례 카드의 뱃지 색상)
- **Text (Light)**: `#FFFFFF` (어두운 배경 위 기본 텍스트)
- **Text (Dark)**: `#222222` (밝은 배경 위 기본 텍스트)
- **Text (Muted)**: `#888888` (부가 설명 등 회색 텍스트)

### 1.3 타이포그래피 (Typography)

- **Font-family**: `Noto Sans KR` 또는 `Pretendard`
- **대제목 (H1/H2)**
  - PC: `40px` ~ `48px` (Font-weight: `800`)
  - Mobile: `24px` ~ `28px` (Font-weight: `800`)
- **중제목 (H3)**
  - PC: `24px` ~ `32px` (Font-weight: `700`)
  - Mobile: `18px` ~ `20px` (Font-weight: `700`)
- **본문 (Body)**
  - PC: `16px` ~ `18px` (Font-weight: `400` or `500`)
  - Mobile: `14px` ~ `15px` (Font-weight: `400` or `500`)
- **Line-height**: `1.5` ~ `1.6`

---

## 2. 공통 컴포넌트 스펙 (Component Specs)

### 2.1 버튼 (CTA Button - Yellow/Red)

- **형태**: Pill 타입 (`border-radius: 50px`)
- **Padding (PC)**: `16px 40px`
- **Padding (Mobile)**: `14px 24px` (width `100%` 꽉 차게 배치되는 경우 포함)
- **Box-shadow**: 노란색 버튼 하단에 미세한 drop-shadow 또는 어두운 border-bottom 적용하여 입체감 부여

### 2.2 성공 사례 카드 (Success Case Cards)

- **Background**: `#FFFFFF`
- **Border**: `1px solid #EAEAEA`
- **Border-radius**: `12px` ~ `16px`
- **Padding**: 내부 `24px`
- **상단 이미지 영역**: 비율 약 `16:9`, 상단 모서리만 `border-radius` 적용

---

## 3. 주요 섹션별 레이아웃 및 간격 (Layout & Spacing)

### 3.1 공통 간격 규칙

- **섹션 간 마진 (Section Margin)**: PC `120px` / Mobile `60px` ~ `80px`
- **요소 간 간격 (Gap)**: 큰 그룹 간 `40px`, 텍스트 간 `12px` ~ `16px`

### 3.2 Section A: 상단 히어로 & 영상 영역 (Dark Theme)

- **배경**: `#151515`
- **레이아웃**: `flex-col`, 중앙 정렬 (`align-items: center`)
- **영상 비율**: `16:9` 유튜브 임베드 형태
- **Mobile**: 영상 2개가 세로로 스택 (`gap: 20px`)
- **PC**: 영상 2개가 가로로 나열 (`flex-row`, `gap: 24px`)

### 3.3 Section B: 업변 전문가 카드 리스트 (Dark Theme)

- **PC 레이아웃**: 5개의 세로형 카드가 가로로 나열 (`grid-cols-5` 또는 `flex justify-between`)
- **Mobile 레이아웃**: 2개씩 그리드 배치 또는 가로 스크롤 (Horizontal Swipe) 처리
- **카드 스펙**: 배경 이미지 위에 어두운 오버레이 딤(Dim) 처리, 하단에 텍스트 고정

### 3.4 Section C: 시스템/구조 설명 영역 (Light Theme)

- **배경**: 옅은 회색 점박이 패턴 또는 `#F9F9F9`
- **중앙 박스**: 흰색 배경 (`box-shadow` 적용, `border-radius: 12px`), 내부에 노란색 텍스트 하이라이트
- **아래 화살표**: 빨간색 화살표 이미지 적용 (`margin-top: 20px`, `margin-bottom: 20px`)

### 3.5 Section D: 실제 업변 성공 사례 (Light Theme)

- **PC 레이아웃**: 2x2 Grid (`grid-cols-2`, `gap: 32px`)
- **Mobile 레이아웃**: 1열 세로 스택 (`gap: 24px`)
- **특징**: 각 카드 좌측 상단에 초록색 뱃지 고정 (`position: absolute`, `top: -10px`, `left: -10px`)

### 3.6 Section E: 영수증 UI 영역 (Dark / Image BG)

- **배경**: 음식점 배경 이미지 위에 어두운 오버레이 적용 (`opacity: 70%`)
- **영수증 박스**: 중앙 정렬, Width PC `500px` / Mobile `90%`, Background `#FFFFFF`
- **영수증 특징**: 바코드 이미지, 상하 점선 Border (`border-style: dashed`)

### 3.7 Section F: 하단 폼 (상담 신청 영역)

- **배경**: `#FFFFFF`
- **레이아웃**: 폼 요소 세로 정렬 (`flex-col`)
- **Input Field**: Height `48px`, `border: 1px solid #DDDDDD`, `border-radius: 8px`, `padding-left: 16px`
