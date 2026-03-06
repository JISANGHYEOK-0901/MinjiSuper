import React, { useState } from "react";

const ContactFormSection = () => {
  // 1. API URL 설정 (운영/개발 자동 전환)
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

  // 텍스트 입력 핸들러 (최신 상태 기반 업데이트)
  const handleTextChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ 체크박스 토글 핸들러 (한 번 체크 후 해제 안되는 문제 해결)
  const handleCheckboxToggle = () => {
    setFormData((prev) => ({ ...prev, agreed: !prev.agreed }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    if (isSubmitting) return;

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    const locationParts = formData.location.split(" ");
    const province = locationParts[0] || "미지정";
    const city = locationParts.slice(1).join(" ") || "전체";
    const businessType = formData.status.includes("운영") ? "업종변경" : "창업";

    const submitData = {
      name: formData.name,
      phone: cleanPhone,
      email: "contact@minjisuper.co.kr",
      businessType: businessType,
      province: province,
      city: city,
      preferredTime: formData.time,
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
      alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full flex flex-col">
      <div className="w-full flex flex-col pc:flex-row">
        {/* 좌측 이미지 영역 */}
        <div className="relative w-full pc:w-1/2 h-[400px] pc:h-auto overflow-hidden">
          <img
            src="/images/footer-logo-partners.jpg"
            alt="배경"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-10">
            <p className="text-white text-[16px] pc:text-[20px] font-bold leading-snug drop-shadow-lg">
              11년 업변 전문가 김창훈이
              <br />
              지금 시대에 가장{" "}
              <span className="text-point-yellow">잘 맞는 브랜드 구조</span>로,
              <br />
              사장님의 가게를{" "}
              <span className="text-point-yellow">끝까지 살아남게</span>{" "}
              만들어드립니다.
            </p>
          </div>
        </div>

        {/* 우측 폼 영역 */}
        <div className="w-full pc:w-1/2 bg-white py-16 pc:py-24 px-8 pc:px-20">
          <h3 className="text-[#151515] text-[20px] pc:text-[24px] font-black mb-10 tracking-tight">
            “현재상황에 대한 상담만 받아도,
            <br />
            제대로 된 길이 보일 겁니다.”
          </h3>

          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
              <div key={field.key} className="flex flex-col gap-2">
                <label className="text-[#151515] text-[14px] font-black">
                  {field.label}
                </label>
                <input
                  type="text"
                  required
                  value={formData[field.key]}
                  onChange={(e) => handleChange(e, field.key)}
                  placeholder={field.placeholder}
                  className="w-full border-b border-[#E5E5E5] py-2 text-[15px] text-[#151515] focus:outline-none focus:border-point-yellow transition-colors placeholder:text-gray-300"
                />
              </div>
            ))}

            {/* 개인정보 약관 동의 체크박스 추가 */}
            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                id="agreed"
                checked={formData.agreed}
                onChange={handleCheckboxToggle} // ✅ 수정한 핸들러 적용
                className="w-5 h-5 mt-0.5 accent-point-yellow cursor-pointer"
              />
              <label
                htmlFor="agreed"
                className="text-[#666] text-[13px] pc:text-[14px] leading-snug cursor-pointer select-none"
              >
                <span className="text-[#151515] font-bold">[필수]</span>{" "}
                개인정보 수집 및 이용에 동의합니다.
                <br />
                <span className="text-[12px] text-gray-400 font-medium">
                  * 상담 목적 외에는 절대 사용되지 않습니다.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting || !formData.agreed ? "bg-gray-400" : "bg-point-yellow"} text-[#151515] font-black text-[18px] h-[60px] rounded-full mt-4 shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2`}
            >
              {isSubmitting ? "전송 중..." : "상담 신청"}{" "}
              <span className="text-[16px] font-normal">&gt;</span>
            </button>
          </form>
        </div>
      </div>
      {/* --- Part 2: 브랜드 스토리 카드 영역 --- */}
      <div className="w-full bg-[#F2F2F2] py-20 px-5">
        <div className="max-w-[850px] mx-auto bg-[#F9F9F9]/80 backdrop-blur-sm rounded-[32px] p-8 pc:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden">
          <div className="relative z-10 text-[#333] text-[15px] pc:text-[17px] font-bold leading-[1.8] tracking-tight">
            <p className="mb-8">안녕하세요. 민지슈퍼 김창훈입니다.</p>
            <p className="mb-8">저도 한 번 망해봤습니다.</p>
            <p className="mb-8">
              그래서 요즘 술집이 왜 망하는지 정말 많이 봤고, 결국 하나를
              깨달았습니다.
            </p>
            <p className="mb-8">
              이제 사람들은 술만 마시러 오지 않습니다.{" "}
              <span className="bg-point-yellow/80 px-1 py-0.5 rounded-sm">
                분위기
              </span>
              와{" "}
              <span className="bg-point-yellow/80 px-1 py-0.5 rounded-sm">
                경험
              </span>
              을 사러 옵니다.
            </p>
            <p className="mb-8">
              그래서 민지슈퍼를 만들었습니다.
              <br />
              단순한 술집이 아니라 머물고 놀러 오는 하나의 공간으로요.
              <br />
              옛날 동네 슈퍼의 따뜻함에 지금 세대의 감성을 더했습니다.
            </p>
            <p className="mb-8">
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
            </p>
            <p>
              시장은 변했습니다.
              <br />
              지금은 차별화된 콘셉트가 답입니다. 업종 변경,{" "}
              <span className="bg-point-yellow/80 px-1 py-0.5 rounded-sm">
                함께 도와드리겠습니다.
              </span>
            </p>
          </div>
          <div className="absolute bottom-10 right-10">
            <img
              src="/images/receipt-logo-colorful.png"
              alt="MJSP"
              className="h-[50px] pc:h-[85px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
