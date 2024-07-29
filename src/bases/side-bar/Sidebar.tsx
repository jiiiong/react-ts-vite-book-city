import { isValidElement, ReactElement, ReactNode, useState } from "react";
import { traverReactNode } from "../utils";
import SidebarItem, { SidebarItemProps } from "./SidebarItem";

export interface SidebarProps {
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  children?: ReactNode;
}

function Sidebar({
  defaultActiveKey,
  onChange,
  children,
}:SidebarProps) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const tabs: ReactElement<SidebarItemProps, typeof SidebarItem>[]  = []
  traverReactNode(children, (child)=>{
    if (!isValidElement(child)) return;
    if (!child.key) return;
    tabs.push((child as ReactElement<SidebarItemProps, typeof SidebarItem>));
  })

  return (
    /** box */
    <div className="h-full flex text-ygm-xl">
      {/**tabs */}
      <div
        className="
          h-full w-[80px] bg-ygm-box
          flex-col
          overflow-y-auto
        "
      >
        {/* item */}
        {tabs.map((item) => (
          <div
            className={`
              w-full cursor-pointer p-ygm-s
              text-center text-nowrap overflow-hidden overflow-ellipsis
            ${item.key === activeKey ? "bg-white" : ''}`}
            onClick={()=>{
              setActiveKey(item.key!);
              onChange?.(item.key!)
            }}
          >
            {item.props.title}
          </div>
        ))}
      </div>
      {/**content */}
      <div
        className="
          h-full flex-1 relative
          overflow-x-hidden
          overflow-y-auto
        "
      >
        {tabs.map((item)=>(
          item.key === activeKey &&
          <>{item}</>
        ))}
      </div>
    </div>
  );


}

export default Sidebar;
