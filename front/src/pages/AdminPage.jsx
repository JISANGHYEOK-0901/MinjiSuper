import React, { useState, useEffect } from "react";
import "./AdminPage.css";

const getApiBaseUrl = () => {
  if (
    window.location.hostname === "www.minjisuper.co.kr" ||
    window.location.hostname === "minjisuper.co.kr" ||
    window.location.hostname.includes("vercel.app")
  ) {
    return "https://be-production-32e8.up.railway.app";
  }
  return import.meta.env.VITE_API_BASE_URL || "";
};

const AdminPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      fetchInquiries(token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API_BASE_URL = getApiBaseUrl();
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pw }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
        fetchInquiries(data.token);
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      alert("서버 연결에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      const API_BASE_URL = getApiBaseUrl();
      await fetch(`${API_BASE_URL}/api/admin/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setInquiries([]);
    setId("");
    setPw("");
  };

  const fetchInquiries = async (token) => {
    setLoading(true);
    try {
      const API_BASE_URL = getApiBaseUrl();
      const response = await fetch(`${API_BASE_URL}/api/admin/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      } else {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        handleLogout();
      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 💡 상태 변경 API (Select Box용으로 변경)
  const updateStatus = async (inquiryId, newStatus) => {
    const token = localStorage.getItem("adminToken");

    try {
      const API_BASE_URL = getApiBaseUrl();
      const response = await fetch(
        `${API_BASE_URL}/api/admin/inquiries/${inquiryId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        // 성공 시 화면 즉각 업데이트
        setInquiries(
          inquiries.map((inq) =>
            inq.id === inquiryId ? { ...inq, status: newStatus } : inq,
          ),
        );
      } else {
        alert("상태 변경에 실패했습니다.");
      }
    } catch (error) {
      alert("서버 통신 오류가 발생했습니다.");
    }
  };

  // 💡 데이터 삭제 함수 추가
  const handleDelete = async (inquiryId) => {
    if (!window.confirm("정말 이 문의 내역을 삭제하시겠습니까? (복구 불가)")) {
      return; // 취소 누르면 중단
    }

    const token = localStorage.getItem("adminToken");
    try {
      const API_BASE_URL = getApiBaseUrl();
      const response = await fetch(
        `${API_BASE_URL}/api/admin/inquiries/${inquiryId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        // 성공 시 화면에서 해당 줄 즉시 제거
        setInquiries(inquiries.filter((inq) => inq.id !== inquiryId));
      } else {
        alert("데이터 삭제에 실패했습니다.");
      }
    } catch (error) {
      alert("서버 통신 오류가 발생했습니다.");
    }
  };

  // 💡 CSV 엑셀 다운로드 함수 (클라이언트 사이드 처리)
  const handleDownloadCSV = () => {
    if (inquiries.length === 0) {
      alert("다운로드할 데이터가 없습니다.");
      return;
    }

    const headers = [
      "No",
      "접수일시",
      "이름",
      "연락처",
      "이메일",
      "창업유형",
      "희망지역",
      "처리상태",
    ];
    const csvRows = [];
    csvRows.push(headers.join(","));

    inquiries.forEach((inq, index) => {
      const row = [
        inquiries.length - index,
        formatDate(inq.createdAt),
        inq.name,
        inq.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"), // 엑셀에서도 보기 편하게 하이픈 추가
        inq.email,
        inq.businessType,
        `${inq.province} ${inq.city}`,
        inq.status || "대기중",
      ];
      // 콤마(,)가 포함된 텍스트 깨짐 방지
      const escapedRow = row.map(
        (cell) => `"${String(cell).replace(/"/g, '""')}"`,
      );
      csvRows.push(escapedRow.join(","));
    });

    // 한글 깨짐 방지용 BOM 추가
    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `민지슈퍼_가맹문의_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2>🛡️ 민지슈퍼 관리자 로그인</h2>
          <input
            type="text"
            placeholder="관리자 아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
          <button type="submit">로그인</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h2>📊 민지슈퍼 가맹 문의 DB 관리</h2>
        <button className="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <div className="admin-content">
        <div className="summary-box">
          <div className="summary-text">
            총 누적 문의 <strong>{inquiries.length}</strong>건
          </div>
          <div className="action-buttons">
            {/* 💡 엑셀 다운로드 버튼 추가 */}
            <button className="csv-btn" onClick={handleDownloadCSV}>
              📥 엑셀(CSV) 다운로드
            </button>
            <button
              className="refresh-btn"
              onClick={() => fetchInquiries(localStorage.getItem("adminToken"))}
            >
              ↻ 새로고침
            </button>
          </div>
        </div>

        {loading ? (
          <p className="loading-text">데이터를 불러오는 중입니다...</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>접수일시</th>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>이메일</th>
                  <th>창업유형</th>
                  <th>희망지역</th>
                  <th>관리 (상태/삭제)</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="empty-row">
                      접수된 문의가 없습니다.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq, index) => {
                    const currentStatus = inq.status || "대기중";
                    const isCompleted = currentStatus === "상담완료";

                    // 💡 상태에 따른 색상 클래스 지정
                    const statusClass =
                      currentStatus === "상담완료"
                        ? "completed"
                        : currentStatus === "부재중"
                          ? "missed"
                          : "waiting";

                    return (
                      <tr
                        key={inq.id}
                        className={isCompleted ? "row-completed" : ""}
                      >
                        <td>{inquiries.length - index}</td>
                        <td>{formatDate(inq.createdAt)}</td>
                        <td>
                          <strong>{inq.name}</strong>
                        </td>
                        <td className="phone-col">
                          {inq.phone.replace(
                            /(\d{3})(\d{4})(\d{4})/,
                            "$1-$2-$3",
                          )}
                        </td>
                        <td>{inq.email}</td>
                        <td>
                          <span
                            className={`type-badge ${inq.businessType === "창업" ? "new" : "change"}`}
                          >
                            {inq.businessType}
                          </span>
                        </td>
                        <td>
                          {inq.province} {inq.city}
                        </td>
                        <td>
                          {/* 💡 버튼 대신 드롭박스(Select) 적용 */}
                          <select
                            className={`status-select ${statusClass}`}
                            value={currentStatus}
                            onChange={(e) =>
                              updateStatus(inq.id, e.target.value)
                            }
                          >
                            <option value="대기중">대기중</option>
                            <option value="상담완료">상담완료</option>
                            <option value="부재중">부재중</option>
                          </select>

                          {/* 삭제 버튼 유지 */}
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(inq.id)}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
