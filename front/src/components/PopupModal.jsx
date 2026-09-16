import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

import { API_BASE_URL, popupRequest } from "../lib/popupApi";

const getPopupStorageKey = (popup) => `hidePopup:${popup.id}:${popup.imageRevision}`;

const PopupModal = () => {
  const [openPopupIds, setOpenPopupIds] = useState([]);
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    let timer;
    popupRequest('popups', { signal: controller.signal }, false)
      .then(res => res.json())
      .then(items => {
        if (controller.signal.aborted) return;
        setPopups(items);
        const visible = items.filter(popup => {
          try {
            const until = Number(localStorage.getItem(getPopupStorageKey(popup)));
            return !until || Date.now() >= until;
          } catch { return true; }
        });
        timer = setTimeout(() => setOpenPopupIds(visible.map(popup => popup.id)), 300);
      }).catch(() => { /* Keep the homepage available if the popup API fails. */ });
    return () => { controller.abort(); clearTimeout(timer); };
  }, []);

  const closePopup = (popupId) => {
    setOpenPopupIds((currentIds) =>
      currentIds.filter((currentId) => currentId !== popupId),
    );
  };

  const closeFor24Hours = (popup) => {
    const expireDate = new Date().getTime() + 24 * 60 * 60 * 1000;
    try { localStorage.setItem(getPopupStorageKey(popup), expireDate.toString()); } catch { /* Closing works without storage. */ }
    closePopup(popup.id);
  };

  const openPopups = popups.filter((popup) => openPopupIds.includes(popup.id));

  return (
    <AnimatePresence>
      {openPopups.length > 0 && (
        <>
          {/* 💡 배경 오버레이: 흐림(blur) 효과 제거 및 투명도 조절 */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenPopupIds([])}
            className="fixed inset-0 bg-black/60 z-[9998]"
          />

          {/* 💡 [교정 핵심] 위치 제어용 래퍼 컨테이너
             - 모바일: 같은 위치에 겹쳐 순차 노출
             - PC(pc:): 왼쪽 상단부터 슬롯을 고정해 순차 노출
          */}
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-y-auto px-4 py-5 pc:p-10">
            <div className="relative mx-auto h-[min(86vh,560px)] w-full max-w-[340px] pc:mx-0 pc:flex pc:h-auto pc:max-w-none pc:items-start pc:flex-wrap pc:gap-5">
              {popups.map((popup) => {
                const isOpen = openPopupIds.includes(popup.id);
                const mobileStackIndex = openPopups.findIndex(
                  (openPopup) => openPopup.id === popup.id,
                );
                const mobileOffset = Math.min(Math.max(mobileStackIndex, 0), 3) * 18;
                const mobileScale = 1 - Math.min(Math.max(mobileStackIndex, 0), 3) * 0.04;
                const mobileZIndex = 20 - Math.min(Math.max(mobileStackIndex, 0), 3);

                return (
                  <div
                    key={popup.id}
                    className="pc:block pc:w-[360px] pc:shrink-0"
                  >
                    <AnimatePresence>
                      {isOpen && (
                        <Motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          style={{
                            "--mobile-popup-offset": `${mobileOffset}px`,
                            "--mobile-popup-scale": mobileScale,
                            zIndex: mobileZIndex,
                          }}
                          // 💡 실제 클릭은 가능하게 설정
                          className="pointer-events-auto absolute left-0 top-[var(--mobile-popup-offset)] flex w-full origin-top flex-col overflow-hidden rounded-2xl bg-white shadow-2xl scale-[var(--mobile-popup-scale)] pc:static pc:max-w-[360px] pc:scale-100"
                        >
                          {/* 이미지 영역 */}
                          <div className="relative w-full bg-gray-100">
                            <img
                              src={`${API_BASE_URL}/api/popups/${popup.id}/image?v=${popup.imageRevision}`}
                              alt={popup.title}
                              className="block w-full h-auto"
                            />
                          </div>

                          {/* 하단 컨트롤 바 */}
                          <div className="bg-[#151515] flex flex-col gap-2 min-[360px]:flex-row min-[360px]:justify-between min-[360px]:items-center px-5 py-4 text-white">
                            <button
                              onClick={() => closeFor24Hours(popup)}
                              className="text-[12px] pc:text-[13px] font-bold opacity-80 hover:text-point-yellow transition-all break-keep"
                            >
                              24시간 동안 보지 않기
                            </button>
                            <button
                              onClick={() => closePopup(popup.id)}
                              className="text-[12px] pc:text-[13px] font-black hover:scale-110 transition-transform px-2"
                            >
                              닫기
                            </button>
                          </div>
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
