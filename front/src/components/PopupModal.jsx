import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hideUntil = localStorage.getItem("hideFranchisePopup");
    const now = new Date().getTime();

    if (!hideUntil || now > parseInt(hideUntil)) {
      // 대기 시간은 300ms로 유지 (체감상 즉시 실행)
      const timer = setTimeout(() => setIsOpen(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => setIsOpen(false);

  const closeFor24Hours = () => {
    const expireDate = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem("hideFranchisePopup", expireDate.toString());
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 💡 [교정] backdrop-blur 클래스를 제거하여 뒷배경이 흐릿하게 보이는 효과 제거 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            // 💡 배경만 살짝 어둡게 처리 (blur 제거)
            className="fixed inset-0 bg-black/60 z-[9998]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }} // 위에서 아래로 미세하게 등장
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            /* 💡 [교정] 좌측 상단 적당한 위치로 고정 (fixed left-5 top-20) 
                     기존 중앙 정렬 translate 제거 */
            className="fixed left-40 top-20 z-[9999] w-[85%] pc:w-full max-w-[380px] pc:max-w-[420px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* 이미지 영역: image_2df6be.jpg 반영 */}
            <div className="relative w-full aspect-[2/3] overflow-hidden">
              <img
                src="/images/popup-franchise-status.jpg"
                alt="가맹 문의 현황"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 하단 컨트롤 바 */}
            <div className="bg-[#151515] flex justify-between items-center px-6 py-5 text-white">
              <button
                onClick={closeFor24Hours}
                className="text-[11px] pc:text-[13px] font-bold opacity-70 hover:opacity-100 hover:text-point-yellow transition-all break-keep"
              >
                24시간 동안 보지 않기
              </button>
              <button
                onClick={closePopup}
                className="text-[11px] pc:text-[13px] font-black hover:scale-110 transition-transform"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
