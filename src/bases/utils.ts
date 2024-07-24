import React, { ReactNode } from "react";
import { isFragment } from "react-is";

export function traverReactNode(
  children: ReactNode,
  fn: (node: ReactNode, index: number) => void,
) {

  function helper(children: ReactNode) {
    React.Children.forEach(children, (child)=>{
      if (isFragment(child)) {
        helper(child.props.children);
      } else {
        fn(child, i);
        i += 1;
      }
    });
  }
  let i = 0;
  helper(children);
}
