import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import "./MainPage.css";
import "./MainPage2.css";
import ShortsSlider from "../components/ShortsSlider/ShortsSlider";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import FlipCards from "../components/FlipCards/FlipCards";
import ReviewSlider from "../components/ReviewSlider";
import Inquiry from "../components/Inquiry/Inquiry";

const MainPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="main-container">
      <div className="container1">
        <div className="con1-content">
          <span>
            요즘 대학가에서 <div className="highlight"></div>
            <br />
            답은 <span className="main-logo"></span> 입니다.
          </span>
        </div>
      </div>

      <div className="container2">
        <div className="con2-content">
          식사, 안주, 분위기까지. 대학가 상권이 열광하는 '요즘 감성 식당'
          <br />
          건대에서 시작된 민지슈퍼,
          <div className="con2-border-txt">
            지금 당신의 동네에서도 가능합니다.
          </div>
        </div>
        <div className="con2-row-container">
          <div className="con2-row-image1"></div>
          <div className="con2-row-image2"></div>
        </div>
      </div>

      <div className="container3">
        <div className="con3-content">
          <FaCheck color="#159D6E" size={28} />
          단 2년, SNS 해시태그만 1만+
          <br />
          <FaCheck color="#159D6E" size={28} />
          오픈하자마자 줄 서는 그 곳!
        </div>
      </div>

      <div className="container4">
        <ShortsSlider />
      </div>

      <div className="container5">
        <div className="container5-inner">
          <div className="container5-left">
            <div className="con5-txt1"></div>
            <div className="con5-txt2"></div>
            <div className="con5-txt3"></div>
          </div>
          <div className="container5-right">
            <img
              src="/images/optimized/con4-right.webp"
              alt="민지슈퍼 외관"
              className="store-image"
            />
          </div>
        </div>
      </div>

      <div className="container6">
        <div className="con6-content">
          <div className="con6-txt">
            처음엔 MZ가 사랑한 컨셉 맛집,
            <br /> 지금은
            <span className="con6-txt1">대학가 대표 브랜드!</span>
          </div>
          <div className="con6-img"></div>
        </div>
      </div>

      <div className="container7">
        <div className="con7-slogun-img"></div>
        <div className="con7-content">
          <div className="con7-txt1">
            잘 되는 데는 이유가 있죠!
            <br />
            <span className="con7-txt2">
              요즘감성 + 짜임맛 구조 + 놀거리 콘텐츠
            </span>
            까지 <span className="con7-txt3">싹</span> 다 담았어요.
          </div>
        </div>
        <ImageSlider />
      </div>

      <hr className="green-hr" />

      <div className="container8">
        <hr className="green-hr2" />
        <div className="con8-content">
          <div className="con8-txt1">
            그냥 술집은 많지만, <br />
            손님이 알아서 사진 찍고 인증하는 곳은 흔치 않잖아요?
            <br />
            민지슈퍼는 그렇게 MZ들이 바이럴하는 술집이자 핫플입니다.
          </div>
          <div className="con8-txt2">
            <span className="con8-txt3">"MZ는 까다롭다."</span>는 말, 맞습니다.
          </div>
          <div className="con8-txt4">
            민지슈퍼는 <span className="con8-txt5">통하는 술집</span>입니다!
          </div>
        </div>
        <div className="con8-cloude"></div>
        <hr className="green-hr2" />
        <hr className="green-hr3" />
      </div>

      <div className="container9">
        <div className="con9-bg-wrapper">
          <div className="con9-background1">
            <div className="con9-txt1">
              메뉴 하나로
              <br />
              승부 보는 브랜드 아닙니다.
            </div>
            <div className="con9-txt2">솔직히</div>
            <div className="con9-txt3">
              이 <span className="red-block">가격</span>에 이{" "}
              <span className="red-block">구성</span>이면
              <br />안 오는게 이상하죠.
            </div>
            <div className="con9-txt4">
              누구나 아는 메뉴, 그런데 누구도 이 가격, 이 분위기로는 못 합니다.
              <br />
              민지슈퍼는 '대박 메뉴' 대신{" "}
              <span className="yellow-block">'잘 짜인 판'</span>
              으로 승부합니다.
            </div>
          </div>
          <div className="con9-background2" />
        </div>
      </div>

      <hr className="green-hr" />

      <div className="container10">
        <hr className="green-hr2" />
        <div className="con10-content">
          <div className="con10-txt1"></div>
          <div className="con10-txt2">
            그래서 <span style={{ color: "red" }}>민지슈퍼</span>는{" "}
            <span style={{ color: "red" }}>매일 차 있는 이유</span>가{" "}
            <span style={{ color: "red" }}>확실</span>해요.
          </div>
        </div>
        <FlipCards />
        <hr className="green-hr" />
        <hr className="green-hr2" />
      </div>

      <div className="container11">
        <div className="con11-content">
          <div className="con11-txt1"></div>
          <div className="con11-txt2"></div>
          <div className="con11-txt3"></div>
        </div>
        <hr className="green-hr" />
      </div>

      <div className="container12">
        <hr className="green-hr2" />
        <div className="con12-content"></div>
        <hr className="green-hr" />
        <hr className="green-hr2" />
      </div>

      <div className="container13">
        <div className="con13-content">
          <div className="con13-txt1"></div>
          <div className="con13-txt2"></div>
          <div className="con13-txt3"></div>
          <div className="con13-txt4"></div>
          <div className="con13-txt5"></div>
          <ReviewSlider />
          <div className="con13-tag-bar">
            <span className="tag-item">#연말모임</span>
            <span className="tag-item">#신년회</span>
            <span className="tag-item">#가성비술집</span>
            <span className="tag-item">#맛집추천</span>
            <span className="tag-item">#건대맛집</span>
            <span className="tag-item">#맛한술집</span>
          </div>
        </div>
      </div>

      <div className="container14">
        <div className="con14-content">
          <div className="con14-txt1"></div>
          <div className="youtube-videos-container">
            <div className="youtube-video-item">
              <iframe
                src="https://www.youtube.com/embed/hkZnTuqwk2I?rel=0&modestbranding=1&disablekb=1"
                title="민지슈퍼 유튜브 영상 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="youtube-iframe"></iframe>
            </div>
            <div className="youtube-video-item">
              <iframe
                src="https://www.youtube.com/embed/2kp4n43OTpY?rel=0&modestbranding=1&disablekb=1"
                title="민지슈퍼 유튜브 영상 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="youtube-iframe"></iframe>
            </div>
            <div className="youtube-video-item">
              <iframe
                src="https://www.youtube.com/embed/DL9fKWP8LlI?rel=0&modestbranding=1&disablekb=1"
                title="민지슈퍼 유튜브 영상 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="youtube-iframe"></iframe>
            </div>
            <div className="youtube-video-item">
              <iframe
                src="https://www.youtube.com/embed/YnnzRr_KyGY?start=702&rel=0&modestbranding=1&disablekb=1"
                title="민지슈퍼 유튜브 영상 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="youtube-iframe"></iframe>
            </div>
          </div>
          <div className="con14-txt2">
            민지슈퍼는 <span className="red-block2">MZ 브랜드 파워 </span>와{" "}
            <span className="red-block2">수익</span> 두 마리 토끼를 잡은
            브랜드입니다.
            <br />
            익숙한 메뉴로, 공간과 컨텐츠로, 매출의 판을 바꿨습니다.
          </div>
          <div className="con14-txt3"></div>
        </div>
        <hr className="green-hr" />
        <hr className="green-hr2" />
      </div>

      <div className="container15">
        <div className="con15-content">
          <div className="con15-txt1"></div>
          <div className="con15-txt2">
            <div className="con15-txt2-left"></div>
            <div className="con15-txt2-center">
              <div className="price-title"></div>
              <div className="price-table">
                <div className="price-header">
                  <div className="price-col">항목</div>
                  <div className="price-col">내용</div>
                  <div className="price-col">금액</div>
                </div>
                <div className="price-row">
                  <div className="price-col">브랜드 사용료</div>
                  <div className="price-col">상표/노하우 포함</div>
                  <div className="price-col price-amount">5,000,000</div>
                </div>
                <div className="price-row">
                  <div className="price-col">구축비용</div>
                  <div className="price-col">2주 설치 포함</div>
                  <div className="price-col price-amount">3,000,000</div>
                </div>
                <div className="price-row">
                  <div className="price-col">인테리어</div>
                  <div className="price-col">평당 170만원(20평 기준)</div>
                  <div className="price-col price-amount">35,000,000</div>
                </div>
                <div className="price-row">
                  <div className="price-col">주방기기</div>
                  <div className="price-col">냉장고, 튀김기, 그릴 등</div>
                  <div className="price-col price-amount">10,000,000</div>
                </div>
                <div className="price-row">
                  <div className="price-col">홀 집기</div>
                  <div className="price-col">테이블, 의자 등 10세트</div>
                  <div className="price-col price-amount">4,000,000</div>
                </div>
                <div className="price-row">
                  <div className="price-col">간판</div>
                  <div className="price-col">메인/서브/간판 포함</div>
                  <div className="price-col price-amount">4,000,000</div>
                </div>
                <div className="price-row">
                  <div className="price-col">소품</div>
                  <div className="price-col">인테리어 소품 포함</div>
                  <div className="price-col price-amount">2,000,000</div>
                </div>
              </div>
            </div>
            <div className="con15-txt2-right"></div>
          </div>
        </div>
        <hr className="green-hr" />
        <hr className="green-hr2" />
      </div>

      <div className="container16">
        <div className="con16-content">
          <div className="con16-txt1-left"></div>
          <div className="con16-txt1-center"></div>

          <div className="con16-txt1-right"></div>

          <div className="consultation-text">
            <div className="text-line1">
              <span className="highlight-red"> 오늘 </span>신청하면,{" "}
              <span className="highlight-red">내일 </span> 전화 갑니다.
            </div>
            <div className="text-line2">
              고민될 때 <span className="red-block2">바로 </span>물어보는 게{" "}
              제일 빠릅니다.
            </div>
            <div className="text-line3">
              1분만에 작성하면,{" "}
              <span className="highlight-red">
                담당자가 직접 연락 드립니다.
              </span>
            </div>
          </div>
        </div>
        <hr className="green-hr" />
        <hr className="green-hr2" />
      </div>

      <div className="container17"></div>

      <div className="container18">
        <div className="con18-content">
          <div className="con18-txt1">이 동네에도 생기면 좋겠다고요?</div>
          <div className="con18-txt2">"여기 생기면 무조건 줄 선다"는 말,</div>
          <div className="con18-txt3">
            그 기회, 지금 당신이 먼저 잡을 수 있어요.
          </div>
          <div className="con18-txt4">
            이제는 민지슈퍼가 <span className="red-block">'내 브랜드'</span> 가
            될 차례입니다.
          </div>
          <div className="con18-content2">
            <div className="con18-txt5">
              줄 서는 거, SNS에 뜨는거, 다 봤죠.
              <br />
              이젠 <span className="green-block">나도 할 수 있겠다</span>는
              마음만 남았습니다.
            </div>
            <div className="con18-txt6">
              위험한 창업은 싫고,
              <br />
              <span className="green-block">이미 검증된 브랜드</span>가
              필요하다면
              <br />
              민지슈퍼는 딱 그 조건에 맞습니다.
            </div>
          </div>
        </div>
      </div>

      <div className="container19"></div>

      {/* 맨 위로 가기 버튼 */}
      {showScrollTop && (
        <button
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          aria-label="맨 위로 가기">
          ↑
        </button>
      )}

      <Inquiry />
    </div>
  );
};

export default MainPage;
