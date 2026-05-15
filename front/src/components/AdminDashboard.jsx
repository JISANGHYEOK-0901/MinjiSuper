import React, { useState } from "react";

const STATUS_OPTIONS = [
  "대기중",
  "상담중",
  "부재중",
  "상담완료",
  "계약 진행 중",
  "계약완료",
];

const FILTER_OPTIONS = ["전체", ...STATUS_OPTIONS];

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ id: "", pw: "" });
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [memoDrafts, setMemoDrafts] = useState({});
  const [savingMemoId, setSavingMemoId] = useState(null);

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

  const getStatusValue = (status) => status || "대기중";

  const getStatusClassName = (status) => {
    switch (getStatusValue(status)) {
      case "상담중":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "부재중":
        return "bg-red-50 text-red-600 border-red-200";
      case "상담완료":
        return "bg-green-50 text-green-600 border-green-200";
      case "계약 진행 중":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "계약완료":
        return "bg-slate-900 text-white border-slate-900";
      case "대기중":
      default:
        return "bg-blue-50 text-blue-600 border-blue-200";
    }
  };

  const getStatusCount = (status) =>
    inquiries.filter((item) => getStatusValue(item.status) === status).length;

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
    } catch {
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
        setMemoDrafts(
          data.reduce((acc, item) => {
            acc[item.id] = item.adminMemo || "";
            return acc;
          }, {}),
        );
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMemoChange = (id, value) => {
    setMemoDrafts((prev) => ({ ...prev, [id]: value }));
  };

  const handleMemoSave = async (id) => {
    const token = localStorage.getItem("adminToken");
    const memo = memoDrafts[id] || "";
    setSavingMemoId(id);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/inquiries/${id}/memo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ memo }),
      });

      if (res.ok) {
        const updated = await res.json();
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? updated : item)),
        );
        setMemoDrafts((prev) => ({ ...prev, [id]: updated.adminMemo || "" }));
      } else {
        alert("메모 저장에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch {
      alert("서버 연결 실패로 메모를 저장할 수 없습니다.");
    } finally {
      setSavingMemoId(null);
    }
  };

  const visibleInquiries = inquiries.filter((item) => {
    const status = getStatusValue(item.status);
    if (activeTab === "contracted" && status !== "계약완료") return false;
    if (statusFilter !== "전체" && status !== statusFilter) return false;
    return true;
  });

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
    } catch {
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
    } catch {
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col pc:flex-row min-h-screen">
        <aside className="w-full pc:w-[240px] bg-[#151515] text-white p-5 pc:p-6">
          <div className="text-xl font-black mb-6">민지슈퍼 관리자</div>
          <nav className="flex pc:flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab("all");
                setStatusFilter("전체");
              }}
              className={`text-left px-4 py-3 rounded-lg font-bold transition-colors ${
                activeTab === "all"
                  ? "bg-point-yellow text-[#151515]"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              전체 문의
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("contracted");
                setStatusFilter("전체");
              }}
              className={`text-left px-4 py-3 rounded-lg font-bold transition-colors ${
                activeTab === "contracted"
                  ? "bg-point-yellow text-[#151515]"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              계약완료
              <span className="ml-2 text-sm opacity-80">
                {getStatusCount("계약완료")}
              </span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 pc:p-8 overflow-hidden">
          <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col pc:flex-row pc:justify-between pc:items-center gap-4 mb-8">
          <h1 className="text-2xl pc:text-3xl font-black text-[#151515]">
            {activeTab === "contracted" ? "계약완료 리스트" : "문의 관리 대시보드"}
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

        <div className="flex flex-col pc:flex-row pc:items-center gap-3 mb-5">
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-2 rounded-lg border text-[13px] font-bold transition-colors ${
                  statusFilter === status
                    ? "bg-[#151515] text-white border-[#151515]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {status}
                {status !== "전체" && (
                  <span className="ml-1 text-[12px] opacity-70">
                    {getStatusCount(status)}
                  </span>
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={fetchInquiries}
            className="pc:ml-auto bg-white border border-gray-200 px-4 py-2 rounded-lg text-[13px] font-bold text-gray-600 hover:border-gray-400"
          >
            새로고침
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* 💡 테이블 영역 시작 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1580px]">
            <thead className="bg-gray-100 text-[#151515] font-bold text-[13px] pc:text-[14px]">
              <tr>
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
                <th className="w-[260px] px-4 py-4 border-b whitespace-nowrap">
                  메모
                </th>
                <th className="w-[86px] px-4 py-4 border-b whitespace-nowrap">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px] pc:text-[14px] text-gray-800">
              {visibleInquiries.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-5 border-b font-medium text-gray-500 whitespace-nowrap align-middle">
                    {visibleInquiries.length - index}
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
                      className={`w-full min-w-[112px] p-1.5 rounded-md font-bold text-[13px] border cursor-pointer ${getStatusClassName(
                        item.status,
                      )}`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-5 border-b align-middle">
                    <div className="flex gap-2 items-start">
                      <textarea
                        value={memoDrafts[item.id] || ""}
                        onChange={(e) =>
                          handleMemoChange(item.id, e.target.value)
                        }
                        placeholder="관리자 메모"
                        rows={2}
                        className="w-full min-w-[170px] resize-none rounded-md border border-gray-200 p-2 text-[12px] leading-relaxed focus:outline-none focus:border-point-yellow"
                      />
                      <button
                        type="button"
                        onClick={() => handleMemoSave(item.id)}
                        disabled={savingMemoId === item.id}
                        className="min-w-[48px] bg-[#151515] text-white px-3 py-2 rounded text-[12px] font-bold whitespace-nowrap disabled:bg-gray-400"
                      >
                        {savingMemoId === item.id ? "저장중" : "저장"}
                      </button>
                    </div>
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

          {visibleInquiries.length === 0 && !loading && (
            <div className="p-20 text-center text-gray-400 font-bold">
              표시할 문의 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
