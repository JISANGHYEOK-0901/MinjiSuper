import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ReviewSlider.css";

const ReviewSlider = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // 리뷰 이미지 데이터 (review1.png ~ review10.png)
  const reviewImages = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    src: `/reviews/review${index + 1}.png`,
    alt: `고객 리뷰 ${index + 1}`,
  }));

  // 모달 핸들러 함수들
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

  // 슬라이더 설정
  const settings = {
    dots: false,
    infinite: true,
    speed: 800, // 더 부드러운 전환
    autoplay: true,
    autoplaySpeed: 3000, // 더 빠른 자동 재생
    pauseOnHover: false, // 호버해도 멈추지 않음
    pauseOnFocus: false, // 포커스해도 멈추지 않음
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    swipe: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          pauseOnHover: false,
          pauseOnFocus: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          pauseOnHover: false,
          pauseOnFocus: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          pauseOnHover: false,
          pauseOnFocus: false,
        },
      },
    ],
  };

  return (
    <div className="review-slider">
      <Slider {...settings}>
        {reviewImages.map((review) => (
          <div key={review.id} className="review-slide">
            <div className="review-card">
              <img
                src={review.src}
                alt={review.alt}
                className="review-image"
                onClick={(e) => handleImageClick(review.src, e)}
                onTouchEnd={(e) => handleImageClick(review.src, e)}
                style={{ cursor: "pointer" }}
                loading="lazy"
              />
              <div className="review-overlay">
                <h3 className="review-title"></h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* 모달 */}
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
              alt="확대된 리뷰 이미지"
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

export default ReviewSlider;
