import { ReactNode } from "react";

export interface SidebarItemProps {
  key: string;
  title: ReactNode;
  children: ReactNode;
}

export default function SidebarItem({
  children,
}:SidebarItemProps) {
  return children ? (children) : null;
}
