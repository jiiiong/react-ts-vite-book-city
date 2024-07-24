import { ReactNode } from "react";

export interface TabProps {
  key: string;
  title: string;
  children?: ReactNode;
}

function Tab({children}: TabProps) {
  return (children ? (children) : null  )
}

export default Tab;
