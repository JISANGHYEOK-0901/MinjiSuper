import React, { useState, useEffect } from "react";
import "./MainPage.css";
import HeroSection from "../components/HeroSection/HeroSection";
import BrandIntro from "../components/BrandIntro/BrandIntro";
import StatsBanner from "../components/StatsBanner/StatsBanner";
import BranchExpansion from "../components/BranchExpansion/BranchExpansion";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import CostSection from "../components/CostSection/CostSection";
import ConsultationSection from "../components/ConsultationSection/ConsultationSection";
import ClosingSection from "../components/ClosingSection/ClosingSection";
import ShortsGallery from "../components/ShortsGallery/ShortsGallery";
import YoutubeSection from "../components/YoutubeSection/YoutubeSection";
import ReviewSection from "../components/ReviewSection/ReviewSection";
import FloatingCTA from "../components/FloatingCTA/FloatingCTA";

import Inquiry from "../components/Inquiry/Inquiry";

const MainPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="main-container">
      {/* 1. 메인 히어로 (영상 + 타이핑) */}
      <HeroSection />

      {/* 2. 브랜드 소개 (가독성 개선) */}
      <BrandIntro />

      {/* 3. 통계 배너 (숫자 카운팅) */}
      <StatsBanner />

      {/* ✅ 4. [NEW] 쇼츠 갤러리 (기존 container4 대체) */}
      <ShortsGallery />

      {/* ✅ 5. [NEW] 지점 확장 현황 (6개월 3개 지점) */}
      <BranchExpansion />

      {/* ✅ 6. [NEW] 유튜브 섹션 (기존 container14를 위로 올림) */}
      <YoutubeSection />

      {/* ✅ 7. [NEW] 특징 소개 */}
      <FeatureSection />

      {/* ✅ [NEW] 리뷰 섹션 (기존 ReviewSlider 대체) */}
      <ReviewSection />

      {/* ✅ 8. [NEW] 창업 비용 (기존 container15 대체) */}
      <CostSection />

      {/* ✅ 9. [NEW] 상담 절차 및 유도 (기존 container16 대체) */}
      <ConsultationSection />

      {/* ✅ 10. [NEW] 클로징 (기존 container17, 18, 19 통합 대체) */}
      <ClosingSection />

      {/* 11. 문의하기 폼 (하단 고정/배치) */}
      <Inquiry />

      {/* --- 플로팅 요소들 (화면 위에 둥둥 떠다님) --- */}

      {/* 1. 맨 위로 가기 버튼 (기존) */}
      {showScrollTop && (
        <button
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          aria-label="맨 위로 가기"
        >
          ↑
        </button>
      )}

      {/* ✅ 2. [NEW] 따라다니는 문의 버튼 */}
      <FloatingCTA />
    </div>
  );
};

export default MainPage;
