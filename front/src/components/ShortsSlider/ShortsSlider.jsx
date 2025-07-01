import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ShortsSlider.css";

const shorts = [
  {
    video: "/videos/shorts1.mp4",
    alt: "",
    poster: "/images/shorts1-thumb.png",
  },
  {
    video: "/videos/shorts2.mp4",
    alt: "",
    poster: "/images/shorts2-thumb.png",
  },
  {
    video: "/videos/shorts3.mp4",
    alt: "",
    poster: "/images/shorts3-thumb.png",
  },
  {
    video: "/videos/shorts4.mp4",
    alt: "",
    poster: "/images/shorts4-thumb.png",
  },
];

const ShortsSlider = () => {
  const sliderRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null); // 현재 재생 중인 동영상 저장
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 관리

  // 슬라이더 설정: 안정적인 설정으로 변경
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
    draggable: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 330,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // 동영상 클릭 시 처리
  const handleVideoClick = (e, video) => {
    e.stopPropagation(); // 이벤트 버블링 방지

    if (activeVideo === video) {
      // 이미 활성화된 동영상이면 재생 중지
      video.pause();
      video.controls = false;
      setActiveVideo(null);
      setIsPlaying(false);
      // 슬라이더 재시작
      if (sliderRef.current) sliderRef.current.slickPlay();
    } else {
      // 다른 동영상이면 현재 동영상 재생
      // 모든 동영상 일시정지 및 controls 숨기기
      document.querySelectorAll(".shorts-video").forEach((v) => {
        v.pause();
        v.currentTime = 0;
        v.controls = false;
      });

      // 선택된 동영상 재생
      setActiveVideo(video);
      setIsPlaying(true);
      video.controls = true;
      video.play();
      // 슬라이더 일시정지
      if (sliderRef.current) sliderRef.current.slickPause();
    }
  };

  // 동영상 재생 시작 시
  const handleVideoPlay = (e) => {
    const video = e.currentTarget;
    setActiveVideo(video);
    setIsPlaying(true);
    if (sliderRef.current) sliderRef.current.slickPause();
  };

  // 동영상 일시정지/종료 시
  const handleVideoPause = (e) => {
    const video = e.currentTarget;
    if (activeVideo === video) {
      setActiveVideo(null);
      setIsPlaying(false);
      video.controls = false;
      if (sliderRef.current) sliderRef.current.slickPlay();
    }
  };

  // 동영상 종료 시
  const handleVideoEnded = (e) => {
    const video = e.currentTarget;
    setActiveVideo(null);
    setIsPlaying(false);
    video.controls = false;
    if (sliderRef.current) sliderRef.current.slickPlay();
  };

  return (
    <div className="minji-slider">
      <Slider ref={sliderRef} {...settings}>
        {shorts.map((item, idx) => (
          <div key={idx} className="shorts-slide">
            <div
              className="shorts-thumbnail"
              style={{ cursor: "pointer", position: "relative" }}>
              <video
                src={item.video}
                className="shorts-video"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  objectFit: "cover",
                  aspectRatio: "4/5",
                  background: "#222",
                  display: "block",
                }}
                preload="metadata"
                playsInline
                muted
                controls={false}
                onClick={(e) => handleVideoClick(e, e.currentTarget)}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoEnded}
                onError={() => console.error(`비디오 로딩 실패: ${item.video}`)}
                poster={item.poster}
              />
              <div className="shorts-caption">{item.alt}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ShortsSlider;
