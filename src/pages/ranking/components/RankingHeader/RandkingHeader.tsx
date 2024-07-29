import NavBar from "@/bases/NavBar";
import { Tabs } from "@/bases";
import { px2rem } from "@/utils/unit";
import { useNavigate } from "react-router-dom";
import {TABS } from "../constants";

interface RankingHeaderProps {
  defaultTabKey: string;
  onTabChange?: (key: string) => void;
}

function RankingHeader({ defaultTabKey, onTabChange }: RankingHeaderProps) {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar
        onBack={() => navigate(-1)}
        style={{
          height: `${px2rem(45)}`,
        }}
      >
        <Tabs activeKey={defaultTabKey} showTabLine={true} onChange={onTabChange}>
          {TABS.map((item) => (
            <Tabs.Tab key={item.key} title={item.name} />
          ))}
        </Tabs>
      </NavBar>
    </div>
  );
}

export default RankingHeader;
