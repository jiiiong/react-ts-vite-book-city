import { Space } from "@/bases";
import { Popup } from "@/bases/popup";
import { BookCatelogList } from "@/components/book-catelogList";
import { useRequest } from "@/hooks/useRequest";
import { api } from "@/pages/detail/api";
import { IBookInfo } from "@/types/book";
import { px2rem } from "@/utils/unit";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export function DetailCatelog() {

  const bookId = useParams().id as string
  const {data} = useRequest<IBookInfo>({url: api.getBook(bookId)})
  const [popup, setPopup] = useState(false);
  const latestThree = useMemo(()=>data?.chapters?.slice(-3).reverse(), [data?.chapters]);

  return (
    <>
      <div className="mb-ygm-l flex justify-between items-center text-ygm-m">
        <div className="flex-1">
          <Space direction="vertical" gap={px2rem(0)}>
            {latestThree?.map((item) => (
              <div key={item} className="line-clamp-1">
                {item}
              </div>
            ))}
          </Space>
        </div>
        <div
          className="
          h-[62px] w-[46px] bg-ygm-box rounded-ygm-m
          text-ygm-s
          flex flex-col items-center justify-center
        "
          onClick={() => {
            setPopup(!popup);
          }}
        >
          <i className="icon-menu text-ygm-weak text-ygm-xxxl mb-ygm-xs"></i>
          <div className="">目录</div>
        </div>
        <Popup visible={popup} onMaskClick={()=>setPopup(false)}>
          <BookCatelogList
            catelogList={data!.chapters as string[]}
            imgUrl={data!.coverImg}
            title={data!.title}
            author={data!.author}
            bookId={data!.bookId}
          />
        </Popup>
      </div>
    </>
  );
}
