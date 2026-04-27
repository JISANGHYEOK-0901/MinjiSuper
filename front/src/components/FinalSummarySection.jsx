import React from "react";
import { motion } from "framer-motion";

const FinalSummarySection = () => {
  // 💡 [가디언 설정] 텍스트용 스며드는 애니메이션
  const blurRevealVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 15 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // 💡 [가디언 설정] 버튼용 탄력 있는 팝 애니메이션
  const buttonPopVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="w-full bg-[#1A1A1A] pt-[100px] pb-[100px] pc:pt-[140px] pc:pb-[140px] px-5 overflow-hidden">
      <motion.div
        className="section-container flex flex-col items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* 메시지 영역 */}
        <div className="mb-12 pc:mb-16">
          <motion.h2
            variants={blurRevealVariants}
            // 💡 [가독성 방어] break-keep 추가 및 행간 최적화
            className="text-[24px] pc:text-[40px] font-extrabold text-white leading-[1.5] pc:leading-snug mb-5 break-keep"
          >
            업종을 바꾸는 게 아니라,
            <br />
            장사가 되는{" "}
            <span className="text-point-yellow text-[28px] pc:text-[46px]">
              구조
            </span>
            로
            <br className="block pc:hidden" /> 바꾸는 것.
            <br />
            <span className="text-point-yellow mt-2 pc:mt-1 inline-block">
              그게 김창훈식 업변입니다.
            </span>
          </motion.h2>

          <motion.p
            variants={blurRevealVariants}
            className="text-white text-[15px] pc:text-[18px] font-medium leading-relaxed break-keep"
          >
            지금 바로{" "}
            <span className="text-point-yellow font-bold">무료 상담</span>을
            받아보세요. <br />
            당신의{" "}
            <span className="text-point-yellow font-bold">
              가게를 살릴 방법
            </span>
            을 찾아드립니다.
          </motion.p>
        </div>

        {/* CTA 버튼 세트 */}
        <motion.div
          className="flex flex-col gap-4 w-full max-w-[450px]"
          variants={staggerContainer} // 버튼들도 시간차를 두고 나타남
        >
          <motion.button
            variants={buttonPopVariants}
            onClick={() =>
              document
                .getElementById("consultation-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            // 💡 [마이크로 인터랙션] group 클래스를 주고 화살표에 group-hover 적용
            className="group bg-point-yellow text-[#151515] font-extrabold text-[16px] pc:text-[20px] py-[18px] pc:py-[22px] rounded-[50px] shadow-[0_4px_15px_rgba(255,208,59,0.3)] hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,208,59,0.5)] transition-all duration-300 flex justify-center items-center"
          >
            무료 업변 상담 받기{" "}
            <span className="ml-2 text-[14px] pc:text-[16px] font-normal opacity-80 group-hover:translate-x-1.5 transition-transform duration-300">
              &gt;
            </span>
          </motion.button>

          <motion.button
            variants={buttonPopVariants}
            onClick={() =>
              document
                .getElementById("consultation-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group bg-[#D33535] text-white font-extrabold text-[16px] pc:text-[20px] py-[18px] pc:py-[22px] rounded-[50px] shadow-[0_4px_15px_rgba(211,53,53,0.3)] hover:brightness-110 hover:shadow-[0_0_20px_rgba(211,53,53,0.5)] transition-all duration-300 flex justify-center items-center"
          >
            김창훈 대표 1:1 상담 신청하기{" "}
            <span className="ml-2 text-[14px] pc:text-[16px] font-normal opacity-80 group-hover:translate-x-1.5 transition-transform duration-300">
              &gt;
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalSummarySection;
