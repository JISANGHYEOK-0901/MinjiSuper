import React from "react";

const CostAnalysisSection = () => {
  return (
    <div className="w-full flex flex-col">
      {/* --- Section 1: 비용 분석 섹션 (image_dda5f9.png 반영) --- */}
      <section className="w-full bg-[#F2F2F2] pt-[80px] pb-[80px] pc:pt-[120px] pc:pb-[120px] px-5">
        <div className="section-container flex flex-col items-center">
          <h2 className="text-[26px] pc:text-[38px] font-extrabold text-[#151515] leading-tight mb-16 text-center tracking-tighter">
            그래서 내 <span className="text-point-red">돈</span>은{" "}
            <span className="text-point-red">얼마나 들어가나요?</span>
          </h2>

          <div className="flex flex-col pc:flex-row gap-6 pc:gap-10 mb-12 w-full max-w-[800px]">
            {/* 업변 비용 카드 */}
            <div className="flex-1 bg-white rounded-[12px] shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-point-red py-4 text-center">
                <span className="text-white font-bold text-[18px] pc:text-[20px]">
                  업변 비용
                </span>
              </div>
              <ul className="p-8 pc:p-10 flex flex-col gap-4 text-center text-[#444] font-bold text-[15px] pc:text-[17px]">
                <li>간판 교체</li>
                <li>공간 리뉴얼</li>
                <li>메뉴 개편</li>
                <li>동선/시스템 세팅</li>
              </ul>
            </div>

            {/* 창업 비용 카드 */}
            <div className="flex-1 bg-white rounded-[12px] shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-[#151515] py-4 text-center">
                <span className="text-white font-bold text-[18px] pc:text-[20px]">
                  창업 비용
                </span>
              </div>
              <ul className="p-8 pc:p-10 flex flex-col gap-4 text-center text-[#444] font-bold text-[15px] pc:text-[17px]">
                <li>브랜드비</li>
                <li>교육비</li>
                <li>보증금</li>
                <li>인테리어</li>
                <li>주방설비</li>
              </ul>
            </div>
          </div>

          {/* 수직 화살표 흐름 (이미지 명세 반영) */}
          <div className="flex flex-col items-center gap-1 mb-12 opacity-20">
            {[...Array(3)].map((_, i) => (
              <svg
                key={i}
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
              >
                <path d="M12 16L0 0H24L12 16Z" fill="#151515" />
              </svg>
            ))}
          </div>

          {/* 총비용 배너 (Pill 타입) */}
          <div className="bg-point-red px-10 py-5 rounded-full shadow-2xl mb-6">
            <p className="text-white font-black text-[22px] pc:text-[32px] tracking-tight">
              총 5,500만대{" "}
              <span className="text-[14px] pc:text-[18px] font-medium opacity-90">
                (옵션별 변동)
              </span>
            </p>
          </div>
          <p className="text-[#151515] font-bold text-[16px] pc:text-[21px] tracking-tight mt-4">
            “1원도 숨기지 않는 투명한 비용 공개 정책.”
          </p>
        </div>
      </section>

      {/* --- Section 2: 대표 메시지 섹션 (image_dda5db.png 반영) --- */}
      <section className="relative w-full py-[120px] pc:py-[180px] px-5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-portrait-main.png"
            alt="김창훈 대표"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="section-container relative z-10 text-white flex flex-col items-center pc:items-end text-center pc:text-right">
          <div className="max-w-[800px]">
            <p className="text-white font-bold text-[18px] pc:text-[24px] mb-8 leading-relaxed">
              사장님이 다시{" "}
              <span className="text-point-yellow">살아나는 순간...</span>
              <br />
              저는 그 순간을 가장 사랑합니다.
            </p>
            <div className="flex flex-col gap-1 mb-12 text-white/90 font-bold text-[16px] pc:text-[20px] leading-relaxed">
              <p>무너진 사장님들이 다시 웃는 장면</p>
              <p>가족이 다시 편안해지는 순간</p>
              <p>가게에 온기가 돌아오는 순간</p>
            </div>

            <div className="mb-12">
              <h3 className="text-[24px] pc:text-[36px] font-black leading-tight">
                “그 <span className="text-point-yellow">순간</span> 때문에
                <br />
                저는 이 일을 11년째 하고 있습니다.”
              </h3>
            </div>

            <p className="text-[20px] pc:text-[28px] font-bold">
              사장님... 혼자 버티지 마세요.
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-point-yellow">
                  제가 끝까지 함께 가겠습니다.
                </span>
                <span className="absolute bottom-1 left-0 w-full h-[8px] pc:h-[12px] bg-point-yellow/30"></span>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 3: 최종 CTA 섹션 (기존 코드 보존) --- */}
      <section className="w-full bg-white pt-[80px] pb-[80px] pc:pt-[100px] pc:pb-[100px] px-5 border-t border-gray-100">
        <div className="section-container flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-[24px] pc:text-[32px] font-bold text-[#151515] leading-tight">
              사장님 가게도{" "}
              <span className="text-point-red">살릴 수 있는지···</span>
              <br />
              지금 바로 <span className="text-point-red">계산</span>해드립니다.
            </h2>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-[450px] mb-12">
            <button
              className="bg-point-yellow text-[#151515] font-black text-[18px] pc:text-[20px] py-[18px] rounded-full shadow-lg hover:brightness-105 transition-all"
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              무료 업변 가능성 진단받기 &gt;
            </button>
            <button
              className="bg-white border-2 border-[#E5E5E5] text-[#151515] font-black text-[18px] pc:text-[20px] py-[18px] rounded-full shadow-sm hover:bg-gray-50 transition-all"
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              내 상권 기준 손익분석 받기 &gt;
            </button>
            <button
              className="bg-point-red text-white font-black text-[18px] pc:text-[20px] py-[18px] rounded-full shadow-lg hover:brightness-105 transition-all"
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              김창훈 대표 1:1 상담 신청하기 &gt;
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="/images/receipt-logo-colorful.png"
              alt="MJSP Logo"
              className="h-[80px] pc:h-[105px] object-contain opacity-80"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CostAnalysisSection;
