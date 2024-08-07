import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";

export interface MaskProps {
  visible: boolean;
  onMaskClick?: (e: React.MouseEvent<HTMLDivElement>)=>void;
}

export function Mask({
  visible,
  onMaskClick,
}:MaskProps) {

  const [animationDown, setAnimationDown] = useState(true);

  const {opacity} = useSpring({
    opacity: visible ? 1 : 0,
    config: {
      tension: 250,
      friction: 30,
      clamp: true
    },
    onRest: () => {
      if (visible)
        setAnimationDown(false)
      else
        setAnimationDown(true)
    }
  })

  return (
    <animated.div
      className={`
        h-screen w-screen
        fixed top-[0] left-[0]
        bg-black/55
        ${visible || !animationDown ? '' : 'hidden'}
      `}
      style={{opacity: opacity}}
      onClick={(e)=>{
        e.preventDefault();
        onMaskClick?.(e)
      }}
    />
  );

}
