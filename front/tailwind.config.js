/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#151515", // 메인 다크 배경
          light: "#F9F9F9", // 밝은 섹션 배경
          white: "#FFFFFF",
        },
        point: {
          yellow: "#FFD03B", // 메인 CTA 버튼, 하이라이트
          red: "#D33535", // 경고, 강조, 영수증 라인
          green: "#2A8741", // 뱃지 색상
        },
        font: {
          light: "#FFFFFF", // 어두운 배경 위 텍스트
          dark: "#222222", // 밝은 배경 위 텍스트
          muted: "#888888", // 부가 설명 (회색)
        },
      },
      fontFamily: {
        sans: ["Pretendard", "Noto Sans KR", "sans-serif"],
      },
      screens: {
        // 모바일은 기본값으로 두고, PC 레이아웃 분기점을 설정합니다.
        pc: "1024px",
      },
      maxWidth: {
        mobile: "390px",
        "pc-content": "1024px", // PC 콘텐츠 중앙 정렬용 최대 너비
      },
    },
  },
  plugins: [],
};
