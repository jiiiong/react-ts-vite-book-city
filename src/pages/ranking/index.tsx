import { useState } from "react";
import RankingHeader from "./components/RankingHeader/RandkingHeader";
import { TAB_DEFAULT_KEY } from "./components/constants";
import RankingContent from "./components/RankingContent/RankingContent";

function Ranking() {
    const [tabKey, setTabKey] = useState(TAB_DEFAULT_KEY);

    return (
      <div className="h-screen flex flex-col">
        <div className="flex-initial">
          <RankingHeader defaultTabKey={tabKey} onTabChange={(key)=>(setTabKey(key))}/>
        </div>
        <div className="flex-1 overflow-hidden">
          <RankingContent tabKey={tabKey}/>
        </div>
      </div>
    );
}

export default Ranking;
