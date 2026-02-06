import React from "react";
import { motion } from "framer-motion";
import "./HeroSection.css";

const HeroSection = () => {
  // 스크롤 이동 함수 (문의하기 섹션으로 이동)
  const scrollToInquiry = () => {
    const inquirySection = document.querySelector(".inquiry-container");
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-container">
      {/* 1. 배경: 비디오 (기존 shorts1.mp4 활용) */}
      <div className="hero-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          poster="/images/optimized/MainPoster.jpg"
        >
          {/* 쇼츠 영상 중 가장 임팩트 있는 것을 배경으로 사용 */}
          <source src="/videos/shorts4.mp4" type="video/mp4" />
        </video>
        {/* 글자가 잘 보이도록 검은색 반투명 필터 적용 */}
        <div className="hero-overlay"></div>
      </div>

      {/* 2. 콘텐츠: HTML 텍스트 (반응형 + 애니메이션) */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="hero-subtitle">
            요즘 대학가에서 <span className="highlight-yellow">답</span>은
          </span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          민지슈퍼<span className="dot">.</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          추억은 각자 챙기세요. <br className="mobile-break" />
          <span className="highlight-white">매출과 성공</span>은 저희가
          책임집니다.
        </motion.p>

        {/* CTA 버튼 */}
        <motion.button
          className="hero-cta-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={scrollToInquiry}
        >
          창업 문의하기 →
        </motion.button>
      </div>

      {/* 스크롤 유도 아이콘 (선택사항) */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <span>↓</span>
      </motion.div>
    </div>
  );
};

export default HeroSection;
