# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 팝업 관리

`/Minji_Admin` 로그인 → 팝업 관리 → 팝업 추가 → 제목·이미지 선택 → 등록 → 활성화.
등록은 기본 비활성이며, 목록에서 이미지 교체·활성/비활성·삭제를 수행한다. PNG/JPEG/WebP(5MB 이하)를 지원한다. 원본 비율과 업로드 화질을 유지하며 기간 예약은 없다.

PC에서는 이미지·제목·노출 상태·관리 버튼을 표로 표시하고, 모바일에서는 같은 정보를 세로 목록으로 표시한다. 홈페이지는 기존 팝업 배치와 닫기/24시간 숨김을 유지한다.

백엔드를 먼저 배포하고 운영 팝업을 등록한 다음 프론트를 전환한다. 기존 정적 팝업은 자동 이관되지 않는다. 상세 API·저장·배포 절차는 작업공간 `BE/docs/POPUP_MANAGEMENT.md`를 참조한다. `VITE_API_BASE_URL` 지정 시 CSP/CORS 허용 주소도 함께 확인한다.
