import { useRequest } from "@/hooks/useRequest";
import { IBookInfo } from "@/types/book";
import { api } from "../../api";
import { ErrorBlock, Space } from "@/bases";
import Loading from "@/components/loading";
import { useNavigate } from "react-router-dom";
import { px2rem } from "@/utils/unit";
import BookCover from "@/components/book-cover";

export interface RankingBookListProps {
  gender: 'male' | 'female';
  id: string;
}

function RankingBookList({
  gender,
  id,
}:RankingBookListProps) {

  const {data, isLoading, error}= useRequest<IBookInfo[]>({url: api.getBookList(gender, id)})
  const navigate = useNavigate();

  if (error)
    return <ErrorBlock />
  if (isLoading)
    return <Loading />

  return (
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
  );
}

export default RankingBookList;
