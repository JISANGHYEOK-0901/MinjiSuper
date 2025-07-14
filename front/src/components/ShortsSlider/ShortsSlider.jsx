import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ShortsSlider.css";

const shorts = [
  {
    video: "/videos/shorts1.mp4",
    alt: "",
    poster: "/images/optimized/shorts1-thumb.webp",
  },
  {
    video: "/videos/shorts2.mp4",
    alt: "",
    poster: "/images/optimized/shorts2-thumb.webp",
  },
  {
    video: "/videos/shorts3.mp4",
    alt: "",
    poster: "/images/optimized/shorts3-thumb.webp",
  },
  {
    video: "/videos/shorts4.mp4",
    alt: "",
    poster: "/images/optimized/shorts4-thumb.webp",
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
    pauseOnHover: true, // PC에서 클릭 가능하도록 변경
    arrows: false,
    draggable: true,
    swipe: true,
    touchMove: true,
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
  const handleVideoClick = async (e, video) => {
    e.preventDefault();
    e.stopPropagation(); // 이벤트 버블링 방지

    // 클릭 지연 방지
    if (e.target.classList.contains("clicked")) {
      return;
    }
    e.target.classList.add("clicked");
    setTimeout(() => e.target.classList.remove("clicked"), 300);

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

      try {
        await video.play();
        // 슬라이더 일시정지
        if (sliderRef.current) sliderRef.current.slickPause();
      } catch (error) {
        console.warn("비디오 재생 실패:", error);
        // 재생 실패 시 상태 초기화
        setActiveVideo(null);
        setIsPlaying(false);
        video.controls = false;
      }
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
      // 슬라이더 재개는 하지 않음 - 사용자가 직접 클릭할 때만
    }
  };

  // 동영상 종료 시
  const handleVideoEnded = (e) => {
    const video = e.currentTarget;
    setActiveVideo(null);
    setIsPlaying(false);
    video.controls = false;
    // 슬라이더 재개는 하지 않음 - 사용자가 직접 클릭할 때만
  };

  // 슬라이더 재개 핸들러
  const handleSliderResume = () => {
    if (sliderRef.current && !isPlaying) {
      sliderRef.current.slickPlay();
    }
  };

  // 전역 클릭 핸들러 - 숏츠 슬라이더 외부 클릭 시 영상 정지 및 슬라이더 재개
  const handleGlobalClick = (e) => {
    // 숏츠 슬라이더 내부 클릭은 무시
    if (e.target.closest(".minji-slider")) {
      return;
    }

    // 활성화된 비디오가 있으면 정지
    if (activeVideo) {
      activeVideo.pause();
      activeVideo.controls = false;
      setActiveVideo(null);
      setIsPlaying(false);

      // 슬라이더 재개
      if (sliderRef.current) {
        sliderRef.current.slickPlay();
      }
    }
  };

  // 전역 클릭 이벤트 등록
  useEffect(() => {
    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [activeVideo]); // activeVideo가 변경될 때마다 이벤트 리스너 업데이트

  return (
    <div className="minji-slider" onClick={handleSliderResume}>
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
                onDoubleClick={(e) => e.preventDefault()} // 더블클릭 방지
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
