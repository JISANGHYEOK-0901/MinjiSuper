import React from "react";

const ReceiptSection = () => {
  return (
    <section className="w-full flex flex-col items-center">
      {/* 상단 텍스트 영역: 확실한 SVG 밑줄 강조 적용 */}
      <div className="w-full bg-[#FFFFFF] text-center px-5 pt-[60px] pb-[60px]">
        <h2 className="text-[22px] pc:text-[32px] font-extrabold text-[#151515] leading-snug tracking-tight">
          <span className="text-point-red">매출</span>이 중요한게 아니라···
          <br />
          <span className="relative inline-block pb-2">
            <span className="relative z-10 text-point-red">
              진짜 얼마가 남느냐
            </span>
            {/* 100% 렌더링 보장: 실제 SVG 태그 삽입 */}
            <div className="absolute -bottom-1 left-0 w-full h-[12px] overflow-visible">
              <svg
                viewBox="0 0 280 20"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0 15 Q 35 5, 70 15 T 140 15 T 210 15 T 280 15"
                  stroke="#FFD03B"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </span>
          가 중요합니다.
        </h2>
      </div>

      {/* 영수증 및 나머지 영역은 기존 픽셀 퍼펙트 코드 유지 */}
      <div className="relative w-full py-[80px] pc:py-[120px] px-5 flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/receipt-bg-blur.jpg"
            alt="영수증 배경"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 w-full max-w-[420px] bg-[#F3F3F3] rounded-sm shadow-2xl p-6 pc:p-10 text-[#151515] flex flex-col font-sans">
          <div className="text-center mb-4">
            <p className="font-bold text-[14px] pc:text-[16px] text-[#333]">
              민지슈퍼 브랜드 소개서 수치 기반
            </p>
          </div>
          <div className="w-full border-t border-dashed border-[#999] my-3"></div>
          <div className="flex justify-between items-center mb-6 font-extrabold text-[16px] pc:text-[18px] px-2">
            <span>월매출</span>
            <span>영업이익</span>
          </div>
          <div className="flex flex-col gap-4 px-2 mb-6 text-[16px] pc:text-[18px] font-bold">
            <div className="flex justify-between items-center">
              <span>4,500만원</span>
              <span className="text-point-red">1,155만원</span>
            </div>
            <div className="flex justify-between items-center">
              <span>6,000만원</span>
              <span className="text-point-red">1,620만원</span>
            </div>
            <div className="flex justify-between items-center">
              <span>8,000만원</span>
              <span className="text-point-red">2,240만원</span>
            </div>
          </div>
          <div className="w-full border-t border-dashed border-[#999] my-3"></div>
          <div className="flex flex-col items-center my-4">
            <div className="h-[50px] pc:h-[60px] w-full max-w-[300px] flex gap-[1.5px] justify-center mb-4">
              {[2, 4, 1, 3, 2, 5, 1, 4, 2, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2].map(
                (w, i) => (
                  <div
                    key={i}
                    className="bg-[#151515] h-full"
                    style={{ width: `${w}px` }}
                  ></div>
                ),
              )}
            </div>
            {/* 로고 에셋 적용 */}
            <img
              src="/images/receipt-logo-colorful.png"
              alt="MJSP Logo"
              className="h-[28px] pc:h-[32px] object-contain"
            />
          </div>
        </div>

        {/* 하단 푸터 텍스트: 시안의 하이라이트 반영 */}
        <div className="relative z-10 mt-12 text-center text-white">
          <p className="text-[16px] pc:text-[20px] font-medium mb-2">
            “허황된 매출이 아니라,
          </p>
          <p className="text-[18px] pc:text-[24px] font-bold">
            <span className="relative inline-block px-1">
              실제 남는 구조
              <span className="absolute bottom-1 left-0 w-full h-[12px] bg-point-yellow/60 -z-10 rounded-sm"></span>
            </span>
            만 공개합니다.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReceiptSection;
