import { useResizeObserver } from "@/hooks/useResizeObserver";
import {   useCallback, useLayoutEffect, useRef, useState } from "react";

export interface EllipsisProps {
  text: string;
  col?: number;
  expand?: string;
  collapse?: string;
}
export function Ellipsis({
  text,
  col = 1,
  expand='',
  collapse='',
}:EllipsisProps) {
  const [mode, setMode] = useState<'normal'|'expanded'|'colapsed'>('normal');
  // const []
  const [ellipsisedText, setEllipsisedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const tailingEllipsis = ' ... ';

  // 同步 container resize；
  useResizeObserver(()=>{
      calcEllipsised()
  }, containerRef);

  // 计算 text 在 dom 中是否溢出
  // 并设置状态
  const calcEllipsised = useCallback(() => {

    // 创建一个内容为完整 text 的 container；
    // 样式与实际的 container 保持一致
    const container = document.createElement('div');
    const oriStyles = window.getComputedStyle(containerRef.current!)
    for (const [key, value] of Object.entries(oriStyles)) {
      container.style.setProperty(key, value)
    }
    container.style.height = 'auto';
    container.style.position = 'fixed';
    container.style.visibility = 'hidden';
    container.innerHTML = text
    document.body.appendChild(container)

    const lineHeight = parseFloat(oriStyles.lineHeight)
    const actualHeight = container.getBoundingClientRect().height
    const actual_row = Math.round(actualHeight/lineHeight)

    if (actual_row > col) {
      // 用二分法找符合标准的字数
      let l = 0;
      let r = text.length-1;
      let maxIndex = -1
      while (l < r) {
        const mid = Math.floor((l + r)/2);
        const candidateText = text.slice(0, mid+1) + tailingEllipsis + expand;
        container.innerText = candidateText;

        const candidateHeight = container.getBoundingClientRect().height;
        if (Math.round(candidateHeight/lineHeight) > col)
          r = mid - 1;
        else{
          maxIndex = mid
          l = mid + 1
        }
      }
      setEllipsisedText(text.slice(0, maxIndex));
      if (mode === "normal")
        setMode('colapsed');
    } else {
      setMode('normal');
    }
    container.remove()
  },[col, expand, text])

  // 刚 mount 时触发
  useLayoutEffect(()=>{
    calcEllipsised()
  }, [calcEllipsised]);

  function renderText() {
    switch (mode){
      case 'normal': {
        return <>{text}</>;
      }
      case 'expanded': {
        return (
          <>
            {text}
            {'  '}
            {collapse !== '' && <a className="underline text-blue-500" onClick={()=>setMode('colapsed')}>{collapse}</a>}
          </>);
      }
      case 'colapsed': {
        return (
          <>
            {ellipsisedText}
            {tailingEllipsis}
            {expand !== "" && <a className="underline text-blue-500" onClick={()=>{setMode('expanded')}}>{expand}</a>}
          </>
        );
      }
    }
  }

  return (
    <div ref={containerRef}>{renderText()}</div>
  );

}
