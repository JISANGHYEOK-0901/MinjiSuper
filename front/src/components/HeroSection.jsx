import React, { useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  // 영상 재생 상태를 관리하는 State
  const [playVideo1, setPlayVideo1] = useState(false);
  const [playVideo2, setPlayVideo2] = useState(false);

  // 💡 [가디언 설정] 애니메이션 옵션 (가로 스크롤 및 성능 저하 방지)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // 내부 요소들이 0.2초 간격으로 순차 등장
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // 아래에서
    visible: {
      opacity: 1,
      y: 0, // 위로 부드럽게 안착
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    /* 💡 [안전 조치] overflow-hidden을 추가하여 애니메이션 작동 중 모바일 가로 쏠림 현상 원천 차단 */
    <section className="w-full bg-primary-dark pt-[60px] pb-[80px] pc:pt-[100px] pc:pb-[120px] overflow-hidden">
      <motion.div
        className="section-container flex flex-col items-center text-center px-5 pc:px-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }} // 스크롤 시 한 번만 실행, 50px 미리 등장
      >
        {/* 메인 카피 */}
        <motion.h2
          variants={itemVariants}
          // 💡 [가독성 방어] break-keep 추가로 단어 찢어짐 방지 / 반응형 leading 조절
          className="text-[26px] pc:text-[42px] font-extrabold text-font-light leading-[1.4] pc:leading-snug tracking-tight mb-8 break-keep"
        >
          {/* 💡 [가독성 방어] 모바일(block)과 PC(hidden)의 줄바꿈 호흡을 분리 */}
          살아남으려다 보니
          <br className="block pc:hidden" /> 어느새
          <br className="hidden pc:block" />
          <span className="text-point-yellow ml-1 pc:ml-0">업변 11년 차</span>가
          되었습니다.
        </motion.h2>

        {/* 인물 이미지 */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[650px] mb-10 pc:mb-12"
        >
          <img
            src="/images/hero-portrait-main.png"
            alt="김창훈 대표"
            className="w-full h-auto object-cover rounded-[20px] shadow-2xl"
          />
        </motion.div>

        {/* 서브 텍스트 */}
        <motion.p
          variants={itemVariants}
          className="text-[15px] pc:text-[18px] text-font-light font-medium leading-[1.7] pc:leading-relaxed mb-16 break-keep"
        >
          수많은 가게가 무너지는 걸 보며,
          <br />
          저는{" "}
          <span className="text-point-yellow font-bold">'살려내는 법'만</span>
          <br className="block pc:hidden" />
          <span className="text-point-yellow font-bold pc:ml-1">
            11년 동안 연구
          </span>
          했습니다.
          <br />
          <br />
          그 기획의 끝에서,
          <br className="block pc:hidden" />
          지금 시대에 가장 잘 맞는
          <br className="hidden pc:block" />
          <span className="text-point-yellow font-bold ml-1">브랜드</span>가
          탄생했습니다.
        </motion.p>

        {/* 🎬 유튜브 영상 영역 */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col pc:flex-row gap-8 pc:gap-8 w-full max-w-[900px] mb-16 text-left"
        >
          {/* 영상 1 */}
          <div className="flex-1 group">
            <div className="relative w-full aspect-video bg-[#222] rounded-[16px] overflow-hidden mb-4 shadow-lg">
              {playVideo1 ? (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/uXjVrix2e6g?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div
                  className="w-full h-full cursor-pointer relative"
                  onClick={() => setPlayVideo1(true)}
                >
                  <img
                    src="/images/hero-thumb-video-01.jpg"
                    alt="유튜브 썸네일 1"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/40">
                    <div className="w-14 h-14 pc:w-16 pc:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-[20px] pc:text-[24px] pl-1 group-hover:bg-point-yellow group-hover:text-black transition-all duration-300 shadow-md">
                      ▶
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-white font-bold text-[15px] pc:text-[18px] leading-snug mb-2 break-keep">
              "재산 10억 다 날렸습니다" 이혼 후 폐업까지 해 딸과 홀로 남겨진
              여사장님을 위해 술집 자리 드렸습니다
            </h3>
            <p className="text-[#666666] text-[12px] pc:text-[13px] font-medium">
              조회수: 3.2만 회 · 2024.02.17
            </p>
          </div>

          {/* 영상 2 */}
          <div className="flex-1 group">
            <div className="relative w-full aspect-video bg-[#222] rounded-[16px] overflow-hidden mb-4 shadow-lg">
              {playVideo2 ? (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/s40Z_G_C2YM?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div
                  className="w-full h-full cursor-pointer relative"
                  onClick={() => setPlayVideo2(true)}
                >
                  <img
                    src="/images/hero-thumb-video-02.jpg"
                    alt="유튜브 썸네일 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/40">
                    <div className="w-14 h-14 pc:w-16 pc:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-[20px] pc:text-[24px] pl-1 group-hover:bg-point-yellow group-hover:text-black transition-all duration-300 shadow-md">
                      ▶
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-white font-bold text-[15px] pc:text-[18px] leading-snug mb-2 break-keep">
              술집 다 개폭망하는데, 이 집은 왜 멀쩡할까?
            </h3>
            <p className="text-[#666666] text-[12px] pc:text-[13px] font-medium">
              조회수: 4.9천 회 · 2024.02.20
            </p>
          </div>
        </motion.div>

        {/* 하단 버튼 (애니메이션 적용 및 호버 이펙트 강화) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 w-full pc:w-auto"
        >
          <button
            className="bg-point-yellow text-[#151515] font-extrabold text-[16px] pc:text-[20px] py-[16px] pc:py-[20px] rounded-[50px] w-full pc:w-[400px] hover:brightness-105 hover:shadow-[0_0_15px_rgba(255,208,59,0.4)] transition-all duration-300 flex justify-center items-center"
            onClick={() =>
              document
                .getElementById("consultation-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            무료 업변 상담 받기{" "}
            <span className="ml-2 font-normal text-[14px] pc:text-[16px]">
              &gt;
            </span>
          </button>
          <button
            className="bg-point-yellow text-[#151515] font-extrabold text-[16px] pc:text-[20px] py-[16px] pc:py-[20px] rounded-[50px] w-full pc:w-[400px] hover:brightness-105 hover:shadow-[0_0_15px_rgba(255,208,59,0.4)] transition-all duration-300 flex justify-center items-center"
            onClick={() =>
              document
                .getElementById("consultation-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            내 가게 손익 계산받기{" "}
            <span className="ml-2 font-normal text-[14px] pc:text-[16px]">
              &gt;
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
