import React, { useState } from "react";

const HeroSection = () => {
  // 영상 재생 상태를 관리하는 State (false: 썸네일, true: 유튜브 iframe)
  const [playVideo1, setPlayVideo1] = useState(false);
  const [playVideo2, setPlayVideo2] = useState(false);

  return (
    <section className="w-full bg-primary-dark pt-[60px] pb-[80px] pc:pt-[100px] pc:pb-[120px]">
      <div className="section-container flex flex-col items-center text-center">
        <h2 className="text-[26px] pc:text-[42px] font-extrabold text-font-light leading-snug tracking-tight mb-8">
          살아남으려다 보니···
          <br />
          어느새 <span className="text-point-yellow">업변 11년차</span>가
          되었습니다.
        </h2>

        <div className="w-full max-w-[650px] mb-10">
          <img
            src="/images/hero-portrait-main.png"
            alt="김창훈 대표"
            className="w-full h-auto object-cover rounded-[20px] shadow-2xl"
          />
        </div>

        <p className="text-[15px] pc:text-[18px] text-font-light font-medium leading-relaxed mb-16">
          수많은 가게가 무너지는 걸 보며,
          <br />
          저는{" "}
          <span className="text-point-yellow font-bold">'살려내는 법'만</span>
          <br />
          <span className="text-point-yellow font-bold">11년 동안 연구</span>
          했습니다.
          <br />
          <br />
          그 기획의 끝에서,
          <br />
          지금 시대에 가장 잘 맞는{" "}
          <span className="text-point-yellow font-bold">브랜드</span>가
          탄생했습니다.
        </p>

        {/* 🎬 유튜브 영상 영역 */}
        <div className="flex flex-col pc:flex-row gap-6 pc:gap-8 w-full max-w-[900px] mb-16 text-left">
          {/* 영상 1 */}
          <div className="flex-1 group">
            <div className="relative w-full aspect-video bg-[#222] rounded-xl overflow-hidden mb-4 shadow-lg">
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl pl-1 group-hover:bg-point-yellow group-hover:text-black transition-colors">
                      ▶
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-white font-bold text-[16px] pc:text-[18px] leading-tight mb-2">
              "재산 10억 다 날렸습니다"
            </h3>
            <p className="text-[#AAAAAA] text-[13px] leading-snug mb-2 line-clamp-2">
              이혼 후 폐업까지 해 딸과 홀로 남겨진 여사장님을 위해 술집 자리
              드렸습니다
            </p>
            <p className="text-[#666666] text-[12px]">
              조회수: 3.2만회 · 2024.02.17
            </p>
          </div>

          {/* 영상 2 */}
          <div className="flex-1 group">
            <div className="relative w-full aspect-video bg-[#222] rounded-xl overflow-hidden mb-4 shadow-lg">
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl pl-1 group-hover:bg-point-yellow group-hover:text-black transition-colors">
                      ▶
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-white font-bold text-[16px] pc:text-[18px] leading-tight mb-2">
              술집 다 개폭망하는데, 이 집은 왜 멀쩡할까?
            </h3>
            <p className="text-[#666666] text-[12px] mt-8">
              조회수: 4.9천회 · 2024.02.20
            </p>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex flex-col gap-4 w-full px-5 pc:px-0 pc:w-auto">
          <button className="bg-point-yellow text-[#151515] font-extrabold text-[18px] pc:text-[20px] py-[16px] pc:py-[20px] rounded-[50px] w-full pc:w-[400px] hover:bg-yellow-400 transition-colors flex justify-center items-center">
            무료 업변 상담 받기{" "}
            <span className="ml-2 font-normal text-sm">&gt;</span>
          </button>
          <button className="bg-point-yellow text-[#151515] font-extrabold text-[18px] pc:text-[20px] py-[16px] pc:py-[20px] rounded-[50px] w-full pc:w-[400px] hover:bg-yellow-400 transition-colors flex justify-center items-center">
            내 가게 손익 계산받기{" "}
            <span className="ml-2 font-normal text-sm">&gt;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
