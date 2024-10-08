import { useSpring, animated } from "@react-spring/web";
import { ReactNode } from "react";
import cx from "classnames";
import { Mask } from "../mask";
export interface PopupProps {
  position?: 'left' | 'bottom' | 'top';
  visible: boolean;
  mask?: boolean;
  children: ReactNode;
  zIndex?: number;
  afterShow?: ()=>void;
  afterClose?: ()=>void;
  onMaskClick?: ()=>void;
}

export function Popup({
  position='left',
  visible,
  mask=true,
  children,
  zIndex=50,
  afterShow,
  afterClose,
  onMaskClick,
}:PopupProps) {
  const {percent} = useSpring({
    percent: visible ? 0 : 101,
    config: {
      percision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30,
    },
    onRest: () => {
      if (visible) {
        afterShow?.();
      } else {
        afterClose?.();
      }
    }
  })
  return (
    <div className={`relative z-${zIndex}`}>
      {mask && <Mask visible={visible} onMaskClick={onMaskClick}></Mask>}
      <animated.div
        className={cx("fixed",
          {
          "h-screen top-[0] left-[0]": position === "left",
          "w-screen bottom-[0] left-[0]": position === "bottom",
          "w-screen top-[0] left-[0]" : position === 'top',
        })}
        style={{
          transform: percent.to((v) => {
            // left
            if (position === 'left')
              return `translate(-${v}%,0)`;
            // bottom
            else if(position === 'bottom')
              return `translateY(${v}%)`;
            // top
            else {
              return `translateY(-${v}%)`;
            }
          }),
        }}
      >
        {children}
      </animated.div>
    </div>

  );
}
