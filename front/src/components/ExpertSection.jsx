import React from "react";

const ExpertSection = () => {
  // 카드 데이터 배열 (양끝은 solid, 가운데 3개는 image)
  const cards = [
    {
      id: 1,
      title: "수익 구조\n재설계",
      desc: "적자매장을\n흑자매장으로 전환",
      bgType: "solid",
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
      bgType: "solid",
    },
  ];

  return (
    <section className="w-full flex flex-col">
      {/* 1. 상단 밝은 영역 (타이틀 + 카드 리스트를 모두 포함하도록 bg 확장) */}
      <div className="w-full bg-[#F5F5F5] pt-[80px] pb-[80px] pc:pt-[120px] pc:pb-[100px] text-center px-5 flex flex-col items-center">
        <h2 className="text-[28px] pc:text-[46px] font-extrabold text-[#151515] tracking-tight mb-4">
          <span className="text-point-red">업변 전문가</span>는 다릅니다.
        </h2>
        <p className="text-[15px] pc:text-[18px] font-bold text-[#444444] mb-12 pc:mb-16">
          <span className="text-point-red font-bold ">11년 동안</span> 저는 '
          <span className="text-point-red font-bold underline decoration-point-red underline-offset-4 decoration-2">
            살리는 법
          </span>
          ' 만 <span className="text-point-red font-bold ">연구</span>
          했습니다.
        </p>

        {/* 2. 카드 리스트 영역 (밝은 회색 영역 안으로 완전히 편입) */}
        <div className="section-container w-full">
          {/* 모바일은 가로 스크롤, PC는 5열 그리드 */}
          <div className="flex overflow-x-auto pc:grid pc:grid-cols-5 gap-4 pc:gap-5 pb-6 pc:pb-0 snap-x snap-mandatory hide-scrollbar">
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative flex-shrink-0 w-[240px] pc:w-full aspect-[4/5] pc:aspect-[3/4] rounded-[24px] overflow-hidden snap-center flex flex-col justify-center items-center text-center p-4 pc:p-5 shadow-xl transition-transform hover:-translate-y-2 duration-300"
              >
                {/* 배경 처리 로직 */}
                {card.bgType === "image" ? (
                  <>
                    <img
                      src={card.bgSrc}
                      alt={card.title.replace("\n", " ")}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* 이미지 위에 까는 어두운 반투명 막(Dim) */}
                    <div className="absolute inset-0 bg-black/65"></div>
                  </>
                ) : (
                  /* 이미지가 없는 양끝 카드 - 뒷 배경이 은은하게 비치도록 반투명(Opacity) 및 블러 처리 */
                  <div className="absolute inset-0 bg-[#222222]/90 backdrop-blur-sm"></div>
                )}

                {/* 텍스트 내용 (z-10을 줘서 배경보다 위로 올라오게 함) */}
                <div className="relative z-10 flex flex-col items-center gap-3 pc:gap-4 w-full">
                  {/* 간격 축소 및 break-keep 적용으로 5번째 카드 단어 끊김 방지 */}
                  <h3 className="text-white font-bold text-[20px] pc:text-[22px] leading-snug whitespace-pre-line break-keep drop-shadow-md w-full px-1">
                    {card.title}
                  </h3>
                  <p className="text-[#D0D0D0] font-medium text-[13px] pc:text-[14px] leading-relaxed whitespace-pre-line break-keep w-full px-1">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 하단 다크 영역 (마무리 문구) */}
      <div className="w-full bg-primary-dark pt-[60px] pb-[80px] pc:pt-[100px] pc:pb-[120px] text-center px-5 flex flex-col items-center">
        <p className="text-[20px] pc:text-[32px] font-bold text-font-light leading-relaxed">
          “사장님··· 힘든 거 너무 잘 압니다.
          <br />
          그래서 저는 '
          <span className="text-point-yellow text-[26px] pc:text-[42px] font-extrabold">
            살아남는 구조
          </span>
          ' 만 만들어왔습니다.”
        </p>
      </div>
    </section>
  );
};

export default ExpertSection;
