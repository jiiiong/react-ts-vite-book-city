import { Ellipsis, Space } from "@/bases";
import BookCover from "@/components/book-cover";
import { useRequest } from "@/hooks/useRequest";
import { api } from "@/pages/detail/api";
import { IBookInfo } from "@/types/book";
import { px2rem } from "@/utils/unit";
import { useParams } from "react-router-dom";

export function DetailInfo() {
  const bookId = useParams().id as string
  const {data} = useRequest<IBookInfo>({url: api.getBook(bookId)})

  return (
    <div className="pb-ygm-l font-sans">
      <Space gap={px2rem(12)}>
        <BookCover
          src={data!.coverImg}
          alt={data!.title}
          style={{ "--width": px2rem(84), "--height": px2rem(112) }}
        ></BookCover>
        <Space direction="vertical" justify="center" gap={px2rem(10)}>
          <div className="text-ygm-l font-bold leading-[30px]">
            {data!.title}
          </div>
          <div className="text-ygm-m leading-none">{data!.author}</div>
          <div className="text-ygm-m leading-none">
            {data!.categoryName}
            {" / "}
            {data!.minorCate}
          </div>
          <div className="text-ygm-m leading-none">
            {data!.wordCount && `${data!.wordCount / 10000} 万字 / `}
            {data!.isSerial ? "连载中" : "已完结"}
          </div>
        </Space>
      </Space>
      <div className="pt-[32px] text-ygm-m">
        <Ellipsis text={data!.desc} col={3} expand="展开" collapse="收起"></Ellipsis>
      </div>
    </div>
  );
}
