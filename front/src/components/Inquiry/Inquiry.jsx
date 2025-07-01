import React, { useState } from "react";
import axios from "axios";
import "./Inquiry.css";

// Railway API URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    businessType: "",
    province: "",
    city: "",
    agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  // 지역 데이터
  const regionData = {
    서울특별시: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    부산광역시: [
      "강서구",
      "금정구",
      "기장군",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
    ],
    대구광역시: [
      "남구",
      "달서구",
      "달성군",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
    ],
    인천광역시: [
      "강화군",
      "계양구",
      "미추홀구",
      "남동구",
      "동구",
      "부평구",
      "서구",
      "연수구",
      "옹진군",
      "중구",
    ],
    광주광역시: ["광산구", "남구", "동구", "북구", "서구"],
    대전광역시: ["대덕구", "동구", "서구", "유성구", "중구"],
    울산광역시: ["남구", "동구", "북구", "울주군", "중구"],
    세종특별자치시: ["세종시"],
    경기도: [
      "수원시",
      "성남시",
      "고양시",
      "용인시",
      "부천시",
      "안산시",
      "안양시",
      "남양주시",
      "화성시",
      "평택시",
      "의정부시",
      "시흥시",
      "파주시",
      "광명시",
      "김포시",
      "군포시",
      "하남시",
      "오산시",
      "이천시",
      "안성시",
      "구리시",
      "포천시",
      "양주시",
      "동두천시",
      "과천시",
      "가평군",
      "연천군",
      "여주시",
      "양평군",
    ],
    강원도: [
      "춘천시",
      "원주시",
      "강릉시",
      "동해시",
      "태백시",
      "속초시",
      "삼척시",
      "홍천군",
      "횡성군",
      "영월군",
      "평창군",
      "정선군",
      "철원군",
      "화천군",
      "양구군",
      "인제군",
      "고성군",
      "양양군",
    ],
    충청북도: [
      "청주시",
      "충주시",
      "제천시",
      "보은군",
      "옥천군",
      "영동군",
      "증평군",
      "진천군",
      "괴산군",
      "음성군",
      "단양군",
    ],
    충청남도: [
      "천안시",
      "공주시",
      "보령시",
      "아산시",
      "서산시",
      "논산시",
      "계룡시",
      "당진시",
      "금산군",
      "부여군",
      "서천군",
      "청양군",
      "홍성군",
      "예산군",
      "태안군",
    ],
    전라북도: [
      "전주시",
      "군산시",
      "익산시",
      "정읍시",
      "남원시",
      "김제시",
      "완주군",
      "진안군",
      "무주군",
      "장수군",
      "임실군",
      "순창군",
      "고창군",
      "부안군",
    ],
    전라남도: [
      "목포시",
      "여수시",
      "순천시",
      "나주시",
      "광양시",
      "담양군",
      "곡성군",
      "구례군",
      "고흥군",
      "보성군",
      "화순군",
      "장흥군",
      "강진군",
      "해남군",
      "영암군",
      "무안군",
      "함평군",
      "영광군",
      "장성군",
      "완도군",
      "진도군",
      "신안군",
    ],
    경상북도: [
      "포항시",
      "경주시",
      "김천시",
      "안동시",
      "구미시",
      "영주시",
      "영천시",
      "상주시",
      "문경시",
      "경산시",
      "군위군",
      "의성군",
      "청송군",
      "영양군",
      "영덕군",
      "청도군",
      "고령군",
      "성주군",
      "칠곡군",
      "예천군",
      "봉화군",
      "울진군",
      "울릉군",
    ],
    경상남도: [
      "창원시",
      "진주시",
      "통영시",
      "사천시",
      "김해시",
      "밀양시",
      "거제시",
      "양산시",
      "의령군",
      "함안군",
      "창녕군",
      "고성군",
      "남해군",
      "하동군",
      "산청군",
      "함양군",
      "거창군",
      "합천군",
    ],
    제주특별자치도: ["제주시", "서귀포시"],
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 전화번호 입력 시 숫자만 허용
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      return;
    }

    // 시/도가 변경되면 시/군/구 초기화
    if (name === "province") {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        city: "", // 시/군/구 초기화
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 간단한 validation
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.businessType ||
      !formData.province ||
      !formData.city ||
      !formData.agreed
    ) {
      setError("모든 항목을 입력해주세요.");
      setLoading(false);
      return;
    }

    // 전화번호 형식 검증 (010으로 시작하는 11자리)
    const phonePattern = /^010\d{8}$/;
    if (!phonePattern.test(formData.phone)) {
      setError("연락처는 010으로 시작하는 11자리 숫자로 입력해주세요. (예: 01012345678)");
      setLoading(false);
      return;
    }

    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      setLoading(false);
      return;
    }

    // 백엔드 API에 맞게 데이터 구조 변환
    const inquiryData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      businessType: formData.businessType,
      province: formData.province,
      city: formData.city,
      agreed: formData.agreed
    };



    try {
      // Railway 백엔드 API 호출
      const response = await axios.post(`${API_BASE_URL}/api/inquiry`, inquiryData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000, // 15초 타임아웃 (Railway 응답 시간 고려)
        withCredentials: false, // CORS 이슈 방지
      });
      

      setSuccess(true);
      
      // 폼 초기화
      setFormData({
        name: "",
        phone: "",
        email: "",
        businessType: "",
        province: "",
        city: "",
        agreed: false,
      });
      
      // 5초 후 성공 메시지 숨기기
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (error) {


      // 에러 메시지 설정
      if (error.response) {
        // 서버가 응답을 반환한 경우
        const errorData = error.response.data;
        const status = error.response.status;



        if (status === 500) {
          setError('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else if (status === 404) {
          setError('API 엔드포인트를 찾을 수 없습니다. 관리자에게 문의하세요.');
        } else if (errorData.message) {
          setError(errorData.message);
        } else if (errorData.errors) {
          // 필드 오류가 있는 경우
          const errorMessages = Object.values(errorData.errors).join(', ');
          setError(errorMessages);
        } else {
          setError(`문의 접수 중 오류가 발생했습니다. (상태코드: ${status})`);
        }
      } else if (error.request) {
        // 요청이 전송되었지만 응답이 없는 경우 (네트워크 오류, CORS 등)
        if (error.code === 'ECONNABORTED') {
          setError('요청 시간이 초과되었습니다. 네트워크 상태를 확인하고 다시 시도해주세요.');
        } else {
          setError('서버에 연결할 수 없습니다. Railway 서버 상태를 확인해주세요.');
        }
      } else {
        // 요청 설정 중 오류가 발생한 경우
        setError('요청 설정 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inquiry-container">


      {error && (
        <div className="custom-alert error">
          <div className="alert-content">
            <span>{error}</span>
            <button
              className="alert-close"
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {success && (
        <div className="custom-alert success">
          <div className="alert-content">
            <span>문의가 성공적으로 접수되었습니다.</span>
            <button 
              className="alert-close" 
              onClick={() => setSuccess(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="phone"
            placeholder="연락처(01012345678)"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input"
            maxLength="11"
          />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleInputChange}
            className="form-select">
            <option value="">창업유형</option>
            <option value="창업">창업</option>
            <option value="업종변경">업종변경</option>
          </select>

          <select
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            className="form-select">
            <option value="">시/도 선택</option>
            <option value="서울특별시">서울특별시</option>
            <option value="부산광역시">부산광역시</option>
            <option value="대구광역시">대구광역시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="광주광역시">광주광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="울산광역시">울산광역시</option>
            <option value="세종특별자치시">세종특별자치시</option>
            <option value="경기도">경기도</option>
            <option value="강원도">강원도</option>
            <option value="충청북도">충청북도</option>
            <option value="충청남도">충청남도</option>
            <option value="전라북도">전라북도</option>
            <option value="전라남도">전라남도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="제주특별자치도">제주특별자치도</option>
          </select>

          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="form-select">
            <option value="">시/군/구 선택</option>
            {formData.province &&
              regionData[formData.province] &&
              regionData[formData.province].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>

        <div className="privacy-agreement">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleInputChange}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            개인정보처리방침 약관동의 [전문보기]
          </label>
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? "처리 중..." : "문의접수 ⭕"}
        </button>
      </form>
    </div>
  );
};

export default Inquiry;
