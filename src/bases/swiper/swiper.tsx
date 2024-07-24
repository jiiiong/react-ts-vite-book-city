import React, {
  useRef,
  useState,
  PropsWithChildren,
  Children,
  useEffect,
  useCallback,
} from "react";

import styles from "./styles/swiper.module.scss";
import SwiperPageIndicator from "./swiper-indicator";

export interface SwiperProps {
  // 默认显示第几张
  defaultIndex?: number;
  // 是否循环播放
  loop?: boolean;
  // 是否自动播放
  autoPlay?: boolean;
  autoPlayInterval?: number;
  // 是否显示指示器
  showIndicator?: boolean;
  // 自定义样式
  style?: React.CSSProperties &
    Partial<Record<"--height" | "--width" | "--border-radius", string>>;
}

function Swiper({
  children,
  defaultIndex = 0,
  showIndicator = true,
  loop = true,
  autoPlay = true,
  autoPlayInterval = 3000,
  style,
}: PropsWithChildren<SwiperProps>) {

  // 当前轮播图的 index
  const [currentIndex, setCurrentIndex] = useState<number>(defaultIndex || 0);
  const [dragging, setDragging] = useState<boolean>(false);

  // 鼠标坐标
  const startXRef = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<boolean>(false);

  const childCount = Children.count(children);


  const boundIndex = useCallback((index: number) => {
    return Math.min(childCount - 1, Math.max(0, index));
  }, [childCount])

  const calcIndex = useCallback((index: number) => {
    if (loop) {
      const nextIndex = index % childCount
      return  nextIndex < 0 ? (nextIndex + childCount) : nextIndex;
    }
    return boundIndex(index);
  }, [boundIndex, childCount, loop]);

  useEffect(() => {
    if (!autoPlay || dragging) return;

    const intervalID = setInterval(() => {
      autoPlayRef.current = true;
      setCurrentIndex((x) => calcIndex(x+1));
    }, autoPlayInterval);

    return () => clearInterval(intervalID);
  }, [autoPlay, dragging, autoPlayInterval, calcIndex]);

  function handleTouchEnd(e: TouchEvent) {
    const diff = startXRef.current - e.changedTouches[0].clientX;
    let ratioedDiff = 0;
    if (trackRef.current) {
      ratioedDiff = diff / trackRef.current.offsetWidth;
    }
    setCurrentIndex(Math.round(calcIndex(currentIndex + ratioedDiff)) % childCount);
    trackRef.current!.removeEventListener("touchmove", handleTouchMove as EventListener);
    trackRef.current!.removeEventListener("touchend", handleTouchEnd as EventListener);
    setDragging(false);
  }

  function handleTouchMove(e: TouchEvent) {
    const diff = startXRef.current - e.changedTouches[0].clientX;
    let ratioedDiff = 0;
    if (trackRef.current) {
      ratioedDiff = diff / trackRef.current.offsetWidth;
    }
    setCurrentIndex(calcIndex(currentIndex + ratioedDiff));
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    startXRef.current = e.changedTouches[0].clientX;
    autoPlayRef.current = false;
    trackRef.current!.addEventListener("touchmove", handleTouchMove);
    trackRef.current!.addEventListener("touchend", handleTouchEnd);
    setDragging(true);
  }

  // 平铺图片
  function getFinalPosition(index: number) {

    let indexPosition =  (index - currentIndex) * 100;

    if (!loop)
      return indexPosition

    const totalWidth = childCount * 100;
    const halfWidth = totalWidth / 2;

    indexPosition = (indexPosition + halfWidth) % totalWidth
    if (indexPosition < 0)  indexPosition += totalWidth
    indexPosition -= halfWidth

    return indexPosition

  }

  function getTransition(position: number) {
    if (dragging)
      return '';
    else if (autoPlayRef.current) {
      if (position === 0 || position === -100)
        return 'transform .3s ease-out';
      else
        return '';
    }
    else if (position < -100)
      return '';
    return 'transform .3s ease-out';
  }

  // 渲染轮播图
  function renderChildren() {
    return (
      <div
        className={styles.track}
        ref={trackRef}
        onTouchStart={handleTouchStart}
      >
        {Children.map(children, (child, index) => {
          const position = getFinalPosition(index);
          return (
            <div
              className={styles.slide}
              style={{
                left: `-${index * 100}%`,
                transform: `translateX(${position}%)`,
                transition: getTransition(position),
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={styles.swiper}
      style={style}
    >
      {renderChildren()}
      <div className={styles.indicator}>
        {showIndicator && (
          <SwiperPageIndicator
            currentIndex={(Math.round(calcIndex(currentIndex)) % childCount)}
            total={childCount}
          />
        )}
      </div>
    </div>
  );
}

export default Swiper;
