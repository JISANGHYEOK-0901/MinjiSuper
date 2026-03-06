import React from "react";
import HeroSection from "./components/HeroSection";
import ExpertSection from "./components/ExpertSection";
import StructureSection from "./components/StructureSection";
import BusinessSystemSection from "./components/BusinessSystemSection"; // 추가
import SuccessCaseSection from "./components/SuccessCaseSection";
import TargetSection from "./components/TargetSection";
import FinalSummarySection from "./components/FinalSummarySection";
import ReceiptSection from "./components/ReceiptSection";
import CostAnalysisSection from "./components/CostAnalysisSection";
import ContactFormSection from "./components/ContactFormSection";

function App() {
  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      <ExpertSection />
      <StructureSection />
      <SuccessCaseSection />
      <TargetSection />
      <FinalSummarySection />
      <BusinessSystemSection />
      <ReceiptSection />
      <CostAnalysisSection />
      <ContactFormSection />
    </div>
  );
}

export default App;
