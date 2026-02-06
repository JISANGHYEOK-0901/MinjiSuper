import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa"; // npm install react-icons 필요
import "./ReviewSection.css";

const ReviewSection = () => {
  // ✅ 팁: 나중에 여기 내용만 실제 네이버 베스트 리뷰로 바꿔주세요!
  const reviews = [
    {
      id: 1,
      name: "meimei**** 님",
      date: "26.01.16",
      rating: 5,
      content: `미친 가성비 안주에 푸짐한 양이라니... 상상했던 대학가 갓성비 술집을 딱 찾은 듯한 느낌이에요💕
        시끌벅적 단체 모임 하기도 좋고 단둘이 시간 보내기도 좋은 건대 술집인 것 같아요 자주 오고 싶어요❤️`,
      tags: ["#가성비가 좋아요", "#양이 많아요", "#대화하기 좋아요"],
    },
    {
      id: 2,
      name: "혜미** 님",
      date: "25.12.7",
      rating: 5,
      content:
        "골목 지나가다가 우연히 들어왔는데 너무 좋아요! 가격두 저렴하구 양념치킨 진짜 마시써요!!😘💗 다음엔 친구들 데리구 올려구요!!🍀😘 너무 마싯구 직원들도 친절하게 알려주시구 너무 좋았습니당!!❤️🍀 다음에 또 올게요!!💝",
      tags: ["#음식이 맛있어요", "#가성비가 좋아요", "#양이 많아요"],
    },
    {
      id: 3,
      name: "dud**** 님",
      date: "26.01.02",
      rating: 5,
      content:
        "건대 민지슈퍼에서 짜계치랑 갈릭버터감튀 먹었는데 둘 다 너무 만족스러웠어요. 짜계치는 꾸덕한 치즈랑 짜파게티 조합이 진짜 잘 어울려서 계속 먹게 되고, 갈릭버터감튀는 고소하고 향이 좋아서 사이드로 딱이에요.",
      tags: ["#음악이 좋아요", "#가성비가 좋아요", "#양이 많아요"],
    },
    {
      id: 4,
      name: "수또** 님",
      date: "26.02.05",
      rating: 5,
      content:
        "평소 다른 슈퍼 다녔는데 여기 오니깐 스프도 맛있고 더 깔끔하고 슐이 다네요^_^ 육수도 츄거되고... 대박 술술 술술 넘어가요 순찌에 라면서리 넣고 직원분 너무 친절쓰.. 또 올게영!!!",
      tags: ["#가성비가 좋아요", "#매장이 넓어요", "#오래 머무르기 좋아요"],
    },
  ];

  return (
    <div className="review-container">
      <div className="review-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="review-badge">REAL REVIEW</span>
          <h2 className="review-title">
            고객님이 먼저 알아보는
            <br />
            <span className="highlight-green">찐 맛집의 증거</span>
          </h2>
          <p className="review-sub">
            네이버 방문자 리뷰<strong>999+</strong>
          </p>
        </motion.div>
      </div>

      <div className="review-scroll-wrapper">
        <div className="review-grid">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="card-top">
                <div className="user-info">
                  <span className="user-name">{review.name}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="naver-icon">N</div>
              </div>

              <div className="rating-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <div className="review-content">
                <FaQuoteLeft className="quote-icon" />
                <p>{review.content}</p>
              </div>

              <div className="review-tags">
                {review.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        className="more-review-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          window.open(
            "https://map.naver.com/p/search/%EB%AF%BC%EC%A7%80%EC%8A%88%ED%8D%BC/place/1235590176?placePath=/review?bk_query=%EB%AF%BC%EC%A7%80%EC%8A%88%ED%8D%BC&entry=pll&fromNxList=true&fromPanelNum=2&locale=ko&searchText=%EB%AF%BC%EC%A7%80%EC%8A%88%ED%8D%BC&svcName=map_pcv5&timestamp=202602061657&entry=pll&fromNxList=true&fromPanelNum=2&timestamp=202602061657&locale=ko&svcName=map_pcv5&searchText=%EB%AF%BC%EC%A7%80%EC%8A%88%ED%8D%BC&from=nx&searchType=place&c=15.00,0,0,0,dh",
            "_blank",
          )
        }
      >
        네이버 리뷰 더 보러가기 →
      </motion.button>
    </div>
  );
};

export default ReviewSection;
