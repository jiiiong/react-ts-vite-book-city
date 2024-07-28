import { useRequest } from "@/hooks/useRequest";
import api from "../../api";
import { IBookInfo } from "@/types/book";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBlock, Space } from "@/bases";
import { px2rem } from "@/utils/unit";
import BookCover from "@/components/book-cover";
import Loading from "@/components/loading";

export interface SearchListProps {
  searchKeyword: string
}

function SearchList({ searchKeyword }: SearchListProps) {

  // 使用 api 获取搜索结果
  const {data, isLoading, error, isValidating, mutate} = useRequest<IBookInfo[]>({
    url: api.getSearchList,
    params: {keyword: searchKeyword},
  })

  useEffect(()=>{
   if (searchKeyword)
    mutate()
  }, [mutate, searchKeyword]);

  const navigate = useNavigate();
  if (error)
    return <ErrorBlock />

  if (isLoading || isValidating)
    return <Loading />

  return (
    <div>
      <div className="p-ygm-s flex flex-col gap-y-ygm-l">
        {data?.map((book)=>(
          <div key={book.bookId} className="" onClick={()=>navigate(`/book/${book.bookId}`)}>
            <Space gap={px2rem(12)}>
              <BookCover src={book.coverImg} alt={book.title}/>
              <Space direction="vertical" gap={px2rem(8)}>
                <div className="text-ygm-l">{book.title}</div>
                <div className="leading-[18px] line-clamp-2 text-ygm-m text-ygm-weak">{book.desc}</div>
                <div className="text-ygm-s text-ygm-weak">{book.author}·{book.categoryName}</div>
              </Space>
            </Space>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchList;
