import { CSSProperties, ReactNode } from "react";
export interface NavBarProps {
  onBack?: ()=>void;
  right?: ReactNode;
  leftArrow?: boolean;
  leftText?: string;
  children: ReactNode;
  style?: CSSProperties;
}
function NavBar({
  onBack,
  right,
  leftArrow=true,
  leftText='',
  children,
  style,
}:NavBarProps) {
  return (
    /* box */
    <div
      className="
        bg-ygm-background px-ygm-l
        flex items-center justify-between gap-x-ygm-s
        text-ygm-xl whitespace-nowrap"
      style={{...style}}
    >
        {/* left */}
        <div
          className="
            flex-initial
            flex items-center gap-x-ygm-xs"
          onClick={onBack}
        >
          {leftArrow &&
            <i
              className="icon-arrow-left2 text-ygm-weak"
            ></i>
          }
          {leftText}
        </div>
        {/* mid */}
        <div className="flex-auto overflow-hidden overflow-ellipsis">{children}</div>
        {/* right */}
        <div className="flex-initial">{right}</div>
    </div>
  );
}

export default NavBar;
