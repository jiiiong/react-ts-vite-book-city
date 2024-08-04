import NavBar from "@/bases/NavBar";
import { useNavigate } from "react-router-dom";

export interface ShelfHeaderProps {
  isEditing: boolean,
  onEditClick: () => void;
}

export function ShelfHeader({
  isEditing,
  onEditClick,
}:ShelfHeaderProps) {
  const navigate = useNavigate()
  return (
    <NavBar
      onBack={()=>navigate(-1)}
      right={
        <span className="text-ygm-m" onClick={onEditClick}>
          {isEditing ? '完成' : '编辑'}
        </span>}
    >
      <div className="text-center">
        我的书架
      </div>
    </NavBar>
  );
}
