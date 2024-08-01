import {  useLayoutEffect, useRef, useState } from "react";

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
  const [ellipsisedText, setEllipsisedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const tailingEllipsis = ' ... ';

  // 创建一个镜像 container，调整其内部的 text，直到符合行数；
  useLayoutEffect(()=>{
    const oriStyles = window.getComputedStyle(containerRef.current!)
    const lineHeight = parseFloat(oriStyles.lineHeight)
    const actualHeight = parseFloat(oriStyles.height)
    const actual_row = Math.round(actualHeight/lineHeight)

    console.log(actual_row, col);
    if (actual_row > col) {
      // 克隆
      const container = document.createElement('div');
      for (const [key, value] of Object.entries(oriStyles)) {
        container.style.setProperty(key, value)
      }
      container.style.height = 'auto';
      container.style.position = 'fixed';
      container.style.visibility = 'hidden';
      const oriText = containerRef.current!.innerText;
      document.body.appendChild(container)

      // 用二分法找符合标准的字数
      let l = 0;
      let r = oriText.length-1;
      let maxIndex = -1
      while (l < r) {
        const mid = Math.floor((l + r)/2);
        const candidateText = oriText.slice(0, mid+1) + tailingEllipsis + expand;
        container.innerText = candidateText;

        const candidateHeight = container.getBoundingClientRect().height;
        if (Math.round(candidateHeight/lineHeight) > col)
          r = mid - 1;
        else{
          maxIndex = mid
          l = mid + 1
        }
      }
      setMode('colapsed');
      setEllipsisedText(oriText.slice(0, maxIndex));
      container.remove()
    }
  }, [col, expand]);

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
