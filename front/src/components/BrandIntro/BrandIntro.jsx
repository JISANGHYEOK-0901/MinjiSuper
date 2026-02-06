import React from "react";
import { motion } from "framer-motion";
import "./BrandIntro.css";

const BrandIntro = () => {
  return (
    <div className="brand-intro-container">
      <div className="brand-intro-bg"></div> {/* 배경 이미지용 */}
      <div className="brand-intro-overlay"></div> {/* 글자 잘 보이게 어둡게 */}
      <div className="brand-intro-content">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="brand-intro-title"
        >
          식사, 안주, 분위기까지.
          <br />
          <span className="highlight-green">요즘 감성</span>을 완성하다.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="brand-intro-text"
        >
          건대에서 시작된 민지슈퍼의 신화,
          <br />
          이제 당신의 동네에서도 가능합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="brand-intro-box"
        >
          우리 동네 <span className="highlight-red">1등 술집</span> 만들기
        </motion.div>
      </div>
    </div>
  );
};

export default BrandIntro;
