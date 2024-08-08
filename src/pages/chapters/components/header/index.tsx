import NavBar from "@/bases/NavBar";
import { Popup } from "@/bases/popup";
import { useNavigate } from "react-router-dom";

export function ChapterHeader({visible}:{visible:boolean}) {
  const navigate = useNavigate()
  return (
    <Popup visible={visible} mask={false} position="top">
      <NavBar
        onBack={() => navigate(-1)}
        right={
          <i
            className="icon-home text-[20px] text-ygm-weak"
            onClick={() => navigate("/")}
          />
        }
      >
        {" "}
      </NavBar>
    </Popup>
  );
}
