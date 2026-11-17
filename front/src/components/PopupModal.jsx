import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

import { API_BASE_URL, popupRequest } from "../lib/popupApi";

const getPopupStorageKey = (popup) => `hidePopup:${popup.id}:${popup.imageRevision}`;
const getPopupImageUrl = (popup) => `${API_BASE_URL}/api/popups/${popup.id}/image?v=${popup.imageRevision}`;

// 이미지를 먼저 받아 디코딩까지 끝낸 뒤 팝업을 연다.
// 빈 상자를 먼저 띄우면 이미지가 도착할 때 상자가 늘어나며 레이아웃 이동(CLS)이 생긴다.
// 받은 이미지는 브라우저 캐시에 남아(?v= 주소는 서버가 캐시 허용) 실제 <img> 가 다시 받지 않는다.
const preloadPopupImage = (popup) => new Promise((resolve) => {
  const img = new Image();
  img.fetchPriority = "high";
  img.onload = () => Promise.resolve(img.decode?.()).catch(() => {}).then(() => resolve(true));
  img.onerror = () => resolve(false);
  img.src = getPopupImageUrl(popup);
});

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
        // 이미지를 못 받은 팝업은 빈 상자로 띄우지 않는다. 기존처럼 최소 300ms 뒤에 연다.
        const minimumDelay = new Promise((resolve) => { timer = setTimeout(resolve, 300); });
        Promise.all([Promise.all(visible.map(preloadPopupImage)), minimumDelay]).then(([loaded]) => {
          if (controller.signal.aborted) return;
          setOpenPopupIds(visible.filter((_, index) => loaded[index]).map(popup => popup.id));
        });
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
                              src={getPopupImageUrl(popup)}
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
