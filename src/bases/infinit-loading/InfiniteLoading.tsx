import { ReactNode, useEffect, useRef } from "react";
import SpinnerLoading from "../spinner-loading";
import useItersectionObserver from "@/hooks/useIntersectionObserver";

export interface InfinitLoadingProps {
  hasMore: boolean;
  loadMore: () => Promise<void>;
  footer?: ReactNode;
  children: ReactNode
}

export default function InfiniteLoading({
  hasMore,
  loadMore,
  footer,
  children,
}:InfinitLoadingProps) {

  const footerRef = useRef<HTMLDivElement>(null);
  const {entry} = useItersectionObserver(footerRef); // freeOnceVisible = false
  // useEffectEvent
  const effectEventRef = useRef<() => Promise<void>>();
  effectEventRef.current = async () => {
    if (!hasMore)
      return;
    await loadMore();
  }, [loadMore]


  // 当相交时，如果 hasMore，那么 loadMore
  // 当 loadmore 异步执行时，新的 loadmore 又会触发 effect；
  // 当 loadMore 异步执行完毕时，DOM 还没更新，entry 仍然为 true，导致再次请求；
  useEffect(()=>{
    if (!entry?.isIntersecting) return;
    effectEventRef.current?.();
  }, [entry?.isIntersecting]);

  return (
    <div className="relative">
      {children}
      <div
        className="
          text-ygm-m p-ygm-s text-ygm-weak
          flex justify-center items-center
        "
        ref={footerRef}
      >
        {footer && footer}
        {!footer && hasMore ? <SpinnerLoading size={16}/> : ''}
      </div>
    </div>
  );
}
