import React from "react";
import { motion } from "framer-motion";
import "./CostSection.css";

const CostSection = () => {
  // 비용 데이터 (나중에 수정하기 편하도록 배열로 관리)
  const costs = [
    { item: "가맹비", desc: "상표/노하우 전수", price: 500, unit: "만원" },
    { item: "교육비", desc: "오픈 지원/교육", price: 300, unit: "만원" },
    {
      item: "인테리어",
      desc: "평당 170만원 (20평 기준)",
      price: 3500,
      unit: "만원",
    },
    {
      item: "주방기기",
      desc: "냉장고/튀김기/그릴 등",
      price: 1000,
      unit: "만원",
    },
    { item: "홀 집기", desc: "테이블/의자 10세트", price: 400, unit: "만원" },
    {
      item: "간판/사인",
      desc: "메인/돌출 간판 포함",
      price: 400,
      unit: "만원",
    },
    {
      item: "인테리어 소품",
      desc: "레트로 소품 일체",
      price: 200,
      unit: "만원",
    },
  ];

  // 총 합계 자동 계산
  const totalCost = costs.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="cost-container">
      <div className="cost-header">
        <motion.h2
          className="cost-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          거품 싹 뺀 <br className="mobile-break" />
          <span className="highlight-line">투명한 창업 비용</span>
        </motion.h2>
        <p className="cost-subtitle">20평 기준 예상 견적서입니다.</p>
      </div>

      <motion.div
        className="cost-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="cost-list">
          {costs.map((item, index) => (
            <div key={index} className="cost-item">
              <div className="cost-info">
                <span className="item-name">{item.item}</span>
                <span className="item-desc">{item.desc}</span>
              </div>
              <div className="cost-price">
                {item.price.toLocaleString()}{" "}
                <span className="unit">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="cost-divider"></div>

        <div className="cost-total">
          <span className="total-label">총 개설 비용</span>
          <span className="total-price">
            {totalCost.toLocaleString()}{" "}
            <span className="total-unit">만원</span>
          </span>
        </div>

        <p className="vat-info">
          * VAT 별도 / 점포 상황에 따라 변동될 수 있습니다.
        </p>
      </motion.div>
    </div>
  );
};

export default CostSection;
