import React from "react";
import { motion } from "framer-motion";
import "./ClosingSection.css";

const ClosingSection = () => {
  // 문의 폼으로 부드럽게 이동
  const scrollToInquiry = () => {
    const inquirySection = document.querySelector(".inquiry-container");
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="closing-container">
      {/* 배경 이미지 (기존 con18 배경 활용) */}
      <div className="closing-bg"></div>
      <div className="closing-overlay"></div>

      <div className="closing-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="closing-sub">성공할 수밖에 없는 이유를 확인하셨나요?</p>
          <h2 className="closing-title">
            이제 <span className="highlight-yellow">사장님</span>이<br />
            주인공이 될 차례입니다.
          </h2>
        </motion.div>

        <motion.div
          className="closing-desc-box"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p>
            "우리 동네에 생기면 대박나겠다"는 생각,
            <br />
            지금 하지 않으면 <span className="highlight-green">다른 사람</span>
            이 먼저 시작합니다.
          </p>
        </motion.div>

        <motion.button
          className="closing-cta-btn"
          onClick={scrollToInquiry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          지금 바로 상담 신청하기 ▼
        </motion.button>
      </div>
    </div>
  );
};

export default ClosingSection;
