import React, { CSSProperties, forwardRef, useImperativeHandle, useRef, useState } from "react";
import cx from 'classnames';
import { getValueByScope } from "@/utils/utils";

export interface SliderRef {
  setValue: (value: number) => void;
}

interface SliderProps {
  min?: number;
  max?: number;
  initValue?: number;
  step?: number;

  disabled?: boolean;
  onChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;

  style?: CSSProperties;
}

export const Slider = forwardRef<SliderRef, SliderProps>(({
  min = 0,
  max = 100,
  step = 1,
  initValue = 0,
  disabled = false,
  onChange,
  onAfterChange,
}: SliderProps, ref) => {

  function getRegularedValue(v: number) {
    const clampedVal = getValueByScope(v, min, max);
    return (Math.round(clampedVal/step) * step);
  }

  const [value, setValue] = useState(getRegularedValue(initValue));
  const valueRef = useRef(0);
  valueRef.current = value;

  useImperativeHandle(ref, ()=>(
    {
      setValue: (value) => {
        setValue(getRegularedValue(value))
      }
    })
  )

  const position = (value - min) / (max - min) * 100;

  const trackRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);
  const startXRef = useRef(0);

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    const track = trackRef.current!;
    // 获得相较于 viewport 的位置
    const rect = track.getBoundingClientRect()
    const width = rect.width;
    const startX = rect.left;
    const deltaX = e.clientX - startX;
    const position = getRegularedValue((deltaX / width)*(max-min+1) + min);
    setValue(position);
    onChange?.(position);
    onAfterChange?.(position);
  }

  const isDragging = useRef(false);

  function handleMouseMove(e: MouseEvent) {
    if (isDragging.current){
      const deltaX = e.clientX - startXRef.current;
      const total = trackRef.current!.offsetWidth;
      let curVal = (deltaX / total) * (max - min + 1);
      curVal += startPosRef.current;
      curVal = getRegularedValue(curVal);
      setValue(curVal);
      onChange?.(curVal);
    }
  }

  function handleMouseUp() {
    const value = valueRef.current;
    console.log('upup', value)
    onAfterChange?.(value);
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp)
  }

  function handleMouseDown(e: React.MouseEvent) {
    startXRef.current = e.clientX;
    startPosRef.current = value;
    isDragging.current = true
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp)
  }

  function handleTouchStart(e: React.TouchEvent) {
    startXRef.current = e.touches[0].clientX;
    startPosRef.current = value;
  }

  function handleTouchMove(e: React.TouchEvent) {
    const deltaX = e.touches[0].clientX - startXRef.current;
    const total = trackRef.current!.offsetWidth;
    let curVal = (deltaX / total) * (max - min + 1);
    curVal += startPosRef.current;
    curVal = getRegularedValue(curVal);
    setValue(curVal);
    onChange?.(curVal);
  }

  function handleTouchEnd() {
    onAfterChange?.(value);
  }

  return (
    // slider
    <div
      className={cx(
        "h-[2px] w-full bg-[#ebedf0] relative",
        {
          'opacity-40': disabled,
        }
      )}
      ref={trackRef}
      onClick={disabled ? undefined : handleTrackClick}
    >

      {/** fill */}
      <div className="h-[2px] absolute left-[0] bg-ygm-primary"
        style={{width: `${position}%`}}
      >
      </div>

      {/** thumb */}
      <div className="
        w-[24px] h-[24px]
        bg-ygm-background rounded-[50%] shadow-[0_1px_2px_rgba(0,0,0,0.5)]
        absolute top-1/2 -translate-y-1/2 -translate-x-1/2
        cursor-grab
      "
        style={{left: `${position}%`}}
        onTouchStart={disabled ? undefined : handleTouchStart}
        onTouchMove={disabled ? undefined : handleTouchMove}
        onTouchEnd={disabled ? undefined : handleTouchEnd}
        onMouseDown={disabled ? undefined : handleMouseDown}
        onClick={(e)=>{e.stopPropagation()}}
      >
      </div>
    </div>
  );
})
