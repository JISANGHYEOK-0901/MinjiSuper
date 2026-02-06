import React from "react";
import { motion } from "framer-motion";
import "./StatsBanner.css";

const StatsBanner = () => {
  return (
    <div className="stats-container">
      <div className="stats-wrapper">
        {/* 첫 번째 통계: 해시태그 */}
        <div className="stat-item">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="stat-number-box"
          >
            <span className="stat-prefix">SNS 해시태그</span>
            <div className="stat-number">
              10,000<span className="plus">+</span>
            </div>
          </motion.div>
          <p className="stat-desc">자발적 바이럴의 증거</p>
        </div>

        <div className="divider"></div>

        {/* 두 번째 통계: 웨이팅 */}
        <div className="stat-item">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="stat-number-box"
          >
            <span className="stat-prefix">오픈 런</span>
            <div className="stat-number">
              Waiting<span className="plus">!</span>
            </div>
          </motion.div>
          <p className="stat-desc">줄 서서 먹는 그 곳</p>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
