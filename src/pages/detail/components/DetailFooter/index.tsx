import { useState } from "react";
import { isShelfed, removeShelf, setShelf } from "@/utils/shelf";
import { useParams } from "react-router-dom";
import { useRequest } from "@/hooks/useRequest";
import { IBookInfo } from "@/types/book";
import { api } from "../../api";

export function DetailFooter() {
  const bookId = useParams().id
  const {data} = useRequest<IBookInfo>({url: api.getBook(bookId as string)})
  const [Shelfed, setShelfed] = useState(isShelfed(bookId));
  function flipShelf() {
    if (!data || !bookId)
      return
    if (Shelfed) {
      removeShelf(bookId)
    }else{
      setShelf(data)
    }
    setShelfed(!Shelfed);
  }
  return (
    // footer box
    <div
      className="
        fixed bottom-[0] left-[0] right-[0]
       bg-ygm-background shadow-[0_4px_24px_rgb(51,51,51,0.4)]
        py-ygm-m px-ygm-l
        flex items-center justify-between
      "
    >
      {/** left button */}
      <div
        className="
          w-[160px]
          text-[25px]
        "
      >
        开始阅读
      </div>
      {/** right button */}
      <div
        className="
          w-[80px] ml-[10px]
          text-[25px]
          flex flex-col items-center justify-center
        "
        onClick={flipShelf}
      >
        <i className={`${Shelfed ? 'icon-checkmark2 text-ygm-primary' : 'icon-checkmark2'}`} />
        <div className={`text-ygm-s ${Shelfed ? 'text-ygm-primary' : ''}`}>加书架</div>
      </div>
    </div>
  );
}
