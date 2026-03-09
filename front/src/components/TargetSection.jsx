import React from "react";
import { motion } from "framer-motion";
import { IoMdRefresh } from "react-icons/io";
import {
  HiOutlineBuildingStorefront,
  HiOutlineLightBulb,
} from "react-icons/hi2";

const TargetSection = () => {
  // 💡 [가디언 설정] 애니메이션 세트 정의
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
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

  const targets = [
    {
      id: 1,
      icon: (
        <HiOutlineBuildingStorefront className="text-[#F6AD55] text-[32px] pc:text-[40px] group-hover:scale-110 transition-transform duration-300" />
      ),
      text: (
        <>
          상권은 나쁘지 않은데{"\n"}
          <span className="text-point-red text-[18px] pc:text-[20px] font-extrabold">
            매출이 안 나오는 분
          </span>
        </>
      ),
    },
    {
      id: 2,
      icon: (
        <IoMdRefresh className="text-[#4FD1C5] text-[32px] pc:text-[40px] group-hover:rotate-180 transition-transform duration-500" />
      ),
      text: (
        <>
          리뉴얼을 해도{"\n"}
          <span className="text-point-red text-[18px] pc:text-[20px] font-extrabold">
            결과가 없었던 분
          </span>
        </>
      ),
    },
    {
      id: 3,
      icon: (
        <HiOutlineLightBulb className="text-[#ECC94B] text-[32px] pc:text-[40px] group-hover:scale-110 transition-transform duration-300" />
      ),
      text: (
        <>
          큰 돈 들이지 않고{"\n"}
          <span className="text-point-red text-[18px] pc:text-[20px] font-extrabold">
            방향을 바꾸고 싶은 분
          </span>
        </>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#F2F2F2] pt-[80px] pb-[80px] pc:pt-[100px] pc:pb-[100px] px-5 overflow-hidden">
      <div className="section-container max-w-[1000px]">
        {/* 타이틀 영역 */}
        <motion.div
          className="text-center mb-12 pc:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* 💡 [가독성 방어] break-keep 추가 및 모바일 전용 줄바꿈 제어 */}
          <motion.h2
            variants={blurRevealVariants}
            className="text-[26px] pc:text-[36px] font-extrabold text-[#151515] leading-[1.4] pc:leading-tight break-keep"
          >
            그래서, <span className="text-point-red">업변</span>은
            <br className="block pc:hidden" />
            <span className="text-point-red pc:ml-1">이런 분들</span>에게{" "}
            <span className="text-point-red">필요</span>합니다
          </motion.h2>
        </motion.div>

        {/* 3열 카드 그리드 영역 */}
        <motion.div
          className="grid grid-cols-1 pc:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {targets.map((item) => (
            <motion.div
              variants={scalePopVariants}
              key={item.id}
              className="group bg-white border border-[#E5E5E5] rounded-[12px] p-8 pc:p-10 flex flex-col items-center text-center shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-300 cursor-default"
            >
              <div className="mb-6">{item.icon}</div>

              {/* 💡 [가독성 방어] break-keep 을 통해 모바일 단어 찢어짐 원천 차단 */}
              <p className="text-[#151515] font-bold text-[16px] pc:text-[18px] leading-snug whitespace-pre-line break-keep">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TargetSection;
