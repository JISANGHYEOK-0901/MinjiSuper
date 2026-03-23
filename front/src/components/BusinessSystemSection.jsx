import React from "react";
import { motion } from "framer-motion";

// 💡 [가디언 설정] 이미지 네이밍 최적화 및 데이터 구조화
const educationData = [
  {
    title: "운영 교육",
    items: [
      { t: "직원 매뉴얼", icon: "/images/icons/icon-manual.png" },
      { t: "인건비 관리", icon: "/images/icons/icon-labor.png" },
      { t: "회전율 설계", icon: "/images/icons/icon-turnover.png" },
      { t: "동선 최적화", icon: "/images/icons/icon-path.png" },
    ],
  },
  {
    title: "마케팅 교육",
    items: [
      { t: "플레이스 세팅", icon: "/images/icons/icon-place.png" },
      { t: "리뷰 구조화", icon: "/images/icons/icon-review.png" },
      { t: "SNS·릴스 제작", icon: "/images/icons/icon-reels.png" },
      { t: "지역광고 세팅", icon: "/images/icons/icon-ad.png" },
    ],
  },
];

const BusinessSystemSection = () => {
  // 💡 [가디언 설정] 애니메이션 세트
  const blurRevealVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 15 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scalePopVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const dotPopVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 12 },
    },
  };

  return (
    <div className="w-full flex flex-col overflow-hidden">
      {/* --- Section 1: SystemStepSection (Circular UI) --- */}
      <section className="relative w-full py-[60px] pc:py-[150px] overflow-hidden">
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
            [PC 전용 UI]
        ========================================== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="section-container relative z-10 hidden pc:flex flex-col items-center px-5 pc:px-0"
        >
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
              <motion.div
                variants={scalePopVariants}
                key={item.id}
                className="flex flex-col items-center text-center w-[120px] pc:w-[280px]"
              >
                <div className="relative w-[100px] h-[100px] pc:w-[220px] pc:h-[220px] rounded-full overflow-hidden border-[4px] border-white/50 mb-6 shadow-2xl">
                  <img
                    src={item.src}
                    alt={`Step ${item.id}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="bg-white text-black w-7 h-7 pc:w-11 pc:h-11 rounded-full flex items-center justify-center font-black text-[14px] pc:text-[22px] mb-4 shadow-xl">
                  {item.id}
                </div>
                <p className="text-white text-[12px] pc:text-[19px] font-bold leading-snug whitespace-pre-line tracking-tight drop-shadow-md break-keep">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 4~5단계 */}
          <div className="flex flex-row gap-10 pc:gap-32 mb-16">
            {[
              { id: 4, text: "감성+경험+시스템 결합" },
              { id: 5, text: "홀/배달/포장 매출 다각화 전략" },
            ].map((item) => (
              <motion.div
                variants={blurRevealVariants}
                key={item.id}
                className="flex flex-col items-center gap-3"
              >
                <span className="bg-white text-black w-6 h-6 pc:w-9 pc:h-9 rounded-full flex items-center justify-center font-black text-[13px] pc:text-[18px]">
                  {item.id}
                </span>
                <p className="text-white font-extrabold text-[16px] pc:text-[22px] tracking-tight break-keep">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={blurRevealVariants}
            className="text-point-red font-bold text-[15px] pc:text-[21px] tracking-tight break-keep"
          >
            "지금 시대는 <span className="text-white">원금회수 속도</span>가
            전부입니다. <span className="text-white">민지슈퍼</span>는 여기에
            목숨 겁니다."
          </motion.p>
        </motion.div>

        {/* ==========================================
            [모바일 전용 UI]
        ========================================== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-10 flex pc:hidden flex-col w-full pb-24"
        >
          {/* 상단 타이틀 영역 */}
          <motion.div
            variants={blurRevealVariants}
            className="flex flex-col items-center text-center px-5 mb-12 w-full"
          >
            <p className="text-white font-bold text-[14px] mb-2 tracking-tight break-keep">
              11년 기획으로 만든
            </p>
            <div className="bg-point-yellow px-5 py-2.5 mb-4 w-fit mx-auto shadow-lg rounded-[2px]">
              <h2 className="text-[#151515] font-black text-[22px] tracking-tight break-keep">
                '지금 시대 <span className="text-point-red">최적화</span> 브랜드'
              </h2>
            </div>
            <p className="text-white font-bold text-[14px] tracking-tight break-keep">
              끝까지 살아남는 <span className="text-point-yellow">브랜드</span>
              는 이렇게 만들어집니다.
            </p>
          </motion.div>

          {/* 리스트 영역 */}
          <div className="w-full flex flex-col gap-14">
            <div className="relative w-full min-h-[160px] flex flex-col justify-center">
              <motion.div
                variants={scalePopVariants}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-[132px] h-[132px] min-[381px]:-right-8 min-[381px]:w-[160px] min-[381px]:h-[160px] rounded-full overflow-hidden border-[2px] border-white/20 shadow-2xl z-20"
              >
                <img
                  src="/images/step-circle-02.jpg"
                  alt="트렌디 레트로"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex flex-col gap-3 relative z-25">
                {[
                  {
                    w: "80%",
                    pr: "pr-10 min-[381px]:pr-14",
                    text: (
                      <>
                        젊은 세대는{" "}
                        <span className="bg-[#FFD03B] text-[#151515] px-1 rounded-sm">
                          트렌디
                        </span>
                        <br />+ 높은 연령대는 추억감성{" "}
                        <span className="bg-[#FFD03B] text-[#151515] px-1 rounded-sm">
                          레트로
                        </span>
                      </>
                    ),
                  },
                  {
                    w: "72%",
                    pr: "pr-8 min-[381px]:pr-12",
                    text: (
                      <>
                        <span className="bg-[#FFD03B] text-[#151515] px-1 rounded-sm">
                          낮은 인건비
                        </span>{" "}
                        구조 (2~2.5명 운영)
                      </>
                    ),
                  },
                  {
                    w: "80%",
                    pr: "pr-8 min-[381px]:pr-12",
                    text: (
                      <>
                        <span className="bg-[#FFD03B] text-[#151515] px-1 rounded-sm">
                          높은 회전율
                        </span>{" "}
                        메뉴 (떡볶이·치킨·과자)
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <motion.div
                    variants={blurRevealVariants}
                    key={i}
                    className={`bg-[#D33535] text-white rounded-r-full pl-5 py-[14px] shadow-xl ${item.pr}`}
                    style={{ width: item.w }}
                  >
                    <p className="font-bold text-[13.5px] leading-snug tracking-tight break-keep">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative w-full min-h-[140px] flex flex-col justify-center">
              <motion.div
                variants={scalePopVariants}
                className="absolute -right-6 top-1/2 -translate-y-1/2 w-[142px] h-[142px] min-[381px]:-right-10 min-[381px]:w-[180px] min-[381px]:h-[180px] rounded-full overflow-hidden border-[2px] border-white/20 shadow-2xl z-20"
              >
                <img
                  src="/images/step-circle-01.jpg"
                  alt="시스템 결합"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex flex-col gap-3 relative z-10">
                {[
                  {
                    w: "68%",
                    text: (
                      <>
                        <span className="text-point-yellow">
                          감성·경험·시스템
                        </span>{" "}
                        결합
                      </>
                    ),
                  },
                  {
                    w: "78%",
                    text: (
                      <>
                        홀/배달/포장{" "}
                        <span className="text-point-yellow">
                          매출 다각화 전략
                        </span>
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <motion.div
                    variants={blurRevealVariants}
                    key={i}
                    className="bg-[#D33535] text-white rounded-r-full pl-5 pr-10 py-4 shadow-xl"
                    style={{ width: item.w }}
                  >
                    <p className="font-bold text-[14px] leading-snug tracking-tight break-keep">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full mt-20 relative flex flex-col justify-end min-h-[160px]">
            <motion.div
              variants={blurRevealVariants}
              className="text-right px-5 relative z-20 w-full"
            >
              <p className="text-white font-bold text-[15px] leading-[1.8] tracking-tight break-keep text-center">
                "지금 시대는 <span className="text-point-yellow">원금회수</span>{" "}
                속도가 전부입니다.
                <br />
                민지슈퍼는 여기에{" "}
                <span className="text-point-yellow">목숨</span> 겁니다."
              </p>
            </motion.div>
            <motion.div
              variants={scalePopVariants}
              className="absolute -left-[8%] -bottom-[-8%] w-[138px] h-[138px] min-[381px]:-left-[15%] min-[381px]:-bottom-[-10%] min-[381px]:w-[190px] min-[381px]:h-[190px] rounded-full overflow-hidden border-[2px] border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-10 pointer-events-none"
            >
              <img
                src="/images/step-circle-03.jpg"
                alt="원금회수"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- Section 2: AutoStructureSection --- */}
      <section className="relative w-full py-[100px] pc:py-[150px] px-5 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-[0.8]">
          <img
            src="/images/mjsp-bg.png"
            alt="MJSP"
            className="w-full h-full object-contain pc:scale-125"
          />
        </div>
        <motion.div
          className="section-container relative z-10 flex flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2
            variants={blurRevealVariants}
            className="text-[28px] pc:text-[46px] font-extrabold text-[#151515] leading-tight mb-20 tracking-tighter break-keep"
          >
            사장님이 없어도
            <br />
            <span className="text-point-red">제대로 돌아가는 구조</span>를
            만듭니다.
          </motion.h2>
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
              <motion.div
                variants={scalePopVariants}
                key={idx}
                className="flex flex-col rounded-[16px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.12)] bg-white border border-gray-100 transform transition-transform hover:-translate-y-2"
              >
                <div className="bg-point-red py-4 pc:py-5">
                  <h3 className="text-white font-black text-[19px] pc:text-[23px] tracking-tight break-keep">
                    {card.title}
                  </h3>
                </div>
                <div className="py-10 px-6 min-h-[140px] flex items-center justify-center">
                  <p className="text-[#333] font-bold text-[16px] pc:text-[18px] leading-relaxed whitespace-pre-line tracking-tight break-keep">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- Section 3: Education & Speaker Section (아이콘 반영 영역) --- */}
      <section className="w-full bg-[#F5F5F5] pt-[100px] pb-0 pc:pb-[140px] pc:pt-[140px] overflow-hidden">
        <motion.div
          className="section-container flex flex-col items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            variants={blurRevealVariants}
            className="text-center mb-16 pc:mb-24"
          >
            <h2 className="text-[28px] pc:text-[44px] font-extrabold text-[#151515] leading-tight mb-6 tracking-tight break-keep">
              민지는 ‘매장’보다
              <br />
              <span className="text-point-red">‘사장’이 더 중요합니다</span>
            </h2>
            <p className="text-[#151515] font-bold text-[15px] pc:text-[19px] break-keep">
              아무리 좋은 브랜드라도 운영하는 사람에 따라
              <br className="block pc:hidden" /> 매출은{" "}
              <span className="bg-[#D33535] text-white px-3 py-1 rounded-[4px] text-[14px] pc:text-[17px] font-black mx-1 shadow-sm">
                극과 극!
              </span>
            </p>
          </motion.div>

          {/* PC 전용 로드맵 */}
          <div className="hidden pc:flex flex-col w-full items-center">
            <div className="w-full max-w-[1050px] mb-24 flex flex-col gap-10">
              {educationData.map((box, bIdx) => (
                <motion.div
                  variants={scalePopVariants}
                  key={bIdx}
                  className="relative bg-white rounded-[20px] p-10 pc:p-12 shadow-xl border border-gray-100"
                >
                  <span className="absolute -top-4 left-10 bg-point-yellow text-[#151515] font-extrabold px-5 py-1.5 rounded-full text-[14px] shadow-sm tracking-tight">
                    {box.title}
                  </span>
                  <div className="grid grid-cols-4 gap-10">
                    {box.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-4 group"
                      >
                        {/* 💡 [개선] 회색 원 대신 흰색 배경 + 아이콘 삽입 */}
                        <div className="w-20 h-20 bg-white rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.05),0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center p-5 group-hover:scale-110 group-hover:shadow-point-yellow/20 transition-all duration-300">
                          <img
                            src={item.icon}
                            alt={item.t}
                            className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <span className="text-[16px] font-bold text-[#333] border-b-2 border-gray-200 pb-1.5 tracking-tight group-hover:border-point-yellow transition-colors">
                          {item.t}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 강사 소개 영역 */}
            <div className="w-full max-w-[1050px] flex flex-row items-start gap-24">
              <motion.div
                variants={blurRevealVariants}
                className="flex-1 flex flex-col items-end text-right pt-4"
              >
                <div className="mb-10">
                  <p className="text-[#333] font-bold text-[23px] mb-2 break-keep">
                    마케팅 전문가 김경문 강사의
                  </p>
                  <motion.div
                    variants={staggerContainer}
                    className="flex gap-1.5 justify-end mb-2 px-1"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        variants={dotPopVariants}
                        key={i}
                        className="w-2 h-2 bg-point-red rounded-full"
                      ></motion.div>
                    ))}
                  </motion.div>
                  <p className="text-[#151515] font-black text-[34px] tracking-tighter break-keep">
                    실전 마케팅 그대로 전수
                  </p>
                </div>
                <h3 className="text-[38px] font-black text-[#151515] leading-[1.4] tracking-tighter break-keep">
                  “사장님을
                  <br />
                  <span className="bg-black text-point-yellow px-5 py-2 inline-block my-2 shadow-lg">
                    운영 전문가 + 마케팅 전문가
                  </span>
                  <br />로 만들어드립니다.”
                </h3>
              </motion.div>
              <motion.div
                variants={scalePopVariants}
                className="flex-1 w-full max-w-[500px]"
              >
                <img
                  src="/images/step-photo-lecture.jpg"
                  alt="김경문 강사"
                  className="w-full h-auto rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 모바일 전용 로드맵 */}
        <motion.div
          className="flex pc:hidden flex-col w-full"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="relative w-full py-12 flex justify-center px-5 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="/images/feature-bg-02.jpg"
                alt="매장 배경"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="relative z-10 grid grid-cols-1 min-[360px]:grid-cols-2 gap-4 w-full max-w-[420px]">
              {educationData.map((box, bIdx) => (
                <motion.div
                  variants={scalePopVariants}
                  key={bIdx}
                  className="flex-1 bg-white/95 backdrop-blur-md rounded-[12px] pt-10 pb-8 shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex flex-col items-center gap-5 relative border border-white/40"
                >
                  <div className="absolute -top-3.5 bg-point-yellow text-[#151515] font-black px-4 py-1.5 rounded-[4px] shadow-sm text-[13px] tracking-tight">
                    {box.title}
                  </div>
                  {box.items.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      {/* 💡 모바일 아이콘 추가 */}
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center p-2.5 shadow-inner">
                        <img
                          src={item.icon}
                          alt={item.t}
                          className="w-full h-full object-contain opacity-70"
                        />
                      </div>
                      <span className="text-[12px] font-bold text-[#151515] tracking-tight break-keep">
                        {item.t}
                      </span>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full bg-[#EAEAEA] pt-12 pb-14 px-5 flex flex-col items-center justify-center gap-8">
            <motion.div
              variants={blurRevealVariants}
              className="flex flex-col items-center text-center w-full break-keep"
            >
              <p className="font-bold text-[14px] text-[#555] mb-2 tracking-tight">
                마케팅 전문가 김경문 강사의
              </p>
              <div className="flex flex-col items-center">
                <span className="relative inline-block mt-3 mb-1">
                  <motion.span
                    variants={staggerContainer}
                    className="absolute -top-[12px] left-0 w-full flex justify-between px-[4px]"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        variants={dotPopVariants}
                        key={i}
                        className="w-[5px] h-[5px] bg-point-red rounded-full"
                      ></motion.span>
                    ))}
                  </motion.span>
                  <span className="bg-point-yellow px-2 py-0.5 font-black text-[18px] text-[#151515] relative z-10">
                    실전 마케팅
                  </span>
                </span>
                <span className="font-black text-[18px] text-[#151515] tracking-tight mt-1">
                  그대로 전수
                </span>
              </div>
            </motion.div>
            <motion.div
              variants={scalePopVariants}
              className="w-[160px] shrink-0"
            >
              <img
                src="/images/step-photo-lecture-02.jpg"
                alt="김경문 강사"
                className="w-full h-auto shadow-lg rounded-[8px]"
              />
            </motion.div>
            <motion.div
              variants={blurRevealVariants}
              className="flex flex-col items-center text-center w-full break-keep"
            >
              <p className="font-black text-[15px] text-[#151515] leading-[1.8] tracking-tight">
                “사장님을
                <br />
                <span className="bg-point-yellow px-1.5 py-0.5 inline-block my-1">
                  운영 전문가
                </span>{" "}
                +{" "}
                <span className="bg-point-yellow px-1.5 py-0.5 inline-block mb-1">
                  마케팅 전문가
                </span>
                <br />로 만들어드립니다.”
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BusinessSystemSection;
