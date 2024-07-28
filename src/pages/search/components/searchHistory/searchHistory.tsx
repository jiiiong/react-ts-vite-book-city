import { useReadLocalStorage } from "@/hooks/useReadLocalStorage";
import { HISTORY_SEARCH_LIST } from "../../constants";
import { clearHistroy, deleteHistory } from "../../utils";

export interface SearchHotProps {
  onItemClick?: (val: string) => void;
}


export default function SearchHistory({
  onItemClick,
}: SearchHotProps) {
  const data = useReadLocalStorage<string[]>(HISTORY_SEARCH_LIST);
  return (
    <div className="px-ygm-xs">
      <div className="flex justify-between">
        <div className="text-ygm-xl">搜索历史</div>
        <div className='flex items-center' onClick={
          clearHistroy
        }><i className="icon-bin text-ygm-weak text-ygm-l"></i></div>
      </div>

      <div className="py-ygm-s flex flex-col gap-y-ygm-xl">
        {data && data.map((item)=>(
          <div
            key={item}
            className="flex justify-between items-center text-ygm-l"
          >
            <div onClick={()=>(onItemClick && onItemClick(item))}>{item}</div>
            <i
              className="icon-cross text-ygm-weak text-ygm-s pr-[2px] size"
              onClick={()=>{
                deleteHistory(item)
              }}
            ></i>

          </div>
        ))}
      </div>
    </div>
  );
}

