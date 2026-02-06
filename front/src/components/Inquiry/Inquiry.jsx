import React, { useState } from "react";
import { motion } from "framer-motion"; // 애니메이션 추가
import "./Inquiry.css";

const Inquiry = () => {
  // --- 기존 로직 유지 ---
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("창업");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [agreed, setAgreed] = useState(false);

  const provinces = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];

  // 연락처 하이픈 자동 추가 및 숫자만 입력
  const handlePhoneNumber = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      setPhone(value.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inquiryData = {
      name,
      phone: phone.replace(/-/g, ""), // 서버 전송 시 하이픈 제거
      email,
      businessType,
      province,
      city,
      agreed,
    };

    console.log("전송할 데이터:", inquiryData);
    // 여기에 실제 서버 전송 로직 (fetch 등)이 들어갑니다.
    alert("상담 신청이 완료되었습니다. (UI 테스트)");
    // 폼 초기화 로직 등 추가 가능
  };
  // --- 기존 로직 끝 ---

  // --- 새로운 디자인 적용 ---
  return (
    // ID를 주어 스크롤 이동의 타겟이 되게 함
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
            />
          </div>

          {/* 이메일 (신규 추가 제안 - 필요 없다면 주석 처리) */}
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
            >
              <option value="창업">신규 창업</option>
              <option value="업종변경">업종 변경</option>
            </select>
          </div>

          {/* 지역 선택 (가로 배치 Row) */}
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
              />
            </div>
          </div>

          {/* 약관 동의 */}
          <label className="checkbox-group">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <span className="checkbox-label">
              <span className="privacy-link">개인정보 처리방침</span>에
              동의합니다. (필수)
            </span>
          </label>

          {/* 제출 버튼 */}
          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            상담 신청하기
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Inquiry;
