import React from "react";
import { motion } from "framer-motion";
import "./YoutubeSection.css";

const YoutubeSection = () => {
  const videos = [
    {
      id: "GO-jzaZ0Yic",
      title: "업종변경 1,000만 원으로 시작한 민지슈퍼, 월매출 6천 비결 공개",
    },
    { id: "ZQ2JV_KHNnk", title: "11년 동안 망하지 않은 술집의 공간기획" },
    { id: "EoFb5DMfirE", title: "실제로 한달만에 매출3배이상 올린방법" },
    { id: "R2bdvHycme8", title: "무권리·C급상권·지하매장에서도 살아남는 방법" },
  ];

  return (
    <div className="youtube-container">
      <div className="youtube-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          영상으로 확인하는 <br className="mobile-break" />
          <span className="highlight-red">성공 창업 스토리</span>
        </motion.h2>
        <p>점주님들의 생생한 목소리를 들어보세요.</p>
      </div>

      <div className="youtube-grid">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className="youtube-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="iframe-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h3 className="video-title">{video.title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeSection;
