import React from "react";
import { motion } from "framer-motion";

const ReceiptSection = () => {
  // 💡 [가디언 설정] 텍스트 스며들기 (Blur Reveal)
  const blurRevealVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 15 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // 💡 [가디언 설정] 영수증 박스 팝업 (실제 영수증이 톡 튀어나오는 듯한 텐션)
  const receiptPopVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 },
    },
  };

  // 💡 [가디언 설정] SVG 밑줄이 직접 그려지는 효과 (Draw Line)
  const drawLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut", delay: 0.4 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <section className="w-full flex flex-col items-center overflow-hidden">
      {/* 1. 상단 텍스트 영역: 확신을 주는 메시지와 SVG 밑줄 드로잉 */}
      <motion.div
        className="w-full bg-[#FFFFFF] text-center px-5 pt-[60px] pb-[60px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={blurRevealVariants}
          // 💡 [가독성 방어] break-keep과 반응형 줄바꿈 적용
          className="text-[22px] pc:text-[32px] font-extrabold text-[#151515] leading-[1.6] pc:leading-snug tracking-tight break-keep"
        >
          <span className="text-point-red">매출</span>이 중요한 게 아니라···
          <br className="block pc:hidden" />
          <span className="relative inline-block pb-2 pc:ml-2">
            <span className="relative z-10 text-point-red">
              진짜 얼마가 남느냐
            </span>

            {/* 💡 [트렌드 적용] 모션 SVG 밑줄 드로잉 효과 */}
            <div className="absolute -bottom-1 left-0 w-full h-[12px] overflow-visible">
              <svg
                viewBox="0 0 280 20"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <motion.path
                  variants={drawLineVariants}
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
        </motion.h2>
      </motion.div>

      {/* 2. 영수증 UI 영역 */}
      <div className="relative w-full py-[80px] pc:py-[120px] px-5 flex flex-col justify-center items-center overflow-hidden">
        {/* 블러 처리된 배경 */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/receipt-bg-blur.jpg"
            alt="영수증 배경"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* 💡 [트렌드 적용] 영수증 박스 팝업 애니메이션 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={receiptPopVariants}
          className="relative z-10 w-full max-w-[420px] bg-[#F3F3F3] rounded-sm shadow-2xl p-6 pc:p-10 text-[#151515] flex flex-col font-sans border-t-4 border-[#151515]"
        >
          <div className="text-center mb-4">
            <p className="font-bold text-[14px] pc:text-[16px] text-[#333] break-keep">
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
              <span>4,500만 원</span>
              <span className="text-point-red">1,155만 원</span>
            </div>
            <div className="flex justify-between items-center">
              <span>6,000만 원</span>
              <span className="text-point-red">1,620만 원</span>
            </div>
            <div className="flex justify-between items-center">
              <span>8,000만 원</span>
              <span className="text-point-red">2,240만 원</span>
            </div>
          </div>

          <div className="w-full border-t border-dashed border-[#999] my-3"></div>

          <div className="flex flex-col items-center my-4">
            {/* 바코드 디자인 (정적 유지) */}
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
            <img
              src="/images/receipt-logo-colorful.png"
              alt="MJSP Logo"
              className="h-[28px] pc:h-[32px] object-contain"
            />
          </div>
        </motion.div>

        {/* 3. 하단 텍스트: 시안 하이라이트 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="relative z-10 mt-12 text-center text-white"
        >
          <motion.p
            variants={blurRevealVariants}
            className="text-[16px] pc:text-[20px] font-medium mb-2 break-keep"
          >
            “허황된 매출이 아니라,
          </motion.p>
          <motion.p
            variants={blurRevealVariants}
            className="text-[18px] pc:text-[24px] font-bold break-keep"
          >
            <span className="relative inline-block px-1">
              실제 남는 구조
              <span className="absolute bottom-1 left-0 w-full h-[12px] bg-point-yellow/60 -z-10 rounded-sm"></span>
            </span>
            만 공개합니다.”
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReceiptSection;
