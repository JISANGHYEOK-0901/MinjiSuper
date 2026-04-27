import React from "react";
import { motion } from "framer-motion";

const ExpertSection = () => {
  // 카드 데이터 배열 (기존과 동일하게 유지)
  const cards = [
    {
      id: 1,
      title: "수익 구조\n재설계",
      desc: "적자매장을\n흑자매장으로 전환",
      bgType: "image",
      bgSrc: "/images/feature-bg-04.jpg",
    },
    {
      id: 2,
      title: "11년 업변 경력",
      desc: "망해가는 가게를 살리며\n축적된 경험",
      bgType: "image",
      bgSrc: "/images/feature-bg-01.jpg",
    },
    {
      id: 3,
      title: "997건 이상\n매장 진단",
      desc: "실패 패턴을\n정확히 알고 있음",
      bgType: "image",
      bgSrc: "/images/feature-bg-02.jpg",
    },
    {
      id: 4,
      title: "성과 기반 운영\n마케팅 설계",
      desc: "감성+시스템+기획\n의 조합",
      bgType: "image",
      bgSrc: "/images/feature-bg-03.jpg",
    },
    {
      id: 5,
      title: "매장 특성에 맞는\n최적 업종 선택",
      desc: "특성화 전략까지\n최적화 업종 선택",
      bgType: "image",
      bgSrc: "/images/feature-bg-05.jpg",
    },
  ];

  // 💡 [가디언 설정] 안전한 애니메이션 옵션 정의
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // 카드들이 0.15초 간격으로 우측으로 차례대로 켜짐
      },
    },
  };

  return (
    // 💡 overflow-hidden을 추가하여 x축 애니메이션 충돌 시 가로 스크롤 떨림을 원천 차단
    <section className="w-full flex flex-col overflow-hidden">
      {/* 1. 상단 밝은 영역 */}
      <div className="w-full bg-[#F5F5F5] pt-[80px] pb-[80px] pc:pt-[120px] pc:pb-[100px] text-center px-5 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariants}
          className="flex flex-col items-center w-full"
        >
          {/* 💡 [가독성 방어] break-keep 추가 */}
          <h2 className="text-[28px] pc:text-[46px] font-extrabold text-[#151515] tracking-tight mb-4 break-keep">
            <span className="text-point-red">업변 전문가</span>는 다릅니다.
          </h2>
          {/* 💡 [가독성 방어] 모바일에서 강조 문구가 예쁘게 떨어지도록 <br className="block pc:hidden" /> 삽입 */}
          <p className="text-[15px] pc:text-[18px] font-bold text-[#444444] mb-12 pc:mb-16 leading-[1.6] pc:leading-relaxed break-keep">
            <span className="text-point-red font-bold">11년 동안</span> 저는
            <br className="block pc:hidden" />{" "}
            <span className="text-point-red font-bold underline decoration-point-red underline-offset-4 decoration-2">
              살리는 법
            </span>
            만 <span className="text-point-red font-bold">연구</span>했습니다.
          </p>
        </motion.div>

        {/* 2. 카드 리스트 영역 */}
        <div className="section-container w-full">
          {/* 💡 staggerContainer를 감싸 카드가 차례대로 등장하도록 설정 (가로 스크롤 클래스 유지) */}
          <motion.div
            className="flex overflow-x-auto pc:grid pc:grid-cols-5 gap-4 pc:gap-5 pb-6 pc:pb-0 snap-x snap-mandatory hide-scrollbar"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {cards.map((card) => (
              <motion.div
                key={card.id}
                variants={fadeUpVariants}
                className="relative flex-shrink-0 w-[240px] pc:w-full aspect-[4/5] pc:aspect-[3/4] rounded-[24px] overflow-hidden snap-center flex flex-col justify-center items-center text-center p-4 pc:p-5 shadow-xl hover:-translate-y-2 transition-transform duration-300"
              >
                {/* 배경 처리 로직 */}
                {card.bgType === "image" ? (
                  <>
                    <img
                      src={card.bgSrc}
                      alt={card.title.replace("\n", " ")}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/65"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[#222222]/90 backdrop-blur-sm"></div>
                )}

                {/* 텍스트 내용 */}
                <div className="relative z-10 flex flex-col items-center gap-3 pc:gap-4 w-full">
                  <h3 className="text-white font-bold text-[20px] pc:text-[22px] leading-snug whitespace-pre-line break-keep drop-shadow-md w-full px-1">
                    {card.title}
                  </h3>
                  <p className="text-[#D0D0D0] font-medium text-[13px] pc:text-[14px] leading-relaxed whitespace-pre-line break-keep w-full px-1">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 3. 하단 다크 영역 (마무리 문구) */}
      <motion.div
        className="w-full bg-primary-dark pt-[60px] pb-[80px] pc:pt-[100px] pc:pb-[120px] text-center px-5 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUpVariants}
      >
        {/* 💡 [가독성 방어] 모바일에서 호흡이 길어지지 않도록 중간 <br className="block pc:hidden" /> 삽입 */}
        <p className="text-[20px] pc:text-[32px] font-bold text-font-light leading-[1.6] pc:leading-relaxed break-keep">
          사장님의 고충을 <br className="block pc:hidden" />
          충분히 알고 있습니다.
          <br />
          그래서 저는 <br className="block pc:hidden" />
          <span className="text-point-yellow text-[26px] pc:text-[42px] font-extrabold mx-1">
            살아남을 수 있는 구조
          </span>
          를 만들었습니다.
        </p>
      </motion.div>
    </section>
  );
};

export default ExpertSection;
