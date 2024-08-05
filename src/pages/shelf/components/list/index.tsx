import { ReactNode } from "react";

interface ShelfListProps {
  children: ReactNode;
}

export function ShelfList(
  {
    children,
  }
: ShelfListProps) {

  return (
    // grid
    <div
      className="
        grid grid-cols-3 gap-[20px]
      "
    >
      {children}
    </div>
  );
}
