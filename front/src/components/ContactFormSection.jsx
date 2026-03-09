import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactFormSection = () => {
  // 💡 [기존 로직] API URL 및 상태 관리
  const getApiBaseUrl = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (
        hostname === "www.minjisuper.co.kr" ||
        hostname === "minjisuper.co.kr" ||
        hostname.includes("vercel.app")
      ) {
        return "https://be-production-32e8.up.railway.app";
      }
    }
    return "http://localhost:8080";
  };

  const API_BASE_URL = getApiBaseUrl();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    status: "",
    time: "",
    agreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 💡 [가디언 설정] 애니메이션 세트
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // 💡 [기존 로직] 핸들러 함수들
  const handleTextChange = (e, field) => {
    let { value } = e.target;
    if (field === "phone") value = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxToggle = () =>
    setFormData((prev) => ({ ...prev, agreed: !prev.agreed }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    if (isSubmitting) return;

    const submitData = {
      name: formData.name,
      phone: formData.phone,
      location: formData.location || "미지정",
      storeStatus: formData.status || "미지정",
      preferredTime: formData.time || "미지정",
      agreed: formData.agreed,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message || "문의가 성공적으로 접수되었습니다.");
        setFormData({
          name: "",
          phone: "",
          location: "",
          status: "",
          time: "",
          agreed: false,
        });
      } else {
        alert(result.message || "입력 정보를 다시 확인해주세요.");
      }
    } catch (error) {
      alert("서버 연결에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full flex flex-col pc:grid pc:grid-cols-2 overflow-hidden bg-white">
      {/* --- 1. 이미지 영역 (모바일 1번째 / PC 좌측 상단) --- */}
      <div className="order-1 pc:order-1 pc:col-span-1 relative w-full h-[400px] pc:h-auto overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="/images/footer-logo-partners.jpg"
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={blurRevealVariants}
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-10"
        >
          <p className="text-white text-[17px] pc:text-[22px] font-bold leading-snug drop-shadow-lg break-keep">
            11년 업변 전문가 김창훈이
            <br />
            지금 시대에 가장{" "}
            <span className="text-point-yellow">잘 맞는 브랜드 구조</span>로,
            <br />
            사장님의 가게를{" "}
            <span className="text-point-yellow">끝까지 살아남게</span>{" "}
            만들어드립니다.
          </p>
        </motion.div>
      </div>

      {/* --- 2. 브랜드 스토리 영역 (모바일 2번째 / PC 하단 전체) --- */}
      <div className="order-2 pc:order-3 pc:col-span-2 w-full bg-[#F2F2F2] py-20 px-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-[850px] mx-auto bg-[#F9F9F9]/80 backdrop-blur-sm rounded-[32px] p-8 pb-24 pc:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden"
        >
          <div className="relative z-10 text-[#333] text-[15.5px] pc:text-[17.5px] font-bold leading-[1.9] tracking-tight break-keep">
            {[
              "안녕하세요. 민지슈퍼 김창훈입니다.",
              "저도 한 번 망해봤습니다.",
              "그래서 요즘 술집이 왜 망하는지 정말 많이 봤고, 결국 하나를 깨달았습니다.",
              <>
                이제 사람들은 술만 마시러 오지 않습니다.{" "}
                <span className="bg-point-yellow/80 px-1 py-0.5 rounded-sm">
                  분위기
                </span>
                와{" "}
                <span className="bg-point-yellow/80 px-1 py-0.5 rounded-sm">
                  경험
                </span>
                을 사러 옵니다.
              </>,
              <>
                그래서 민지슈퍼를 만들었습니다.
                <br />
                단순한 술집이 아니라 머물고 놀러 오는 하나의 공간으로요.
                <br />
                옛날 동네 슈퍼의 따뜻함에 지금 세대의 감성을 더했습니다.
              </>,
              <>
                그{" "}
                <span className="bg-point-yellow/80 px-1 py-0.5 rounded-sm">
                  결과
                </span>
                는 이미{" "}
                <span className="bg-point-yellow/80 px-1 py-0.5 rounded-sm">
                  증명
                </span>
                되고 있습니다. 망하는 술집들 사이에서도 민지슈퍼는{" "}
                <span className="bg-point-yellow/80 px-1 py-0.5 rounded-sm">
                  줄을 섭니다.
                </span>
              </>,
              <>
                시장은 변했습니다.
                <br />
                지금은 차별화된 콘셉트가 답입니다. 업종 변경,{" "}
                <span className="bg-point-yellow/80 px-1 py-0.5 rounded-sm">
                  함께 도와드리겠습니다.
                </span>
              </>,
            ].map((p, i) => (
              <motion.p
                key={i}
                variants={blurRevealVariants}
                className="mb-8 last:mb-0"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={scalePopVariants}
            className="absolute bottom-6 right-8 pc:right-10 max-[400px]:right-auto max-[400px]:left-1/2 max-[400px]:-translate-x-1/2"
          >
            <img
              src="/images/receipt-logo-colorful.png"
              alt="MJSP"
              className="h-[50px] pc:h-[85px] object-contain opacity-80"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* --- 3. 상담 폼 영역 (모바일 3번째 / PC 우측 상단) --- */}
      {/* 💡 [반응형 해결] 모바일에서 정확히 폼이 시작되는 지점으로 스크롤되도록 id와 scroll-mt 부여 */}
      <div
        id="consultation-form"
        className="order-3 pc:order-2 pc:col-span-1 w-full bg-white py-16 pc:py-24 px-8 pc:px-20 scroll-mt-10 pc:scroll-mt-0"
      >
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={blurRevealVariants}
          className="text-[#151515] text-[21px] pc:text-[26px] font-black mb-10 tracking-tight break-keep"
        >
          “현재상황에 대한 상담만 받아도,
          <br />
          제대로 된 길이 보일 겁니다.”
        </motion.h3>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          {[
            { label: "성함", placeholder: "홍길동", key: "name" },
            { label: "전화번호", placeholder: "010-1234-5678", key: "phone" },
            {
              label: "지역",
              placeholder: "서울시 성동구 연무장 15길 11",
              key: "location",
            },
            {
              label: "매장운영 유무",
              placeholder: "매장 운영 중",
              key: "status",
            },
            {
              label: "원하는 시간",
              placeholder: "평일 오후 6시 이전",
              key: "time",
            },
          ].map((field) => (
            <motion.div
              key={field.key}
              variants={blurRevealVariants}
              className="flex flex-col gap-2"
            >
              <label className="text-[#151515] text-[14.5px] font-black">
                {field.label}
              </label>
              <input
                type="text"
                required
                value={formData[field.key]}
                onChange={(e) => handleTextChange(e, field.key)}
                placeholder={field.placeholder}
                className="w-full border-b-2 border-[#F0F0F0] py-2 text-[15.5px] text-[#151515] focus:outline-none focus:border-point-yellow transition-colors placeholder:text-gray-300"
              />
            </motion.div>
          ))}

          <motion.div
            variants={blurRevealVariants}
            className="flex items-start gap-3 mt-2"
          >
            <input
              type="checkbox"
              id="agreed"
              checked={formData.agreed}
              onChange={handleCheckboxToggle}
              className="w-5 h-5 mt-0.5 accent-point-yellow cursor-pointer"
            />
            <label
              htmlFor="agreed"
              className="text-[#666] text-[13.5px] pc:text-[14.5px] leading-snug cursor-pointer select-none break-keep"
            >
              <span className="text-[#151515] font-bold">[필수]</span> 개인정보
              수집 및 이용에 동의합니다.
              <br />
              <span className="text-[12px] text-gray-400 font-medium">
                * 상담 목적 외에는 절대 사용되지 않습니다.
              </span>
            </label>
          </motion.div>

          <motion.button
            variants={scalePopVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`group w-full ${isSubmitting || !formData.agreed ? "bg-gray-400" : "bg-point-yellow"} text-[#151515] font-black text-[18px] pc:text-[20px] h-[65px] rounded-full mt-4 shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2`}
          >
            {isSubmitting ? "전송 중..." : "상담 신청"}
            <span className="text-[18px] font-normal group-hover:translate-x-1.5 transition-transform duration-300">
              &gt;
            </span>
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactFormSection;
