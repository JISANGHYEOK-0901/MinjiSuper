import React from "react";

const BusinessSystemSection = () => {
  return (
    <div className="w-full flex flex-col">
      {/* --- Section 1: SystemStepSection (Circular UI) --- */}
      <section className="relative w-full py-[30px] pc:py-[150px] overflow-hidden">
        {/* 배경 이미지 (공통) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/system-bg.jpg"
            alt="시스템 배경"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 pc:bg-black/75"></div>
        </div>

        {/* ==========================================
            [PC 전용 UI] 기존 코드 100% 보존 영역
            (hidden pc:flex 로 모바일에서 숨김)
        ========================================== */}
        <div className="section-container relative z-10 hidden pc:flex flex-col items-center px-5 pc:px-0">
          {/* 1~3단계 써클 레이아웃 */}
          <div className="flex justify-center gap-6 pc:gap-16 mb-16 pc:mb-24">
            {[
              {
                id: 1,
                src: "/images/step-circle-03.jpg",
                text: "젊은 세대는 트렌드\n+ 높은 연령대는 추억감성 '레트로'",
              },
              {
                id: 2,
                src: "/images/step-circle-01.jpg",
                text: "높은 회전율 메뉴\n(떡볶이·치킨·과자)",
              },
              {
                id: 3,
                src: "/images/step-circle-02.jpg",
                text: "낮은 인건비 구조\n(2~2.5명 운영)",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center w-[120px] pc:w-[280px]"
              >
                <div className="relative w-[100px] h-[100px] pc:w-[220px] pc:h-[220px] rounded-full overflow-hidden border-[4px] border-white/50 mb-6 shadow-2xl">
                  <img
                    src={item.src}
                    alt={`Step ${item.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white text-black w-7 h-7 pc:w-11 pc:h-11 rounded-full flex items-center justify-center font-black text-[14px] pc:text-[22px] mb-4 shadow-xl">
                  {item.id}
                </div>
                <p className="text-white text-[12px] pc:text-[19px] font-bold leading-snug whitespace-pre-line tracking-tight drop-shadow-md">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* 4~5단계 */}
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

          <p className="text-point-red font-bold text-[15px] pc:text-[21px] tracking-tight">
            "지금 시대는 <span className="text-white">원금회수 속도</span>가
            전부입니다. <span className="text-white">민지슈퍼</span>는 여기에
            목숨 겁니다."
          </p>
        </div>

        {/* ==========================================
            [모바일 전용 UI] 픽셀퍼펙트 영역
            (flex pc:hidden 으로 PC에서 숨김)
        ========================================== */}
        {/* 💡 세 번째 원형 이미지의 하단 짤림을 자연스럽게 덮기 위해 pb-24 부여 */}
        <div className="relative z-10 flex pc:hidden flex-col w-full pb-24">
          {/* 상단 타이틀 영역 */}
          <div className="flex flex-col items-center text-center px-5 mb-12 w-full">
            <p className="text-white font-bold text-[14px] mb-2 tracking-tight">
              11년 기획으로 만든
            </p>
            {/* 노란색 박스 하이라이트 */}
            <div className="bg-point-yellow px-5 py-2.5 mb-4 w-fit mx-auto shadow-lg rounded-[2px]">
              <h2 className="text-[#151515] font-black text-[24px] tracking-tight">
                '지금시대 <span className="text-point-red">최적화</span> 브랜드'
              </h2>
            </div>
            <p className="text-white font-bold text-[14px] tracking-tight">
              끝까지 살아남는 <span className="text-point-yellow">브랜드</span>
              는 이렇게 만들어집니다.
            </p>
          </div>

          {/* 리스트 영역 */}
          <div className="w-full flex flex-col gap-14">
            {/* 그룹 1 (배너 1,2,3 + 이미지 02) */}
            <div className="relative w-full min-h-[160px] flex flex-col justify-center">
              {/* 💡 요청사항: 서클 이미지가 빨간 타원 배경 위(앞)로 오도록 z-20 설정 */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full overflow-hidden border-[2px] border-white/20 shadow-2xl z-20">
                <img
                  src="/images/step-circle-02.jpg"
                  alt="트렌디 레트로"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 배너 리스트 (이미지보다 뒤로 가도록 z-10 설정) */}
              <div className="flex flex-col gap-3 relative z-25">
                {/* 텍스트가 이미지에 너무 가려지지 않도록 pr-12 등 우측 여백 확보 */}
                <div className="bg-[#D33535] text-white rounded-r-full w-[88%] pl-5 pr-14 py-[14px] shadow-xl">
                  <p className="font-bold text-[14px] leading-[1.6] tracking-tight">
                    젊은 세대는{" "}
                    <span className="bg-[#FFD03B] text-[#151515] px-1 rounded-sm">
                      트렌디
                    </span>
                    <br />+ 높은 연령대는 추억감성{" "}
                    <span className="bg-[#FFD03B] text-[#151515] px-1 rounded-sm">
                      레트로
                    </span>
                  </p>
                </div>
                <div className="bg-[#D33535] text-white rounded-r-full w-[78%] pl-5 pr-12 py-[14px] shadow-xl">
                  <p className="font-bold text-[14px] leading-snug tracking-tight">
                    <span className="bg-[#FFD03B] text-[#151515] px-1 rounded-sm">
                      낮은 인건비
                    </span>{" "}
                    구조 (2~2.5명 운영)
                  </p>
                </div>
                <div className="bg-[#D33535] text-white rounded-r-full w-[88%] pl-5 pr-12 py-[14px] shadow-xl">
                  <p className="font-bold text-[14px] leading-snug tracking-tight">
                    <span className="bg-[#FFD03B] text-[#151515] px-1 rounded-sm">
                      높은 회전율
                    </span>{" "}
                    메뉴 (떡볶이·치킨·과자)
                  </p>
                </div>
              </div>
            </div>

            {/* 그룹 2 (배너 4,5 + 이미지 01) */}
            <div className="relative w-full min-h-[140px] flex flex-col justify-center">
              {/* 💡 요청사항: 서클 이미지가 빨간 타원 배경 위(앞)로 오도록 z-20 설정 */}
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full overflow-hidden border-[2px] border-white/20 shadow-2xl z-20">
                <img
                  src="/images/step-circle-01.jpg"
                  alt="시스템 결합"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <div className="bg-[#D33535] text-white rounded-r-full w-[72%] pl-5 pr-10 py-4 shadow-xl">
                  <p className="font-bold text-[14px] leading-snug tracking-tight">
                    <span className="text-point-yellow">감성·경험·시스템</span>{" "}
                    결합
                  </p>
                </div>
                <div className="bg-[#D33535] text-white rounded-r-full w-[84%] pl-5 pr-12 py-4 shadow-xl">
                  <p className="font-bold text-[14px] leading-snug tracking-tight">
                    홀/배달/포장{" "}
                    <span className="text-point-yellow">매출 다각화 전략</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 텍스트 및 3번째 이미지 그룹 */}
          <div className="w-full mt-20 relative flex flex-col justify-end min-h-[160px]">
            {/* 텍스트 영역 (우측으로 치우쳐 짤린 이미지와 밸런스 형성) */}
            <div className="text-right px-5 relative z-20 w-full">
              <p className="text-white font-bold text-[15px] leading-[1.8] tracking-tight break-keep text-center ">
                "지금 시대는 <span className="text-point-yellow">원금회수</span>{" "}
                속도가 전부입니다.
                <br />
                민지슈퍼는 여기에{" "}
                <span className="text-point-yellow">목숨</span> 겁니다."
              </p>
            </div>

            {/* 💡 요청사항: 좌측 하단에 위치시키고, Section의 overflow-hidden을 이용해 의도적으로 20%가 잘리게 처리 */}
            <div className="absolute -left-[15%] -bottom-[-10%] w-[190px] h-[190px] rounded-full overflow-hidden border-[2px] border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-10 pointer-events-none">
              <img
                src="/images/step-circle-03.jpg"
                alt="원금회수"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
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

      {/* --- Section 3: EducationSection & SpeakerSection (Red Dots & Highlight) --- */}
      {/* 💡 가디언 수정: 모바일 100% 꽉 채우기를 위해 최상단 section의 px-5 제거 */}
      <section className="w-full bg-[#F5F5F5] pt-[100px] pb-0 pc:pb-[140px] pc:pt-[140px] overflow-hidden">
        {/* ==========================================
            [공통 UI & PC 전용 UI] 안전 구역 (기존 좌우 여백 및 중앙 정렬 유지)
        ========================================== */}
        <div className="section-container flex flex-col items-center">
          {/* 상단 타이틀 영역 (공통) */}
          <div className="text-center mb-16 pc:mb-24">
            <h2 className="text-[28px] pc:text-[44px] font-extrabold text-[#151515] leading-tight mb-6 tracking-tight">
              민지는 ‘매장’보다
              <br />
              <span className="text-point-red">‘사장’이 더 중요합니다</span>
            </h2>
            {/* 극과 극! 빨간색 필(Pill) 디자인 적용 */}
            <p className="text-[#151515] font-bold text-[15px] pc:text-[19px]">
              아무리 좋은 브랜드라도 운영하는 사람에 따라
              <br /> 매출은{" "}
              <span className="bg-[#D33535] text-white px-3 py-1 rounded-[4px] text-[14px] pc:text-[17px] font-black mx-1 shadow-sm">
                극과 극!
              </span>
            </p>
          </div>

          {/* PC 전용 로드맵 & 강사 소개 (hidden pc:flex 로 모바일에서 숨김) */}
          <div className="hidden pc:flex flex-col w-full items-center">
            {/* 교육 로드맵 */}
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

            {/* 강사 소개 영역 */}
            <div className="w-full max-w-[1050px] flex flex-col pc:flex-row items-start gap-12 pc:gap-24">
              {/* 텍스트 영역 */}
              <div className="flex-1 flex flex-col items-center pc:items-end order-2 pc:order-1 text-center pc:text-right pc:pt-4">
                <div className="mb-10">
                  <p className="text-[#333] font-bold text-[19px] pc:text-[23px] mb-2">
                    마케팅 전문가 김경문 강사의
                  </p>
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
                <h3 className="text-[26px] pc:text-[38px] font-black text-[#151515] leading-[1.4] tracking-tighter">
                  “사장님을
                  <br />
                  <span className="bg-black text-point-yellow px-5 py-2 inline-block my-2 shadow-lg">
                    운영 전문가 + 마케팅 전문가
                  </span>
                  <br />로 만들어드립니다.”
                </h3>
              </div>

              {/* 이미지 영역 */}
              <div className="flex-1 order-1 pc:order-2 w-full max-w-[500px]">
                <img
                  src="/images/step-photo-lecture.jpg"
                  alt="김경문 강사"
                  className="w-full h-auto rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            [모바일 전용 UI] 화면 꽉 채우기
            (section-container 외부로 분리하여 패딩 간섭 제거)
        ========================================== */}
        <div className="flex pc:hidden flex-col w-full">
          {/* 1. 모바일 로드맵 영역 (화면 양옆 끝까지 꽉 차는 배경) */}
          <div className="relative w-full py-12 flex justify-center px-5 overflow-hidden">
            {/* 배경 이미지 */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/feature-bg-02.jpg"
                alt="매장 배경"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* 교육 박스 컨테이너 */}
            <div className="relative z-10 flex gap-4 w-full max-w-[360px]">
              {/* 운영 교육 */}
              <div className="flex-1 bg-white/95 backdrop-blur-md rounded-[12px] pt-8 pb-6 shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex flex-col items-center gap-3 relative border border-white/40">
                <div className="absolute -top-3.5 bg-point-yellow text-[#151515] font-black px-4 py-1.5 rounded-[4px] shadow-sm text-[13px] tracking-tight">
                  운영 교육
                </div>
                {[
                  "직원 매뉴얼",
                  "인건비 관리",
                  "회전율 설계",
                  "동선 최적화",
                ].map((t, i) => (
                  <span
                    key={i}
                    className="text-[13px] font-bold text-[#151515] tracking-tight"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* 마케팅 교육 */}
              <div className="flex-1 bg-white/95 backdrop-blur-md rounded-[12px] pt-8 pb-6 shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex flex-col items-center gap-3 relative border border-white/40">
                <div className="absolute -top-3.5 bg-point-yellow text-[#151515] font-black px-4 py-1.5 rounded-[4px] shadow-sm text-[13px] tracking-tight">
                  마케팅 교육
                </div>
                {[
                  "플레이스 세팅",
                  "리뷰 구조화",
                  "SNS·릴스 제작",
                  "지역광고 세팅",
                ].map((t, i) => (
                  <span
                    key={i}
                    className="text-[13px] font-bold text-[#151515] tracking-tight"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. 모바일 강사 소개 영역 (중앙 정렬 및 세로 배치로 세련되게 개편) */}
          <div className="w-full bg-[#EAEAEA] pt-12 pb-14 px-5 flex flex-col items-center justify-center gap-8">
            {/* 상단 텍스트 (소개 및 타이틀) */}
            <div className="flex flex-col items-center text-center w-full break-keep">
              <p className="font-bold text-[14px] text-[#555] mb-2 tracking-tight">
                마케팅 전문가 김경문 강사의
              </p>

              {/* "실전 마케팅 그대로 전수" - 중앙 정렬 */}
              <div className="flex flex-col items-center">
                <span className="relative inline-block mt-3 mb-1">
                  {/* 5개의 붉은 점 중앙 정렬 배치 */}
                  <span className="absolute -top-[12px] left-0 w-full flex justify-between px-[4px]">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="w-[5px] h-[5px] bg-point-red rounded-full"
                      ></span>
                    ))}
                  </span>
                  <span className="bg-point-yellow px-2 py-0.5 font-black text-[18px] text-[#151515] relative z-10">
                    실전 마케팅
                  </span>
                </span>
                <span className="font-black text-[18px] text-[#151515] tracking-tight mt-1">
                  그대로 전수
                </span>
              </div>
            </div>

            {/* 이미지 영역 (가운데 정렬, 크기 확대) */}
            <div className="w-[160px] shrink-0">
              <img
                src="/images/step-photo-lecture-02.jpg"
                alt="김경문 강사"
                className="w-full h-auto shadow-lg rounded-[8px]"
              />
            </div>

            {/* 하단 강조 문구 */}
            <div className="flex flex-col items-center text-center w-full break-keep">
              <p className="font-black text-[15px] text-[#151515] leading-[1.8] tracking-tight">
                “사장님을
                <br />
                <span className="bg-point-yellow px-1.5 py-0.5 inline-block my-1">
                  운영 전문가
                </span>{" "}
                +{" "}
                <span className="bg-point-yellow px-1.5 py-0.5 inline-block mb-1">
                  {" "}
                  마케팅 전문가
                </span>
                <br />로 만들어드립니다.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessSystemSection;
