import React from "react";
import { motion } from "framer-motion";
import "./BranchExpansion.css";

const BranchExpansion = () => {
  const branches = [
    { name: "건대 본점", badge: "ROOT", desc: "전설의 시작" },
    { name: "김포구래점", badge: "NEW", desc: "오픈 완료" },
    { name: "사가정점", badge: "NEW", desc: "오픈 완료" },
    { name: "상봉점", badge: "NEW", desc: "오픈 완료" },
  ];

  // ✅ [개선 1] 애니메이션 설정값(Variants) 분리
  // 부모(Grid) 설정: 자식들을 0.15초 간격으로 실행시켜라
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // 자식 간의 시차
        delayChildren: 0.2, // 0.2초 뒤에 시작
      },
    },
  };

  // 자식(Card) 설정: 아래에서 위로 튕기듯 올라옴
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // 스프링 물리 효과 (부드러운 튕김)
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <div className="branch-container">
      <div className="branch-header">
        <motion.span
          className="branch-subtitle"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} // 화면에 좀 더 들어와야 시작
          transition={{ duration: 0.5 }}
        >
          검증된 수익성, 폭발적 성장
        </motion.span>
        <motion.h2
          className="branch-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          단 <span className="highlight-text">6개월</span> 만에
          <br />
          <span className="highlight-text">3개 지점</span> 연속 오픈!
        </motion.h2>
      </div>

      {/* ✅ [개선 2] variants 적용 */}
      <motion.div
        className="branch-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }} // 화면 하단에서 50px 올라오면 시작
      >
        {branches.map((branch, index) => (
          <motion.div
            key={index}
            className={`branch-card ${index === 0 ? "main-branch" : ""}`}
            variants={itemVariants} // 부모의 통제를 받음
            whileHover={{
              y: -8,
              boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
              transition: { duration: 0.2 },
            }}
          >
            <div className="badge">{branch.badge}</div>
            <h3 className="branch-name">{branch.name}</h3>
            <p className="branch-desc">{branch.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BranchExpansion;
