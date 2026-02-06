import React from "react";
import { motion } from "framer-motion";
import "./FeatureSection.css";

const FeatureSection = () => {
  return (
    <div className="feature-container">
      <div className="feature-wrapper">
        {/* 왼쪽: 텍스트 영역 */}
        <div className="feature-text-group">
          <motion.div
            className="feature-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="feature-title">
              <span className="icon">🍺</span> 술맛 나는 분위기
            </h3>
            <p className="feature-desc">
              레트로와 모던의 완벽한 조화.
              <br />
              MZ세대가{" "}
              <span className="highlight-green">사진 찍고 싶은 공간</span>을
              만듭니다.
            </p>
          </motion.div>

          <motion.div
            className="feature-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="feature-title">
              <span className="icon">🥘</span> 실패 없는 안주
            </h3>
            <p className="feature-desc">
              누구나 아는 맛을 더 특별하게.
              <br />
              <span className="highlight-green">호불호 없는 메뉴</span>로
              재방문을 유도합니다.
            </p>
          </motion.div>

          <motion.div
            className="feature-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="feature-title">
              <span className="icon">💰</span> 압도적 가성비
            </h3>
            <p className="feature-desc">
              부담 없이 들어와서 배불리 먹고 가는 곳.
              <br />
              높은 회전율이 <span className="highlight-green">매출의 비결</span>
              입니다.
            </p>
          </motion.div>
        </div>

        {/* 오른쪽: 매장 이미지 (기존 이미지 활용) */}
        <motion.div
          className="feature-image-wrapper"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/images/optimized/con4-right.webp"
            alt="민지슈퍼 매장 전경"
            className="feature-image"
          />
          {/* 장식용 테두리 */}
          <div className="image-border"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureSection;
