import api from "../../api";
import { useRequest } from "@/hooks/useRequest";

export interface SearchHotProps {
  onItemClick?: (val: string) => void;
}


export default function SearchHot({
  onItemClick,
}: SearchHotProps) {

  // 使用 api 获取搜索结果
  const {data, isLoading, error} = useRequest<string[]>({
    url: api.getHotSearch
  })

  if (error || isLoading)
    return null

  return (
    <div className="px-ygm-xs flex flex-col">
      <div className="text-ygm-xl">热门搜索</div>
      <div className="py-ygm-s flex flex-wrap gap-x-ygm-xl gap-y-ygm-m">
        {data!.map((item)=>(
          <div
            key={item}
            className="px-ygm-s py-ygm-xs bg-ygm-box rounded-ygm-s"
            onClick={()=>(onItemClick && onItemClick(item))}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

