import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa"; // 아이콘 활용
import "./FloatingCTA.css";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const inquirySection = document.getElementById("inquiry-section");
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // 1. 문의하기 섹션 도달 여부 확인
      let isOverInquiry = false;

      if (inquirySection) {
        const rect = inquirySection.getBoundingClientRect();
        // 문의 섹션의 상단이 화면 바닥보다 위로 올라오면 (즉, 눈에 보이기 시작하면)
        // 150px 정도 여유를 두어 버튼과 겹치기 전에 미리 사라지게 함
        if (rect.top < windowHeight - 150) {
          isOverInquiry = true;
        }
      }

      // 2. 조건: Hero 섹션(600px)은 지났고(AND) 문의 섹션에는 아직 도달하지 않았을 때만 보임
      if (scrollPosition > 600 && !isOverInquiry) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 클릭 시 문의 폼으로 부드럽게 이동 및 포커스
  const scrollToInquiry = () => {
    const inquirySection = document.getElementById("inquiry-section");
    const nameInput = document.getElementById("name"); // 이름 입력창 ID

    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: "smooth" });

      // 스크롤 이동 후 입력창에 포커스 (사용자 경험 향상)
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="floating-cta-btn"
          onClick={scrollToInquiry}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="cta-content">
            <span className="cta-icon">
              <FaPaperPlane />
            </span>
            <div className="cta-text-group">
              <span className="cta-sub">1분이면 접수 완료!</span>
              <span className="cta-main">창업상담 신청하기</span>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
