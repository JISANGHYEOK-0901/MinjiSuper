import React from "react";

const FinalSummarySection = () => {
  return (
    <section className="w-full bg-[#1A1A1A] pt-[100px] pb-[100px] pc:pt-[140px] pc:pb-[140px] px-5">
      <div className="section-container flex flex-col items-center text-center">
        <div className="mb-12 pc:mb-16">
          <h2 className="text-[24px] pc:text-[40px] font-extrabold text-white leading-snug mb-4">
            업종을 바꾸는 게 아니라,
            <br />
            장사가 되는 <span className="text-point-yellow">'구조'</span>로
            바꾸는 것.
            <br />
            <span className="text-point-yellow">그게 김창훈식 업변입니다.</span>
          </h2>
          <p className="text-white text-[14px] pc:text-[16px] font-medium">
            지금 바로 <span className="text-point-yellow">무료 상담</span>을
            받아보세요. <br />
            당신의 <span className="text-point-yellow">가게를 살릴 방법</span>을
            찾아드립니다.
          </p>
        </div>

        {/* CTA 버튼 세트 */}
        <div className="flex flex-col gap-4 w-full max-w-[450px]">
          <button className="bg-point-yellow text-[#151515] font-extrabold text-[18px] pc:text-[20px] py-[18px] pc:py-[22px] rounded-[50px] shadow-[0_4px_15px_rgba(255,208,59,0.3)] hover:brightness-110 transition-all flex justify-center items-center">
            무료 업변 상담 받기{" "}
            <span className="ml-2 text-[14px] font-normal opacity-80">
              &gt;
            </span>
          </button>

          <button className="bg-[#D33535] text-white font-extrabold text-[18px] pc:text-[20px] py-[18px] pc:py-[22px] rounded-[50px] shadow-[0_4px_15px_rgba(211,53,53,0.3)] hover:brightness-110 transition-all flex justify-center items-center">
            김창훈 대표 1:1 상담 신청하기{" "}
            <span className="ml-2 text-[14px] font-normal opacity-80">
              &gt;
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalSummarySection;
