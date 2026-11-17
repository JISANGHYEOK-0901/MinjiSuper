import React from "react";
import manifest from "../lib/imageManifest.json";

/**
 * AVIF/WebP srcset 을 붙인 이미지.
 *
 * 원본 경로를 그대로 넘기면 매니페스트에서 변형 목록을 찾아 <picture> 로 감싼다.
 * 매니페스트에 없으면 원본을 그대로 쓰는 평범한 <img> 로 동작한다(안전한 폴백).
 *
 * <picture> 에 display:contents 를 주기 때문에 레이아웃 박스를 만들지 않는다.
 * 즉 부모의 flex/grid 계산과 자식의 absolute 위치 지정이 전환 전과 동일하게 유지된다.
 *
 * priority 는 첫 화면에 보이는 이미지에만 준다. lazy 를 끄고 우선순위를 올린다.
 * 나머지는 기본값으로 lazy 가 걸려 초기 전송량을 줄인다.
 */
const ResponsiveImage = ({
  src,
  alt = "",
  className,
  sizes,
  priority = false,
  as,
  ...rest
}) => {
  // framer-motion 의 Motion.img 등을 그대로 끼울 수 있게 한다.
  const Img = as || "img";
  const entry = manifest[src];

  if (!entry) {
    return (
      <Img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...rest}
      />
    );
  }

  const { base, widths, width, height, mobileWidth, desktopWidth } = entry;
  const srcSet = (ext) =>
    widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");

  // Tailwind 의 pc 브레이크포인트(1024px)를 경계로 실제 표시 폭을 알려준다.
  const resolvedSizes =
    sizes ?? `(max-width: 1023px) ${mobileWidth}px, ${desktopWidth}px`;

  return (
    <picture style={{ display: "contents" }}>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={resolvedSizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={resolvedSizes} />
      <Img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        {...rest}
      />
    </picture>
  );
};

export default ResponsiveImage;
