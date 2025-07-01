import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";

const images = [
  "/images/slide1.png", // 첫 번째 음식
  "/images/slide2.png", // 두 번째 음식
  "/images/slide3.png", // 메뉴판
  "/images/slide4.png", // 세 번째 음식
  "/images/slide5.png", // 네 번째 음식
];

const ImageSlider = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const settings = {
    infinite: true,
    speed: 8000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
    draggable: true,
    swipe: true,
    touchMove: true,
    useTransform: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          speed: 8000,
          autoplaySpeed: 0,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          speed: 8000,
          autoplaySpeed: 0,
          cssEase: "linear",
          draggable: true,
          swipe: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          speed: 8000,
          autoplaySpeed: 0,
          cssEase: "linear",
          draggable: true,
          swipe: true,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          speed: 8000,
          autoplaySpeed: 0,
          cssEase: "linear",
          draggable: true,
          swipe: true,
        },
      },
    ],
  };

  const openModal = (img) => {
    setCurrentImage(img);
    setModalOpen(true);
    // 모바일에서 스크롤 방지
    if (window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
    // 스크롤 복원
    document.body.style.overflow = "unset";
  };

  // 터치 이벤트 핸들러
  const handleImageClick = (img, e) => {
    e.preventDefault();
    openModal(img);
  };

  return (
    <div className="slider-outer">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="slider-img-wrap">
            <img
              src={img}
              alt={`음식 이미지 ${idx + 1}`}
              className="slider-img"
              onClick={(e) => handleImageClick(img, e)}
              onTouchEnd={(e) => handleImageClick(img, e)}
              style={{ cursor: "pointer" }}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>

      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          onTouchEnd={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}>
            <img
              src={currentImage}
              alt="확대된 음식 이미지"
              className="modal-image"
            />
            <button
              className="modal-close"
              onClick={closeModal}
              onTouchEnd={closeModal}>
              ✕ 닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
