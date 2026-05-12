import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ id: "", pw: "" });
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = window.location.hostname.includes("localhost")
    ? "http://localhost:8080"
    : "https://be-production-32e8.up.railway.app";

  // 💡 날짜 포맷 함수
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}년 ${mm}월 ${dd}일 ${hh}시 ${min}분`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
        fetchInquiries();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("서버 연결 실패");
    }
  };

  const fetchInquiries = async () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const originalInquiries = [...inquiries];

    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );

    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/admin/inquiries/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!res.ok) {
        setInquiries(originalInquiries);
        alert("서버 저장에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      setInquiries(originalInquiries);
      alert("서버 연결 실패로 상태를 변경할 수 없습니다.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchInquiries();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center p-5">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-2xl font-black mb-6 text-center text-[#151515]">
            민지슈퍼 관리자 로그인
          </h2>
          <input
            type="text"
            placeholder="아이디"
            className="w-full border p-3 rounded-lg mb-4 text-black"
            onChange={(e) =>
              setCredentials({ ...credentials, id: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full border p-3 rounded-lg mb-6 text-black"
            onChange={(e) =>
              setCredentials({ ...credentials, pw: e.target.value })
            }
          />
          <button className="w-full bg-point-yellow py-3 rounded-lg font-black text-[#151515]">
            접속하기
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pc:p-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl pc:text-3xl font-black text-[#151515]">
            문의 관리 대시보드
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              setIsLoggedIn(false);
            }}
            className="text-gray-500 font-bold"
          >
            로그아웃
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* 💡 테이블 영역 시작 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1320px]">
            <thead className="bg-gray-100 text-[#151515] font-bold text-[13px] pc:text-[14px]">
              <tr>
                {/* 정확히 10개의 헤더 */}
                <th className="w-[58px] px-4 py-4 border-b whitespace-nowrap">
                  NO
                </th>
                <th className="w-[86px] px-4 py-4 border-b whitespace-nowrap">
                  성함
                </th>
                <th className="w-[128px] px-4 py-4 border-b whitespace-nowrap">
                  연락처
                </th>
                <th className="w-[150px] px-4 py-4 border-b">지역</th>
                <th className="w-[110px] px-4 py-4 border-b whitespace-nowrap">
                  창업유형
                </th>
                <th className="w-[300px] px-4 py-4 border-b whitespace-nowrap">
                  투자금액
                </th>
                <th className="w-[130px] px-4 py-4 border-b whitespace-nowrap">
                  상담시간
                </th>
                <th className="w-[200px] px-4 py-4 border-b whitespace-nowrap">
                  접수시간
                </th>
                <th className="w-[110px] px-4 py-4 border-b whitespace-nowrap">
                  상태
                </th>
                <th className="w-[86px] px-4 py-4 border-b whitespace-nowrap">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px] pc:text-[14px] text-gray-800">
              {inquiries.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* 정확히 10개의 데이터 셀 */}
                  <td className="px-4 py-5 border-b font-medium text-gray-500 whitespace-nowrap align-middle">
                    {inquiries.length - index}
                  </td>
                  <td className="px-4 py-5 border-b font-bold text-gray-900 whitespace-nowrap align-middle">
                    {item.name}
                  </td>
                  <td className="px-4 py-5 border-b font-medium whitespace-nowrap align-middle">
                    {item.phone}
                  </td>
                  <td className="px-4 py-5 border-b break-keep leading-relaxed align-middle">
                    {item.location ||
                      (item.province ? `${item.province} ${item.city}` : "-")}
                  </td>
                  <td className="px-4 py-5 border-b whitespace-nowrap align-middle">
                    {item.storeStatus || item.businessType || "-"}
                  </td>
                  <td className="px-4 py-5 border-b break-keep break-words leading-relaxed align-middle">
                    {item.investmentAmount || "-"}
                  </td>
                  <td className="px-4 py-5 border-b text-point-red font-bold break-keep leading-relaxed align-middle">
                    {item.preferredTime || "-"}
                  </td>
                  <td className="px-4 py-5 border-b text-gray-500 whitespace-nowrap align-middle">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-4 py-5 border-b align-middle">
                    <select
                      value={item.status || "대기중"}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      className={`w-full min-w-[78px] p-1.5 rounded-md font-bold text-[13px] border cursor-pointer ${
                        item.status === "상담완료"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : item.status === "부재중"
                            ? "bg-red-50 text-red-600 border-red-200"
                            : "bg-blue-50 text-blue-600 border-blue-200"
                      }`}
                    >
                      <option value="대기중">대기중</option>
                      <option value="부재중">부재중</option>
                      <option value="상담완료">상담완료</option>
                    </select>
                  </td>
                  <td className="px-4 py-5 border-b align-middle">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="min-w-[48px] bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-[12px] font-bold whitespace-nowrap hover:bg-red-500 hover:text-white transition-colors"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {/* 💡 테이블 영역 끝 */}

          {inquiries.length === 0 && !loading && (
            <div className="p-20 text-center text-gray-400 font-bold">
              접수된 문의 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
