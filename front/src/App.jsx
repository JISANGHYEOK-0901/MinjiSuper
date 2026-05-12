import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import ExpertSection from "./components/ExpertSection";
import StructureSection from "./components/StructureSection";
import BusinessSystemSection from "./components/BusinessSystemSection";
import SuccessCaseSection from "./components/SuccessCaseSection";
import TargetSection from "./components/TargetSection";
import FinalSummarySection from "./components/FinalSummarySection";
import ReceiptSection from "./components/ReceiptSection";
import CostAnalysisSection from "./components/CostAnalysisSection";
import ContactFormSection from "./components/ContactFormSection";
import AdminDashboard from "./components/AdminDashboard";
import PopupModal from "./components/PopupModal";
import {
  MarketingSupportSection,
  YoutubeTestimonialSection,
} from "./components/MediaInsertSections";

function LandingPage() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="w-full overflow-hidden relative">
      <PopupModal />
      <HeroSection />
      <ExpertSection />
      <StructureSection />
      <YoutubeTestimonialSection />
      <SuccessCaseSection />
      <TargetSection />
      <FinalSummarySection />
      <BusinessSystemSection />
      <MarketingSupportSection />
      <ReceiptSection />
      <CostAnalysisSection />
      <ContactFormSection />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-point-yellow text-[#151515] rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex items-center justify-center text-[24px] font-black transition-all duration-300 ${
          showTopBtn
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        ↑
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Minji_Admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
