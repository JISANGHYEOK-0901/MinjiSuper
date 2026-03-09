import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hideUntil = localStorage.getItem("hideFranchisePopup");
    const now = new Date().getTime();

    if (!hideUntil || now > parseInt(hideUntil)) {
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
          {/* 💡 배경 오버레이: 흐림(blur) 효과 제거 및 투명도 조절 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 bg-black/60 z-[9998]"
          />

          {/* 💡 [교정 핵심] 위치 제어용 래퍼 컨테이너
             - 모바일: inset-0 flex items-center justify-center (화면 정중앙 강제)
             - PC(pc:): items-start justify-start pc:p-5 pc:top-14 (좌측 상단으로 이동)
          */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none pc:items-start pc:justify-start pc:p-10 pc:top-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              // 💡 실제 클릭은 가능하게 설정
              className="pointer-events-auto w-[90%] max-w-[360px] pc:max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* 이미지 영역: image_2df6be.jpg 반영 */}
              <div className="relative w-full aspect-[2/3] bg-gray-100">
                <img
                  src="/images/popup-franchise-status.jpg"
                  alt="가맹 문의 현황"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 하단 컨트롤 바 */}
              <div className="bg-[#151515] flex justify-between items-center px-5 py-4 text-white">
                <button
                  onClick={closeFor24Hours}
                  className="text-[11px] pc:text-[13px] font-bold opacity-80 hover:text-point-yellow transition-all break-keep"
                >
                  24시간 동안 보지 않기
                </button>
                <button
                  onClick={closePopup}
                  className="text-[11px] pc:text-[13px] font-black hover:scale-110 transition-transform px-2"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
