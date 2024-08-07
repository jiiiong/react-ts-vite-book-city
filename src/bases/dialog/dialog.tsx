import { ReactNode } from "react";
import { DialogButton, DialogButtonProps } from "./action";
import { Mask } from "../mask";
import { useSpring, animated } from "@react-spring/web";

export interface DialogProps {
  visible: boolean;
  title?: string;
  content?: ReactNode;
  buttons?: DialogButtonProps[];
  closeOnACtion?: boolean;
  unMount?: ()=>void;
  onMaskClick?: () => void;
  onClose?: () => void;
  onButton?: (buttonProp: DialogButtonProps, index: number) => void | Promise<void>;
}

export function Dialog({
  visible,
  title,
  content,
  buttons,
  onMaskClick,
  unMount,
  closeOnACtion = true,
  onClose,
  onButton,
}:DialogProps) {

  const springStyle = useSpring({
    scale: visible ? 1 : 0.8,
    opacity: visible ? 1 : 0,
    config: {
      mass: 2.2,
      tension: 200,
      friction: 25,
      clamp: true,
    }
  });

  return (
    // dialog box
    <div className={`${visible ? "" : "hidden"} relative z-[100]`}>
      <Mask visible={visible} onMaskClick={onMaskClick} />
      {/** dialog */}

      <div
        className="
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        "
      >
        <animated.div style={springStyle}>
          <div
            className="
          min-w-[280px] max-w-[75%] max-h-[70%]
          bg-white rounded-ygm-xl overflow-hidden
        "
          >
            <div
              className="
          py-[26px] px-ygm-m overflow-y-auto
          flex flex-col items-center gap-y-ygm-m
        "
            >
              {/** title */}
              {title && <div className="text-ygm-xl">{title}</div>}
              {/** content */}
              {content && (
                <div className="overflow-x-hidden overflow-y-auto text-ygm-l">
                  {content}
                </div>
              )}
            </div>
            {/**footer */}
            {buttons && (
              <div
                className="
              self-stretch border-solid border-y-ygm-box border-y-[1.5px] text-ygm-m
              flex justify-between"
              >
                {buttons.map(({ key, ...buttonProp }, index) => (
                  <div
                    className={`flex-1 border-solid border-r-ygm-box border-r-[1.5px] last:border-r-0`}
                  >
                    <DialogButton
                      key={key}
                      {...buttonProp}
                      onClick={async () => {
                        await Promise.all([
                          buttonProp.onClick?.(key),
                          onButton?.({ key, ...buttonProp }, index),
                        ]);
                        if (closeOnACtion)
                          onClose?.()
                          unMount?.()
                      }}
                    ></DialogButton>
                  </div>
                ))}
              </div>
            )}
          </div>
        </animated.div>
      </div>
    </div>
  );
}
