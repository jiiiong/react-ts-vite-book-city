import { Popup } from "@/bases/popup";
import { Slider, SliderRef } from "@/bases/slider/slider";
import { useRequest } from "@/hooks/useRequest";
import { api } from "@/pages/chapters/api";
import { IBookInfo } from "@/types/book";
import cx from 'classnames';
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ChapterProgressProps {
  visible: boolean,
}

export function ChapterProgress({
  visible,
}:ChapterProgressProps) {
  const navigate = useNavigate();
  const {chapterId, bookId} = useParams();
  const {data} = useRequest<IBookInfo>({url:api.getBook(bookId as string)})
  const isFirst = Number(chapterId) === 1;
  const isLast = Number(chapterId) === data?.chapters?.length;

  const [progIndex, setProgIndex] = useState(Number(chapterId));
  const sliderRef = useRef<SliderRef>(null)

  useEffect(()=>{
    sliderRef.current?.setValue(Number(chapterId));
  }, [chapterId])

  return (
    <Popup visible={visible} mask={false} position="bottom">
      <div className="pt-ygm-s bg-ygm-background text-ygm-m">
        {/** title */}
        <div className="text-center">{`chapter ${progIndex} `}</div>
        {/** progress bar */}
        <div
          className="
          h-[50px] px-ygm-xl
          flex items-center justify-center
        "
        >
          {/** last */}
          <div
            className={cx("min-w-[37px]", { "text-ygm-weak": isFirst })}
            onClick={() => {
              if (!isFirst) {
                setProgIndex(progIndex - 1);
                navigate(`/book/${bookId}/${progIndex - 1}`, { replace: true });
              }
            }}
          >
            上一章
          </div>
          {/** slider */}
          <div className="flex-1 px-ygm-xl">
            <Slider
              ref={sliderRef}
              initValue={Number(chapterId)}
              min={1}
              max={data?.chapters?.length}
              onChange={(finalIndex) => setProgIndex(finalIndex)}
              onAfterChange={(value) => {
                navigate(`/book/${bookId}/${value}`, { replace: true });
              }}
            />
          </div>
          {/** next */}
          <div
            className={cx("min-w-[37px]", { "text-ygm-weak": isLast })}
            onClick={() => {
              if (!isLast) {
                setProgIndex(progIndex + 1);
                navigate(`/book/${bookId}/${progIndex + 1}`, { replace: true });
              }
            }}
          >
            下一章
          </div>
        </div>
      </div>
    </Popup>
  );
}
