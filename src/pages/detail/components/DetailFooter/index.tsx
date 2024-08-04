import { useState } from "react";
import { isShelfed, removeShelf, setShelf } from "@/utils/shelf";
import { useNavigate, useParams } from "react-router-dom";
import { useRequest } from "@/hooks/useRequest";
import { IBookInfo } from "@/types/book";
import { api } from "../../api";
import { Toast } from "@/bases";

export function DetailFooter() {
  const navigate = useNavigate();
  const bookId = useParams().id
  const {data} = useRequest<IBookInfo>({url: api.getBook(bookId as string)})
  const [Shelfed, setShelfed] = useState(isShelfed(bookId));
  function flipShelf() {
    if (!data || !bookId)
      return
    if (Shelfed) {

      Toast.show('已从书架中移除');
      removeShelf(bookId)
    }else{
      Toast.show('已加入书架');
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
        flex  justify-between
      "
    >
      {/** left button */}
      <div
        className="
          flex-1
          bg-ygm-primary rounded-ygm-s
          text-ygm-xxl text-white
          flex items-center justify-center
        "
        onClick={()=>{navigate(`/book/${bookId}/1`)}}
      >
        开始阅读
      </div>
      {/** right button */}
      <div
        className="
          w-[48px] ml-[10px]
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
