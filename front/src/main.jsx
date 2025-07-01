import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 프로덕션 환경에서 콘솔 로그 필터링
if (import.meta.env.PROD) {
  // 필터링할 키워드들
  const filterKeywords = [
    'vercel.live', 'feedback.js', 'feedback.html', 'instrument.',
    'googleads.g.doubleclick.net', 'gstatic.com', 'youtube.com',
    'lottie-light.js', 'www-embed-player', '가져오기 로드', 'XHR 로드',
    '.well-known/vercel', 'dpl=dpl_', 'doubleclick.net', 'pagead/id'
  ];

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  const shouldFilter = (message) => {
    const messageStr = String(message);
    return filterKeywords.some(keyword => messageStr.includes(keyword));
  };

  console.log = (...args) => {
    if (!args.some(arg => shouldFilter(arg))) {
      originalLog.apply(console, args);
    }
  };

  console.warn = (...args) => {
    if (!args.some(arg => shouldFilter(arg))) {
      originalWarn.apply(console, args);
    }
  };

  console.error = (...args) => {
    const messageStr = String(args[0] || '');
    if (!messageStr.includes('vercel.live') &&
        !messageStr.includes('feedback.js') &&
        !messageStr.includes('.well-known/vercel') &&
        !messageStr.includes('googleads.g.doubleclick.net')) {
      originalError.apply(console, args);
    }
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
