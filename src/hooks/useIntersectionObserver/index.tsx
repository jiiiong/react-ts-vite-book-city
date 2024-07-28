import React, { useEffect, useState } from "react";



function useItersectionObserver(
  targetRef: React.RefObject<Element | null>,
  { threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false
  } = {}
) {

  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const fronzon = freezeOnceVisible && entry?.isIntersecting;





  useEffect(()=>{
    // 元素尚不存在
    const element = targetRef.current;
    if (!element || fronzon) return;

    // 创建监视器，config、回调
    const observerParams = {threshold, root, rootMargin};
    const ob = new IntersectionObserver(([entry]:IntersectionObserverEntry[])=>{
      setEntry(entry);
    }, observerParams)

    // 监视元素
    ob.observe(element);
    return () => {ob.disconnect()};

  }, [fronzon, root, rootMargin, targetRef, threshold]);

  return entry;
}

export default useItersectionObserver;
