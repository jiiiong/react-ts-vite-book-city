import { RefObject, useEffect } from "react";

export function useResizeObserver<T extends HTMLElement>(callback:(target: T)=>void, targetRef:RefObject<T>) {
  // 监听 target 元素的 resize；
  // 变化时调用 callback
  useEffect(()=>{
    const element = targetRef.current;
    // 如果目标 dom元素 不存在；则监听
    if (!element)
      return
    // web api 存在（web 对于 react 来说是外部系统）
    if (window.ResizeObserver){
      const resizeObserver = new ResizeObserver(()=>callback(element))
      resizeObserver.observe(element)
      return ()=>resizeObserver.disconnect()
    }

  }, [callback, targetRef]);

}
