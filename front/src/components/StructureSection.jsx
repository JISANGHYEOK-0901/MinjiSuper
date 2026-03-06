import React from "react";

const StructureSection = () => {
  return (
    <section className="w-full flex flex-col">
      {/* 1. 무너져본 경험 / 사장님 마음 영역 (Light) - 이전 시안 완벽 반영 */}
      <div className="w-full bg-[#F9F9F9] pt-[80px] pb-[80px] pc:pt-[120px] pc:pb-[100px] text-center px-5 flex flex-col items-center">
        {/* 타이틀 */}
        <h2 className="text-[26px] pc:text-[34px] font-bold text-[#151515] leading-snug mb-10">
          제가 먼저 <span className="text-point-red">무너져봤습니다.</span>
          <br />
          그래서,{" "}
          <span className="text-point-red">사장님 마음을 잘 압니다</span>
        </h2>

        {/* 중앙 흰색 박스 (소프트 쉐도우 및 연노랑 박스 적용) */}
        <div className="w-full max-w-[440px] bg-white rounded-[16px] p-6 pc:p-8 flex flex-col gap-3 pc:gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)] mb-8">
          <div className="bg-[#FFF9EA] text-[#151515] font-bold py-4 rounded-[8px] text-[15px] pc:text-[16px] tracking-tight">
            '노동형 장사의 한계' 체감
          </div>
          <div className="bg-[#FFF9EA] text-[#151515] font-bold py-4 rounded-[8px] text-[15px] pc:text-[16px] tracking-tight">
            체력 소진
          </div>
          <div className="bg-[#FFF9EA] text-[#151515] font-bold py-4 rounded-[8px] text-[15px] pc:text-[16px] tracking-tight">
            매출 하락
          </div>
          <div className="bg-[#FFF9EA] text-[#151515] font-bold py-4 rounded-[8px] text-[15px] pc:text-[16px] tracking-tight">
            시스템 없는 가게
          </div>
        </div>

        {/* 빨간색 화살표 포인트 */}
        <div className="flex justify-center mb-8">
          <svg
            width="20"
            height="24"
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 32L0.74167 17H23.2583L12 32ZM14 0V19H10V0H14Z"
              fill="#D33535"
            />
          </svg>
        </div>

        {/* 하단 검은색 박스 (흰색 박스보다 넓게 비율 조정) */}
        <div className="w-full max-w-[580px] bg-[#151515] rounded-[12px] py-6 pc:py-8 px-4 flex flex-col items-center justify-center shadow-lg">
          <p className="text-white font-bold text-[16px] pc:text-[18px] leading-relaxed">
            점주 중심 + 오토 시스템 결합의
            <br />
            단순, 간편, 고수익 창출{" "}
            <span className="text-point-red">생존 구조 구축</span>
          </p>
        </div>
      </div>

      {/* 2. 브랜드 탄생 스토리 (Dark with Image) - 하단 시안 반영 */}
      <div className="relative w-full h-[300px] pc:h-[400px] flex items-center justify-center">
        <img
          src="/images/story-bg-food.jpg"
          alt="음식 배경"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65"></div>
        {/* 그 결과, [민지슈퍼(빨간배경)] [탄생(빨간글씨)] */}
        <h2 className="relative z-10 text-[26px] pc:text-[42px] font-extrabold text-white flex items-center justify-center flex-wrap gap-2 pc:gap-3">
          그 결과,
          <span className="bg-[#D33535] text-white px-2 py-1 pc:px-3 pc:py-1 leading-none rounded-[4px] shadow-md">
            민지슈퍼
          </span>
          <span className="text-[#D33535]">탄생</span>
        </h2>
      </div>

      {/* 3. 생존 매장 수 하이라이트 - 하단 시안 반영 */}
      <div className="w-full bg-[#151515] py-[80px] pc:py-[100px] text-center px-5">
        <p className="text-[24px] pc:text-[38px] font-extrabold text-white mb-6 tracking-tight">
          이미 <span className="text-point-yellow">200개 이상</span>의 가게가
          살아났습니다
        </p>
        <p className="text-[#D0D0D0] font-medium text-[15px] pc:text-[18px] tracking-tight">
          운영 시스템을 <span className="text-[#00C853] font-bold">재설계</span>
          하여,{" "}
          <span className="text-[#00C853] font-bold">장사가 되는 구조</span>로
          바꾸는 것
        </p>
      </div>
    </section>
  );
};

export default StructureSection;
