import { useSpring, animated } from "@react-spring/web";
import { ReactNode } from "react";
import cx from "classnames";
import { Mask } from "../mask";
export interface PopupProps {
  position?: 'left';
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
    <div className={`z-${zIndex}`}>
      {mask && <Mask visible={visible} onMaskClick={onMaskClick}></Mask>}
      <animated.div
        className={cx("fixed",
          {
          "h-screen top-[0] left-[0]": position === "left",
        })}
        style={{
          transform: percent.to((v) => {
            // left
            return `translate(-${v}%,0)`;
          }),
        }}
      >
        {children}
      </animated.div>
    </div>

  );
}
