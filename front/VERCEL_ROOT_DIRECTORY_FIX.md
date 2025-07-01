# Vercel Root Directory 오류 해결 가이드

## 🚨 발생한 오류
```
The specified Root Directory "front" does not exist. 
Please update your Project Settings.
```

## 📁 현재 GitHub 저장소 구조
```
JISANGHYEOK-0901/front (저장소)
├── src/
├── public/
├── package.json
├── vite.config.js
├── index.html
└── ... (React 프로젝트 파일들)
```

**문제**: 저장소 자체가 이미 `front` 프로젝트이므로 Root Directory를 "front"로 설정하면 안됨!

---

## ✅ 해결 방법

### 1단계: Vercel 프로젝트 설정 변경

#### Vercel Dashboard에서 설정 변경
1. **Vercel Dashboard** 접속: https://vercel.com/dashboard
2. **해당 프로젝트** 클릭
3. **"Settings"** 탭 클릭
4. **좌측 메뉴에서 "Build & Development"** 클릭

#### Root Directory 설정 수정
```
현재 설정:
Root Directory: front ❌

올바른 설정:
Root Directory: . (점 하나) ✅
또는
Root Directory: (비워두기) ✅
```

#### 전체 빌드 설정 확인
```
Project Settings:
├── Framework Preset: Vite
├── Root Directory: . (또는 비워두기)
├── Build Command: npm run build
├── Output Directory: dist
├── Install Command: npm install
└── Development Command: npm run dev
```

### 2단계: 환경변수 확인
```
Environment Variables:
├── VITE_API_BASE_URL: https://be-production-32e8.up.railway.app
└── Environment: Production, Preview, Development
```

### 3단계: 재배포
1. **"Save"** 버튼 클릭
2. **자동 재배포 시작**
3. **Deployments** 탭에서 진행 상황 확인

---

## 🔍 올바른 저장소 구조별 설정

### Case 1: 현재 구조 (저장소 = React 프로젝트)
```
저장소: JISANGHYEOK-0901/front
├── src/
├── package.json
└── vite.config.js

Vercel 설정:
Root Directory: . (또는 비워두기)
```

### Case 2: 저장소 안에 front 폴더가 있는 경우
```
저장소: JISANGHYEOK-0901/project
├── front/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── backend/

Vercel 설정:
Root Directory: front
```

### Case 3: 모노레포 구조
```
저장소: JISANGHYEOK-0901/monorepo
├── packages/
│   ├── frontend/
│   └── backend/
└── package.json

Vercel 설정:
Root Directory: packages/frontend
```

---

## 🚀 재배포 후 확인사항

### 1. 빌드 로그 확인
```
✅ Cloning completed
✅ Installing dependencies
✅ Running build command: npm run build
✅ Build completed
✅ Deployment ready
```

### 2. 사이트 접속 테스트
- 배포된 URL 접속
- 페이지 정상 로딩 확인
- API 연결 상태 확인

### 3. 기능 테스트
- 문의 폼에서 "✅ Railway 서버 연결됨" 표시 확인
- 문의 접수 기능 테스트

---

## 🔧 추가 문제 해결

### 빌드 명령어 오류 시
```bash
# package.json 확인
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",  ← 이 명령어가 있는지 확인
    "preview": "vite preview"
  }
}
```

### 의존성 설치 오류 시
```bash
# Node.js 버전 확인
Vercel Settings → Build & Development → Node.js Version: 18.x
```

### 환경변수 적용 안될 시
```bash
# 환경변수 재설정
1. Environment Variables에서 기존 변수 삭제
2. 새로 추가: VITE_API_BASE_URL
3. 재배포 실행
```

---

## 📋 체크리스트

### ✅ Vercel 설정 수정
- [ ] Root Directory를 "." 또는 비워두기로 변경
- [ ] Build Command: npm run build 확인
- [ ] Output Directory: dist 확인
- [ ] 환경변수 VITE_API_BASE_URL 설정 확인

### ✅ 재배포 확인
- [ ] 설정 저장 후 자동 재배포 시작
- [ ] 빌드 로그에서 오류 없음 확인
- [ ] 배포 완료 후 사이트 접속 가능

### ✅ 기능 테스트
- [ ] 페이지 정상 로딩
- [ ] API 연결 상태 확인
- [ ] 문의 접수 기능 테스트

이제 Root Directory 설정을 수정하면 정상적으로 배포될 것입니다! 🎉
