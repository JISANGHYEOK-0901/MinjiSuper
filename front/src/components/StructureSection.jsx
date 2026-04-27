import React from "react";
import { motion } from "framer-motion";

const StructureSection = () => {
  // 💡 [가디언 적용] 트렌드 1: 초점이 맞춰지며 등장하는 세련된 텍스트 효과 (Apple 스타일)
  const blurRevealVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 15 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // 💡 [가디언 적용] 트렌드 2: 스프링처럼 텐션 있게 튀어나오는 카드 효과 (Toss 스타일)
  const scalePopVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  // 💡 [가디언 적용] 트렌드 3: 배경 이미지가 천천히 축소되며 공간감을 주는 효과
  const bgZoomVariants = {
    hidden: { scale: 1.15 },
    visible: {
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const bounceVariants = {
    animate: {
      y: [0, 10, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const painPoints = [
    "노동형 장사의 한계 체감",
    "체력 소진",
    "매출 하락",
    "시스템 없는 가게",
  ];

  return (
    <section className="w-full flex flex-col overflow-hidden">
      {/* 1. 무너져본 경험 / 사장님 마음 영역 (Light) */}
      <div className="w-full bg-[#F9F9F9] pt-[80px] pb-[80px] pc:pt-[120px] pc:pb-[100px] text-center px-5 flex flex-col items-center">
        {/* 타이틀 (Blur Reveal) */}
        <motion.h2
          variants={blurRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-[26px] pc:text-[34px] font-bold text-[#151515] leading-[1.4] pc:leading-snug mb-10 break-keep"
        >
          제가 먼저 <span className="text-point-red">무너져봤습니다.</span>
          <br />
          그래서,
          <br className="block pc:hidden" />{" "}
          <span className="text-point-red pc:ml-1">
            사장님 마음을 잘 압니다
          </span>
        </motion.h2>

        {/* 중앙 흰색 박스 (Scale Pop + Stagger) */}
        <motion.div
          variants={scalePopVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full max-w-[440px] bg-white rounded-[16px] p-6 pc:p-8 flex flex-col gap-3 pc:gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] mb-8"
        >
          <span className="text-point-red text-[20px] py-4 font-bold break-keep">
            과거 <span className="text-[#151515]">김창훈 주막 시절</span>
          </span>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-3 pc:gap-4"
          >
            {painPoints.map((text, idx) => (
              <motion.div
                key={idx}
                variants={blurRevealVariants}
                className="bg-[#FFF9EA] text-[#151515] font-bold py-4 rounded-[8px] text-[15px] pc:text-[16px] tracking-tight break-keep"
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 빨간색 화살표 포인트 (Bounce) */}
        <motion.div
          variants={bounceVariants}
          animate="animate"
          className="flex justify-center mb-8"
        >
          <svg width="20" height="24" viewBox="0 0 24 32" fill="none">
            <path
              d="M12 32L0.74167 17H23.2583L12 32ZM14 0V19H10V0H14Z"
              fill="#D33535"
            />
          </svg>
        </motion.div>

        {/* 하단 검은색 박스 (Scale Pop) */}
        <motion.div
          variants={scalePopVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full max-w-[580px] bg-[#151515] rounded-[12px] py-6 pc:py-8 px-4 flex flex-col items-center justify-center shadow-lg"
        >
          <p className="text-white font-bold text-[16px] pc:text-[18px] leading-[1.6] pc:leading-relaxed break-keep">
            업종 변경 + 운영 시스템 재설계
            <br />
            감성, 경험, 동선을 결합한 <br className="block pc:hidden" />
            <span className="text-point-red">새로운 구조 기획</span>
          </p>
        </motion.div>
      </div>

      {/* 2. 브랜드 탄생 스토리 (Dark with Image - Background Zoom) */}
      <div className="relative w-full h-[300px] pc:h-[400px] flex items-center justify-center overflow-hidden">
        <motion.img
          variants={bgZoomVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          src="/images/story-bg-food.jpg"
          alt="음식 배경"
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />
        <div className="absolute inset-0 bg-black/65 z-0"></div>

        <motion.h2
          variants={scalePopVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 text-[26px] pc:text-[42px] font-extrabold text-white flex items-center justify-center flex-wrap gap-2 pc:gap-3"
        >
          그 결과...
          <span className="bg-[#D33535] text-white px-2 py-1 pc:px-3 pc:py-1 leading-none rounded-[4px] shadow-md mx-1">
            민지슈퍼
          </span>
          <span className="text-[#D33535]">탄생</span>
        </motion.h2>
      </div>

      {/* 3. 생존 매장 수 하이라이트 (Blur Reveal) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full bg-[#151515] py-[80px] pc:py-[100px] text-center px-5"
      >
        <motion.p
          variants={blurRevealVariants}
          className="text-[24px] pc:text-[38px] font-extrabold text-white mb-6 tracking-tight break-keep"
        >
          이미 <span className="text-point-yellow">200개 이상</span>의 가게가
          <br className="block pc:hidden" /> 살아났습니다
        </motion.p>
        <motion.p
          variants={blurRevealVariants}
          className="text-[#D0D0D0] font-medium text-[15px] pc:text-[18px] tracking-tight leading-[1.6] break-keep"
        >
          운영 시스템을 <span className="text-[#00C853] font-bold">재설계</span>
          하여,
          <br className="block pc:hidden" />{" "}
          <span className="text-[#00C853] font-bold pc:ml-1">
            장사가 되는 구조
          </span>
          로 바꾸는 것
        </motion.p>
      </motion.div>
    </section>
  );
};

export default StructureSection;
