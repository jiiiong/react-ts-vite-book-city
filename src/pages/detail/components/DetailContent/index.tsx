import { useRequest } from "@/hooks/useRequest";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import { IBookInfo } from "@/types/book";

export function DetailContent() {
  const bookId = useParams().id;
  const {data} = useRequest<IBookInfo>({url: api.getBook(bookId as string)});
  return (
    <div className="p-[16px_16px_79px_16px]">
      {/** header */}
      <div
        className="mb-ygm-m leading-[1.2] text-ygm-xl font-normal"
      >
        {data?.chapterInfo?.chapterName}
      </div>
      {/** ps */}
      {data?.chapterInfo?.content.map((chapter, index)=>(
        <p key={index} className="
          text-ygm-m leading-[33px] text-ygm-weak indent-[2em]
        ">
          {chapter}
        </p>
      ))}

    </div>
  );
}
