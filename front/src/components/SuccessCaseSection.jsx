import React from "react";

const SuccessCaseSection = () => {
  // 시안에 맞춘 상세 데이터 배열
  const cases = [
    {
      id: 1,
      branch: "건대점",
      imgText1: "투자금 1,000만 원",
      imgText2: "업변 → 월매출 2,000 ~ 5,900만 원",
      prob: "경쟁 심한 상권, 평범한 술집",
      point: "메뉴 단순화\n가격 재설정\n2차 술집 구조",
      result: "최고 5,900만원\n월 매출 달성",
    },
    {
      id: 2,
      branch: "상봉점",
      imgText1: "일매출",
      imgText2: "300만 원 안정화",
      prob: "애매한 콘셉트, 낮은 회전율",
      point: "술·안주\n선택 피로도 제거",
      result: "일 매출\n300만 원",
    },
    {
      id: 3,
      branch: "김포점",
      imgText1: "테이블 6개",
      imgText2: "→ 일매출 150만 원 달성",
      prob: "소형 매장, 테이블 한계",
      point: "회전 중심 구조\n메뉴 압축",
      result: "작아도 되는 매장,\n충분한 매출",
    },
    {
      id: 4,
      branch: "사가정점",
      imgText1: "월매출 1,500만",
      imgText2: "→ 업변 후 5,000만 원",
      prob: "주거상권, 회전 안 되는 구조",
      point: "가볍게 먹고 마시는\n동네형 가맥",
      result: "월 매출\n3배 이상 상승",
    },
  ];

  // 카드 렌더링 함수
  const renderCard = (data) => (
    <div
      key={data.id}
      className="relative w-full rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white flex flex-col mt-4 pc:mt-0"
    >
      {/* 상단 핀 뱃지 */}
      <div className="absolute -top-4 -left-2 pc:-left-4 bg-point-green text-white px-4 py-1.5 rounded-full font-bold text-[15px] pc:text-[18px] shadow-md flex items-center gap-1 z-20">
        <span className="text-[14px]">📍</span> {data.branch}
      </div>

      {/* 상단 이미지 영역 */}
      <div className="relative w-full h-[100px] pc:h-[120px] rounded-t-[16px] overflow-hidden">
        <img
          src="/images/case-thumb.jpg"
          alt={data.branch}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 pc:px-8">
          <p className="text-white font-bold text-[13px] pc:text-[15px]">
            {data.imgText1}
          </p>
          <p className="text-white font-bold text-[14px] pc:text-[16px] mt-1">
            {data.imgText2}
          </p>
        </div>
      </div>

      {/* 하단 상세 내용 영역 */}
      <div className="p-6 pc:p-8 flex flex-col gap-4">
        {/* 기존 문제 */}
        <div className="flex items-start gap-4">
          <span className="bg-[#F1F1F1] text-[#666] px-3 py-1 rounded-[4px] text-[12px] font-bold shrink-0 w-[70px] text-center">
            기존 문제
          </span>
          <p className="text-[#444] text-[14px] pc:text-[15px] font-medium leading-snug">
            {data.prob}
          </p>
        </div>
        {/* 업변 포인트 */}
        <div className="flex items-start gap-4">
          <span className="bg-[#F1F1F1] text-[#666] px-3 py-1 rounded-[4px] text-[12px] font-bold shrink-0 w-[70px] text-center">
            업변 포인트
          </span>
          <p className="text-[#444] text-[14px] pc:text-[15px] font-medium leading-snug whitespace-pre-line">
            {data.point}
          </p>
        </div>
        {/* 결과 */}
        <div className="flex items-center gap-4 mt-2">
          <span className="bg-[#F1F1F1] text-[#666] px-3 py-1 rounded-[4px] text-[12px] font-bold shrink-0 w-[70px] text-center">
            결과
          </span>
          <p className="text-point-red text-[18px] pc:text-[22px] font-extrabold leading-tight whitespace-pre-line tracking-tight">
            {data.result}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#FFFFFF] pt-[80px] pb-[80px] pc:pt-[120px] pc:pb-[120px] px-5">
      <div className="section-container max-w-[900px]">
        {/* 상단 타이틀 영역 */}
        <div className="text-center mb-16">
          <h2 className="text-[28px] pc:text-[40px] font-bold text-[#151515] leading-tight mb-3 flex justify-center items-center gap-2">
            실제 업변
            <span className="text-point-red flex font-extrabold">
              {/* '성공사례' 글자 위에 빨간 점 표시 */}
              <span className="relative">
                성
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-point-red rounded-full"></span>
              </span>
              <span className="relative">
                공
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-point-red rounded-full"></span>
              </span>
              <span className="relative">
                사
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-point-red rounded-full"></span>
              </span>
              <span className="relative">
                례
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-point-red rounded-full"></span>
              </span>
            </span>
          </h2>
          <p className="text-[#151515] font-bold text-[15px] pc:text-[18px]">
            실제로 <span className="text-point-red">살아난 가게들</span>, 실제로{" "}
            <span className="text-point-red">바뀐 사장님들.</span>
          </p>
        </div>

        {/* 첫 번째 행 (건대점, 상봉점) */}
        <div className="grid grid-cols-1 pc:grid-cols-2 gap-8 pc:gap-10 mb-8 pc:mb-10">
          {renderCard(cases[0])}
          {renderCard(cases[1])}
        </div>

        {/* 중간 배너 1 */}
        <div className="flex flex-col pc:flex-row gap-4 mb-10 pc:mb-12">
          <div className="flex-1 bg-[#D33535] text-white text-center py-4 rounded-[8px] font-bold shadow-md text-[15px] pc:text-[16px] tracking-tight">
            "돈을 많이 쓴 게 아니라, 쓸 데를 정확히 골랐습니다."
          </div>
          <div className="flex-1 bg-[#FFD03B] text-[#151515] text-center py-4 rounded-[8px] font-bold shadow-md text-[15px] pc:text-[16px] tracking-tight">
            "돈을 많이 쓴 게 아니라, 쓸 데를 정확히 골랐습니다."
          </div>
        </div>

        {/* 두 번째 행 (김포점, 사가정점) */}
        <div className="grid grid-cols-1 pc:grid-cols-2 gap-8 pc:gap-10 mb-8 pc:mb-10">
          {renderCard(cases[2])}
          {renderCard(cases[3])}
        </div>

        {/* 중간 배너 2 */}
        <div className="flex flex-col pc:flex-row gap-4">
          <div className="flex-1 bg-[#FFD03B] text-[#151515] text-center py-4 rounded-[8px] font-bold shadow-md text-[15px] pc:text-[16px] tracking-tight">
            "큰 매장이 아니라, 맞는 구조가 필요합니다."
          </div>
          <div className="flex-1 bg-[#D33535] text-white text-center py-4 rounded-[8px] font-bold shadow-md text-[15px] pc:text-[16px] tracking-tight">
            "죽은 상권이 아니라, 업종이 안맞는겁니다."
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCaseSection;
