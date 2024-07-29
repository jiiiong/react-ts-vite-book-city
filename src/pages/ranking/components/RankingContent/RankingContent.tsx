import {ErrorBlock, Sidebar} from "@/bases";
import { useRequest } from "@/hooks/useRequest";
import { api } from "../../api";
import Loading from "@/components/loading";
import { IRanking } from "../../types";
import { TAB_DEFAULT_KEY } from "../constants";
import RankingBookList from "../RankingBookList/BookList";

export interface RankingContentProps {
  tabKey: string;
}

function RankingContent({
  tabKey,
}:RankingContentProps) {
  const {data, isLoading, error}= useRequest<IRanking>({url: api.ranking})

  if (error)
    return <ErrorBlock />
  if (isLoading)
    return <Loading />

  return (
    <Sidebar defaultActiveKey={data![TAB_DEFAULT_KEY][0].key}>
      {
        data![(tabKey as ('male'|'female'))].map((item)=>(
          <Sidebar.Item key={item.key} title={item.shortTitle}>
            <RankingBookList gender={tabKey as ('male'|'female')} id={item.key}/>
          </Sidebar.Item>
        ))
      }
    </Sidebar>
  );
}

export default RankingContent
