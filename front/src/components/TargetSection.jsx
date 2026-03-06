import React from "react";
import { IoMdRefresh } from "react-icons/io";
// HiOutlineStorefront 대신 정확한 이름인 HiOutlineBuildingStorefront를 사용합니다.
import {
  HiOutlineBuildingStorefront,
  HiOutlineLightBulb,
} from "react-icons/hi2";

const TargetSection = () => {
  const targets = [
    {
      id: 1,
      icon: (
        <HiOutlineBuildingStorefront className="text-[#F6AD55] text-[32px] pc:text-[40px]" />
      ),
      // "매출이 안 나오는 분" 강조 적용
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
        <IoMdRefresh className="text-[#4FD1C5] text-[32px] pc:text-[40px]" />
      ),
      // "결과가 없었던 분" 강조 적용
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
        <HiOutlineLightBulb className="text-[#ECC94B] text-[32px] pc:text-[40px]" />
      ),
      // "방향을 바꾸고 싶은 분" 강조 적용
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
    <section className="w-full bg-[#F2F2F2] pt-[80px] pb-[80px] pc:pt-[100px] pc:pb-[100px] px-5">
      <div className="section-container max-w-[1000px]">
        <div className="text-center mb-12 pc:mb-16">
          <h2 className="text-[26px] pc:text-[36px] font-extrabold text-[#151515] leading-tight">
            그래서, <span className="text-point-red">업변</span>은
            <br className="pc:hidden" />
            <span className="text-point-red"> 이런 분들</span>에게{" "}
            <span className="text-point-red">필요</span>합니다
          </h2>
        </div>

        <div className="grid grid-cols-1 pc:grid-cols-3 gap-6">
          {targets.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E5E5] rounded-[12px] p-8 pc:p-10 flex flex-col items-center text-center shadow-sm"
            >
              <div className="mb-6">{item.icon}</div>
              {/* whitespace-pre-line을 유지하여 줄바꿈을 적용합니다. */}
              <p className="text-[#151515] font-bold text-[16px] pc:text-[18px] leading-snug whitespace-pre-line break-keep">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetSection;
