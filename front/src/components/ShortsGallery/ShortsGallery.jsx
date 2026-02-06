import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaTimes, FaVolumeUp } from "react-icons/fa";
import "./ShortsGallery.css";

const ShortsGallery = () => {
  // 모달 상태 관리
  const [selectedVideo, setSelectedVideo] = useState(null);

  const shorts = [
    { id: 1, src: "/videos/shorts1.mp4", title: "🔥 오픈런 웨이팅 실화?" },
    { id: 2, src: "/videos/shorts2.mp4", title: "🍗 안주 퀄리티 폼 미쳤다" },
    {
      id: 3,
      src: "/videos/shorts3.mp4",
      title: "🍺 술이 술술 들어가는 분위기",
    },
    { id: 4, src: "/videos/shorts4.mp4", title: "🥘 민지슈퍼 시그니처 메뉴" },
  ];

  const handleMouseEnter = (e) => {
    e.target.play();
  };

  // 마우스가 떠날 때 (일시정지 및 되감기)
  // videoId를 인자로 받아서 구분합니다.
  const handleMouseLeave = (e, videoId) => {
    e.target.pause();
    // ID 1번이면 7초로, 나머지는 0초로 되감기
    e.target.currentTime = videoId === 1 ? 6 : 0;
  };

  // ✅ 추가됨: 영상 로딩 완료 시 (초기 점프)
  const handleLoadedMetadata = (e, videoId) => {
    // ID 1번만 7초로 점프
    if (videoId === 1) {
      e.target.currentTime = 7;
    }
  };

  // ✅ 추가됨: 영상 종료 시 (수동 루프 제어)
  const handleVideoEnded = (e, videoId) => {
    // ID 1번은 7초로 돌아가서 재생, 나머지는 0초로 돌아가서 재생
    e.target.currentTime = videoId === 1 ? 6 : 0;
    e.target.play();
  };

  return (
    <div className="shorts-container">
      <div className="shorts-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          15초 안에 빠져드는 <br className="mobile-break" />
          <span className="highlight-shorts">민지슈퍼 바이브</span>
        </motion.h2>
        <p className="shorts-sub">클릭해서 소리와 함께 즐겨보세요 🔊</p>
      </div>

      {/* 갤러리 영역 */}
      <div className="shorts-scroll-wrapper">
        <div className="shorts-grid">
          {shorts.map((video, index) => (
            <motion.div
              key={video.id}
              className="shorts-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedVideo(video)} // 클릭 시 모달 오픈
            >
              <div className="video-wrapper">
                <video
                  src={video.src}
                  // ✅ 중요: loop 속성 제거 (수동 제어를 위해)
                  // loop
                  muted
                  playsInline
                  className="shorts-video"
                  // ✅ 이벤트 핸들러에 video.id를 함께 전달합니다.
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={(e) => handleMouseLeave(e, video.id)}
                  onLoadedMetadata={(e) => handleLoadedMetadata(e, video.id)}
                  onEnded={(e) => handleVideoEnded(e, video.id)}
                />
                <div className="play-icon">
                  <FaPlay />
                </div>
                <div className="overlay-gradient"></div>
              </div>
              <p className="shorts-title">{video.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🎬 비디오 확대 모달 (팝업) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="video-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
            >
              <button
                className="close-btn"
                onClick={() => setSelectedVideo(null)}
              >
                <FaTimes />
              </button>

              <video
                src={selectedVideo.src}
                controls
                autoPlay
                className="modal-video"
              />

              <div className="modal-info">
                <h3>{selectedVideo.title}</h3>
                <p>
                  <FaVolumeUp /> 소리를 켜고 생생하게 확인하세요!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShortsGallery;
