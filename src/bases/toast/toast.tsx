import { useEffect } from "react";
import SpinnerLoading from "../spinner-loading";

export interface ToastProps {
  duration?: number,
  content?: string,
  icon?: 'loading';
  onClose?: () => void;
  unmount?: () => void;
}

export function Toast({
  duration=800,
  content,
  icon,
  onClose,
  unmount
}:ToastProps) {
  useEffect(()=>{
    const timer = setTimeout(()=>{
      onClose?.()
      unmount?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose, unmount]);
  return (
    // full mask
    <div
      className="
        fixed top-[0] left-[0]
        h-full w-full
        select-none
        z-50
        flex justify-center items-center
      "
    >
      {/** content area */}
      <div
        className="
          min-w-[96px] max-w-[70%] max-h-[70%] overflow-auto
          bg-black/70 rounded-ygm-m text-white
          p-ygm-m
        "
      >
        {/** icon */}
        {icon && (
          <div
            className={`
              ${!content ? "py-[18px] px[23px]" : "mb-[8px]"}
               flex items-center justify-center`
            }
          >
            <SpinnerLoading size={36} />
          </div>
        )}

        {/** text */}
        { content &&
          <div
            className="
            text-ygm-m leading-normal  break-all
            text-center
          "
          >
            {content}
          </div>
          }
      </div>
    </div>
  );
}
