import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Inquiry.css";

// 💡 안전망: 환경변수가 없더라도 운영/개발 환경을 자동 감지하여 API 주소를 설정합니다.
const getApiBaseUrl = () => {
  if (
    window.location.hostname === "www.minjisuper.co.kr" ||
    window.location.hostname === "minjisuper.co.kr" ||
    window.location.hostname.includes("vercel.app")
  ) {
    return "https://be-production-32e8.up.railway.app";
  }
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
};

const Inquiry = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("창업");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [agreed, setAgreed] = useState(false);

  // 💡 추가된 상태: 중복 제출 방지를 위한 로딩 상태
  const [isSubmitting, setIsSubmitting] = useState(false);

  const provinces = [
    "서울특별시", "부산광역시", "대구광역시", "인천광역시",
    "광주광역시", "대전광역시", "울산광역시", "세종특별자치시",
    "경기도", "강원도", "충청북도", "충청남도",
    "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도",
  ];

  // 연락처 하이픈 자동 추가 및 숫자만 입력
  const handlePhoneNumber = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      setPhone(value.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
    }
  };

  // 💡 실제 서버 통신이 적용된 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이미 전송 중이라면 중복 클릭 방지
    if (isSubmitting) return;

    setIsSubmitting(true); // 로딩 시작

    const inquiryData = {
      name,
      phone: phone.replace(/-/g, ""), // 서버 전송 시 하이픈 제거
      email,
      businessType,
      province,
      city,
      agreed,
    };

    try {
      const API_BASE_URL = getApiBaseUrl();
      
      const response = await fetch(`${API_BASE_URL}/api/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("상담 신청이 완료되었습니다. 확인 후 빠르게 연락드리겠습니다!");
        
        // 💡 폼 초기화: 전송 성공 후 입력창을 비워줍니다.
        setName("");
        setPhone("");
        setEmail("");
        setBusinessType("창업");
        setProvince("");
        setCity("");
        setAgreed(false);
      } else {
        // 서버에서 유효성 검사 실패 등의 응답이 올 경우
        alert(result.message || "입력하신 정보를 다시 확인해 주세요.");
      }
    } catch (error) {
      console.error("전송 오류:", error);
      alert("서버 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false); // 통신이 끝나면 로딩 상태 해제
    }
  };

  return (
    <div className="inquiry-container" id="inquiry-section">
      <motion.div
        className="inquiry-wrapper"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inquiry-header">
          <h2 className="inquiry-title">
            가맹 문의 <span className="highlight-green">상담 신청</span>
          </h2>
          <p className="inquiry-sub">
            성공 창업의 첫걸음, 민지슈퍼가 함께합니다.
          </p>
        </div>

        <form className="inquiry-form" onSubmit={handleSubmit}>
          {/* 이름 */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              이름<span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* 연락처 */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              연락처<span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              placeholder="010-1234-5678"
              value={phone}
              onChange={handlePhoneNumber}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* 이메일 */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              이메일<span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="example@naver.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* 창업유형 */}
          <div className="form-group">
            <label htmlFor="businessType" className="form-label">
              창업유형<span className="required">*</span>
            </label>
            <select
              id="businessType"
              className="form-input"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="창업">신규 창업</option>
              <option value="업종변경">업종 변경</option>
            </select>
          </div>

          {/* 지역 선택 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="province" className="form-label">
                시/도<span className="required">*</span>
              </label>
              <select
                id="province"
                className="form-input"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
                disabled={isSubmitting}
              >
                <option value="">선택해주세요</option>
                {provinces.map((prov, index) => (
                  <option key={index} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="city" className="form-label">
                시/군/구<span className="required">*</span>
              </label>
              <input
                type="text"
                id="city"
                className="form-input"
                placeholder="예: 강남구"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* 약관 동의 */}
          <label className="checkbox-group" style={{ opacity: isSubmitting ? 0.6 : 1 }}>
            <input
              type="checkbox"
              className="form-checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              disabled={isSubmitting}
            />
            <span className="checkbox-label">
              <span className="privacy-link">개인정보 처리방침</span>에 동의합니다. (필수)
            </span>
          </label>

          {/* 제출 버튼 */}
          <motion.button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
            style={{ 
              opacity: isSubmitting ? 0.7 : 1, 
              cursor: isSubmitting ? "not-allowed" : "pointer" 
            }}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? "접수 중입니다..." : "상담 신청하기"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Inquiry;