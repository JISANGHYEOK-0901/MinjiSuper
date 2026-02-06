import React from "react";
import { motion } from "framer-motion";
import "./ConsultationSection.css";

const ConsultationSection = () => {
  const steps = [
    { icon: "📝", title: "1분 접수", desc: "하단에 문의접수해주세요" },
    {
      icon: "⚡",
      title: "확인",
      desc: "즉시 확인하고 연락드립니다.",
    },
    {
      icon: "📞",
      title: "1:1 상담",
      desc: "궁금하신 모든 것을\n상세히 알려드립니다",
    },
  ];

  return (
    <div className="consult-container">
      <div className="consult-wrapper">
        <motion.div
          className="consult-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="sub-tag">Fast Track</span>
          <h2 className="consult-title">
            복잡한 절차는 <span className="del-line">생략</span>했습니다.
            <br />
            오직 <span className="highlight-text">사장님의 성공</span>만
            이야기합니다.
          </h2>
        </motion.div>

        {/* 3단계 프로세스 */}
        <div className="process-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="process-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="process-icon-box">
                <span className="process-icon">{step.icon}</span>
                <span className="process-step">STEP 0{index + 1}</span>
              </div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 메인 카피 */}
        <motion.div
          className="consult-main-copy"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="copy-text">
            <span className="red-point">오늘</span> 신청하면,{" "}
            <span className="red-point">내일</span> 전화 갑니다.
          </p>
          <p className="sub-copy-text">
            고민될 때 <span className="highlight-bg">바로 물어보는 것</span>이
            가장 빠릅니다.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultationSection;
