import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const instagramVideos = [
  {
    id: 1,
    thumb: "/images/instagram/franchise-1-thumb.png",
    video: "/videos/franchise-1.mp4",
  },
  {
    id: 2,
    thumb: "/images/instagram/franchise-2-thumb.png",
    video: "/videos/franchise-2.mp4",
  },
  {
    id: 3,
    thumb: "/images/instagram/franchise-3-thumb.png",
    video: "/videos/franchise-3.mp4",
  },
  {
    id: 4,
    thumb: "/images/instagram/franchise-4-thumb.png",
    video: "/videos/franchise-4.mp4",
  },
  {
    id: 5,
    thumb: "/images/instagram/franchise-5-thumb.png",
    video: "/videos/franchise-5.mp4",
  },
];

const marketingCards = [
  {
    title: "상권분석",
    image: "/images/marketing/market-analysis.png",
  },
  {
    title: "광고 집행",
    image: "/images/marketing/ad-operation.png",
  },
  {
    title: "플레이스 관리",
    image: "/images/marketing/place-management.png",
  },
];

export const YoutubeTestimonialSection = () => {
  const videos = [
    {
      id: "EcZvoVY0c5I",
      title: "민지슈퍼 운영 철학",
      src: "https://www.youtube.com/embed/EcZvoVY0c5I",
    },
    {
      id: "6tfpStUCD7I",
      title: "민지슈퍼 성공 비결",
      src: "https://www.youtube.com/embed/6tfpStUCD7I",
    },
  ];

  return (
    <section className="w-full bg-white pt-[70px] pb-[80px] pc:pt-[90px] pc:pb-[100px] px-5 overflow-hidden">
      <motion.div
        className="section-container flex flex-col items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.p
          variants={fadeUpVariants}
          className="text-[18px] pc:text-[22px] font-extrabold text-point-red mb-3 break-keep"
        >
          직접 들어보세요
        </motion.p>
        <motion.h2
          variants={fadeUpVariants}
          className="text-[25px] pc:text-[40px] font-extrabold text-[#151515] leading-tight mb-10 pc:mb-14 break-keep"
        >
          민지슈퍼를 만든 사람들이{" "}
          <span className="text-point-red">직접</span> 말하는
          <br />
          <span className="text-point-red">운영 철학</span>과{" "}
          <span className="text-point-red">성공 비결</span>
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 pc:grid-cols-2 gap-5 pc:gap-8 w-full max-w-[980px]"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={fadeUpVariants}
              className="w-full overflow-hidden rounded-[16px] bg-[#151515] shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
            >
              <iframe
                className="w-full aspect-video"
                src={video.src}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export const InstagramShowcaseSection = () => {
  const [activeVideoKey, setActiveVideoKey] = useState(null);

  const instagramUrl =
    "https://www.instagram.com/minjisuper_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
  const loopVideos = [...instagramVideos, ...instagramVideos];

  return (
    <section
      className="w-full bg-white py-[70px] pc:py-[100px] px-5 overflow-hidden"
      onClick={() => setActiveVideoKey(null)}
    >
      <motion.div
        className="section-container flex flex-col items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col items-center text-center mb-10 pc:mb-14"
        >
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 pc:w-16 pc:h-16 rounded-full bg-[#151515] text-white flex items-center justify-center mb-4 shadow-lg hover:bg-point-red transition-colors"
            aria-label="민지슈퍼 인스타그램으로 이동"
          >
            <FaInstagram className="text-[34px] pc:text-[38px]" />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#151515] font-black text-[30px] pc:text-[48px] leading-none tracking-tight hover:text-point-red transition-colors"
          >
            @minjisuper_official
          </a>
        </motion.div>

        <motion.div variants={fadeUpVariants} className="relative w-full">
          <div className="w-full max-w-[1060px] mx-auto overflow-hidden">
            <motion.div
              className="instagram-marquee-track flex w-max gap-4 pc:gap-6 pb-2"
              style={{
                animationPlayState: activeVideoKey ? "paused" : "running",
              }}
            >
              {loopVideos.map((item, index) => {
                const itemKey = `${item.id}-${index}`;
                const isActive = activeVideoKey === itemKey;

                return (
                  <div
                    key={itemKey}
                    className="shrink-0 w-[72vw] max-w-[320px] min-[480px]:w-[52vw] pc:w-[337px]"
                    aria-hidden={index >= instagramVideos.length}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="relative w-full aspect-[9/16] rounded-[18px] overflow-hidden bg-[#151515] shadow-[0_16px_45px_rgba(0,0,0,0.16)]">
                      {isActive ? (
                        <video
                          className="w-full h-full object-cover"
                          src={item.video}
                          controls
                          autoPlay
                          playsInline
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveVideoKey(itemKey)}
                          className="group absolute inset-0 w-full h-full text-left"
                          aria-label={`인스타그램 영상 ${item.id} 재생`}
                        >
                          <img
                            src={item.thumb}
                            alt={`민지슈퍼 인스타그램 영상 ${item.id} 썸네일`}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center text-[24px] pl-1 group-hover:bg-point-yellow group-hover:text-[#151515] transition-colors">
                              ▶
                            </span>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export const MarketingSupportSection = () => {
  return (
    <section className="w-full bg-[#F4F4F4] py-[80px] pc:py-[120px] px-5 overflow-hidden">
      <motion.div
        className="section-container flex flex-col items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h2
          variants={fadeUpVariants}
          className="text-[28px] pc:text-[46px] font-extrabold text-[#151515] leading-tight mb-5 break-keep"
        >
          <span className="text-point-red">어려운</span> 마케팅?
          <br />
          민지슈퍼{" "}
          <span className="text-point-yellow bg-[#151515] px-2 pc:px-3 py-1 inline-block mt-2">
            전문 마케팅팀
          </span>
          이 직접 관리합니다.
        </motion.h2>
        <motion.p
          variants={fadeUpVariants}
          className="text-[22px] pc:text-[34px] font-black text-[#151515] leading-tight mb-10 pc:mb-14 break-keep"
        >
          가맹점 하나하나
          <br />
          <span className="text-point-red">직접 챙깁니다.</span>
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 pc:grid-cols-3 gap-5 pc:gap-7 w-full max-w-[1060px]"
        >
          {marketingCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUpVariants}
              className="group bg-white rounded-[16px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.1)]"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="py-5 pc:py-6 bg-[#151515]">
                <h3 className="text-white text-[20px] pc:text-[24px] font-black tracking-tight">
                  {card.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
