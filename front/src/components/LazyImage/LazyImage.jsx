import React, { useState, useEffect, useRef } from "react";
import "./LazyImage.css";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholder = "/images/placeholder.png",
  threshold = 0.1,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Intersection Observer 설정
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setImageSrc(src);
            observerRef.current?.unobserve(img);
          }
        });
      },
      {
        threshold,
        rootMargin: "50px 0px", // 50px 전에 미리 로딩 시작
      }
    );

    observerRef.current.observe(img);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // 로딩 실패 시 원본 이미지로 폴백
    if (imageSrc !== src) {
      setImageSrc(src);
    }
  };

  return (
    <div className={`lazy-image-container ${className}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`lazy-image ${isLoaded ? "loaded" : "loading"}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
      {!isLoaded && isInView && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
