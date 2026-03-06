import React from "react";

const BusinessSystemSection = () => {
  return (
    <div className="w-full flex flex-col">
      {/* --- Section 1: SystemStepSection (Circular UI) --- */}
      <section className="relative w-full py-[100px] pc:py-[150px] px-5 overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/system-bg.jpg"
            alt="시스템 배경"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="section-container relative z-10 flex flex-col items-center">
          {/* 1~3단계 써클 레이아웃 (번호 위치를 이미지 아래로 이동) */}
          <div className="flex justify-center gap-6 pc:gap-16 mb-16 pc:mb-24">
            {[
              {
                id: 1,
                src: "/images/step-circle-01.jpg",
                text: "젊은 세대는 트렌드\n+ 높은 연령대는 추억감성 '레트로'",
              },
              {
                id: 2,
                src: "/images/step-circle-02.jpg",
                text: "높은 회전율 메뉴\n(떡볶이·치킨·과자)",
              },
              {
                id: 3,
                src: "/images/step-circle-03.jpg",
                text: "낮은 인건비 구조\n(2~2.5명 운영)",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center w-[120px] pc:w-[280px]"
              >
                {/* 이미지 영역: 번호 뱃지를 이미지 밖으로 뺐습니다 */}
                <div className="relative w-[100px] h-[100px] pc:w-[220px] pc:h-[220px] rounded-full overflow-hidden border-[4px] border-white/50 mb-6 shadow-2xl">
                  <img
                    src={item.src}
                    alt={`Step ${item.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 번호 뱃지: 시안과 동일하게 이미지와 텍스트 사이에 배치 */}
                <div className="bg-white text-black w-7 h-7 pc:w-11 pc:h-11 rounded-full flex items-center justify-center font-black text-[14px] pc:text-[22px] mb-4 shadow-xl">
                  {item.id}
                </div>

                <p className="text-white text-[12px] pc:text-[19px] font-bold leading-snug whitespace-pre-line tracking-tight drop-shadow-md">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* 4~5단계: 번호 배치를 상단과 통합하여 일관성 유지 */}
          <div className="flex flex-row gap-10 pc:gap-32 mb-16">
            {[
              { id: 4, text: "감성+경험+시스템 결합" },
              { id: 5, text: "홀/배달/포장 매출 다각화 전략" },
            ].map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-3">
                <span className="bg-white text-black w-6 h-6 pc:w-9 pc:h-9 rounded-full flex items-center justify-center font-black text-[13px] pc:text-[18px]">
                  {item.id}
                </span>
                <p className="text-white font-extrabold text-[16px] pc:text-[22px] tracking-tight">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* 폰트 컬러 반전 적용: 전체 빨간색, 핵심 키워드만 흰색 강조 */}
          <p className="text-point-red font-bold text-[15px] pc:text-[21px] tracking-tight">
            "지금 시대는 <span className="text-white">원금회수 속도</span>가
            전부입니다. <span className="text-white">민지슈퍼</span>는 여기에
            목숨 겁니다."
          </p>
        </div>
      </section>

      {/* --- Section 2: AutoStructureSection (Red-White Cards) --- */}
      <section className="relative w-full py-[100px] pc:py-[150px] px-5 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-[0.8]">
          <img
            src="/images/mjsp-bg.png"
            alt="MJSP"
            className="w-full h-full object-contain pc:scale-125"
          />
        </div>
        <div className="section-container relative z-10 flex flex-col items-center text-center">
          <h2 className="text-[28px] pc:text-[46px] font-extrabold text-[#151515] leading-tight mb-20 tracking-tighter">
            사장님이 없어도
            <br />
            <span className="text-point-red">제대로 돌아가는 구조</span>를
            만듭니다.
          </h2>
          <div className="grid grid-cols-1 pc:grid-cols-3 gap-8 w-full max-w-[1100px]">
            {[
              {
                title: "1. 운영 시스템 최적화",
                desc: "매뉴얼 기반, 반복 업무 자동화,\n감성 유지 + 효율 확보",
              },
              {
                title: "2. 셀프 서비스 구조",
                desc: "키오스크, 셀프존,\n회전율 상승 동선",
              },
              {
                title: "3. 메뉴 단순화 구조",
                desc: "빠른 준비, 초보도 운영 가능,\n일관된 맛 유지",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-[16px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.12)] bg-white border border-gray-100 transform transition-transform hover:-translate-y-2"
              >
                <div className="bg-point-red py-4 pc:py-5">
                  <h3 className="text-white font-black text-[19px] pc:text-[23px] tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <div className="py-10 px-6 min-h-[140px] flex items-center justify-center">
                  <p className="text-[#333] font-bold text-[16px] pc:text-[18px] leading-relaxed whitespace-pre-line tracking-tight">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: EducationSection & SpeakerSection (Red Dots & Highlight) - 시안 완벽 반영 --- */}
      <section className="w-full bg-[#F5F5F5] pt-[100px] pb-[100px] pc:pt-[140px] pc:pb-[140px] px-5">
        <div className="section-container flex flex-col items-center">
          <div className="text-center mb-24">
            <h2 className="text-[28px] pc:text-[44px] font-extrabold text-[#151515] leading-tight mb-6 tracking-tight">
              민지는 ‘매장’보다
              <br />
              <span className="text-point-red">‘사장’이 더 중요합니다</span>
            </h2>
            {/* 극과 극! 빨간색 필(Pill) 디자인 적용 */}
            <p className="text-[#151515] font-bold text-[15px] pc:text-[19px]">
              아무리 좋은 브랜드라도 운영하는 사람에 따라 매출은{" "}
              <span className="bg-[#D33535] text-white px-3 py-1 rounded-[4px] text-[14px] pc:text-[17px] font-black mx-1">
                극과 극!
              </span>
            </p>
          </div>

          {/* 교육 로드맵 (시안의 회색 원형 아이콘 스타일 재현) */}
          <div className="w-full max-w-[1050px] mb-24 flex flex-col gap-10">
            <div className="relative bg-white rounded-[20px] p-10 pc:p-12 shadow-xl border border-gray-100">
              <span className="absolute -top-4 left-10 bg-point-yellow text-[#151515] font-extrabold px-5 py-1.5 rounded-full text-[14px] shadow-sm tracking-tight">
                운영 교육
              </span>
              <div className="grid grid-cols-2 pc:grid-cols-4 gap-8 pc:gap-10">
                {[
                  "직원 매뉴얼",
                  "인건비 관리",
                  "회전율 설계",
                  "동선 최적화",
                ].map((t, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 pc:w-20 pc:h-20 bg-[#999] rounded-full shadow-inner"></div>
                    <span className="text-[14px] pc:text-[16px] font-bold text-[#333] border-b-2 border-gray-300 pb-1.5 tracking-tight">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative bg-white rounded-[20px] p-10 pc:p-12 shadow-xl border border-gray-100">
              <span className="absolute -top-4 left-10 bg-point-yellow text-[#151515] font-extrabold px-5 py-1.5 rounded-full text-[14px] shadow-sm tracking-tight">
                마케팅 교육
              </span>
              <div className="grid grid-cols-2 pc:grid-cols-4 gap-8 pc:gap-10">
                {[
                  "플레이스 세팅",
                  "리뷰 구조화",
                  "SNS·릴스 제작",
                  "지역광고 세팅",
                ].map((t, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 pc:w-20 pc:h-20 bg-[#999] rounded-full shadow-inner"></div>
                    <span className="text-[14px] pc:text-[16px] font-bold text-[#333] border-b-2 border-gray-300 pb-1.5 tracking-tight">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 강사 소개 영역: 시안의 텍스트 정렬 및 이미지 높이 동기화 */}
          <div className="w-full max-w-[1050px] flex flex-col pc:flex-row items-start gap-12 pc:gap-24">
            {/* 텍스트 영역: PC에서 우측 정렬 및 이미지 상단 정렬 */}
            <div className="flex-1 flex flex-col items-center pc:items-end order-2 pc:order-1 text-center pc:text-right pc:pt-4">
              <div className="mb-10">
                <p className="text-[#333] font-bold text-[19px] pc:text-[23px] mb-2">
                  마케팅 전문가 김경문 강사의
                </p>

                {/* 5개 빨간 점: '실전 마케팅' 텍스트 바로 위 정밀 배치 */}
                <div className="flex gap-1.5 justify-center pc:justify-end mb-2 px-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-point-red rounded-full"
                    ></div>
                  ))}
                </div>

                <p className="text-[#151515] font-black text-[26px] pc:text-[34px] tracking-tighter">
                  실전 마케팅 그대로 전수
                </p>
              </div>

              {/* 강조 문구: 시안과 동일한 두꺼운 블랙 띠 배경 적용 */}
              <h3 className="text-[26px] pc:text-[38px] font-black text-[#151515] leading-[1.4] tracking-tighter">
                “사장님을
                <br />
                <span className="bg-black text-point-yellow px-5 py-2 inline-block my-2 shadow-lg">
                  운영 전문가 + 마케팅 전문가
                </span>
                <br />로 만들어드립니다.”
              </h3>
            </div>

            {/* 이미지 영역: 시안의 깊은 라운드와 부드러운 그림자 반영 */}
            <div className="flex-1 order-1 pc:order-2 w-full max-w-[500px]">
              <img
                src="/images/step-photo-lecture.jpg"
                alt="김경문 강사"
                className="w-full h-auto rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessSystemSection;
