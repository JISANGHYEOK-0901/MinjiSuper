import React, { useState, useEffect, useRef } from "react";
import "./FlipCards.css";

const FlipCards = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const containerRef = useRef(null);

  const cards = [
    {
      id: 1,
      frontImage: "/images/flipcard1.png",
      title: "민지네 국물 떡볶이",
      // description: "따뜻한 국물과 함께하는 분식의 진수",
      bgColor: "linear-gradient(135deg, #ff6b6b, #ffa500)",
    },
    {
      id: 2,
      frontImage: "/images/flipcard2.png",
      title: "민지네 겉바속촉 치킨",
      // description: "바삭한 치킨과 갈비의 만남",
      bgColor: "linear-gradient(135deg, #ff8a80, #ff5722)",
    },
    {
      id: 3,
      frontImage: "/images/flipcard3.png",
      title: "민지네 취향저격 안주",
      // description: "술과 완벽한 조화를 이루는 안주",
      bgColor: "linear-gradient(135deg, #ffb74d, #ff9800)",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 컨테이너가 화면에 보이면 카드들을 순차적으로 뒤집기 시작
            cards.forEach((card, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  if (!prev.includes(card.id)) {
                    return [...prev, card.id];
                  }
                  return prev;
                });
              }, index * 300); // 300ms 간격으로 순차 실행
            });
          }
        });
      },
      {
        threshold: 0.3, // 30% 보이면 트리거
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="flip-cards-container" ref={containerRef}>
      <div className="flip-cards-wrapper">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flip-card ${
              visibleCards.includes(card.id) ? "flipped" : ""
            }`}>
            <div className="flip-card-inner">
              {/* 앞면 */}
              <div className="flip-card-front">
                <div className="card-placeholder">
                  <div className="placeholder-content">
                    <div className="placeholder-circle"></div>
                    <div className="placeholder-lines">
                      <div className="placeholder-line"></div>
                      <div className="placeholder-line short"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 뒷면 */}
              <div className="flip-card-back">
                <div className="card-image-container">
                  <img
                    src={card.frontImage}
                    alt={card.title}
                    className="card-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background = card.bgColor;
                    }}
                  />
                </div>
                <div className="card-overlay">
                  <h3 className="card-title">{card.title}</h3>
                  {card.description && (
                    <p className="card-description">{card.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlipCards;
