import { useRequest } from "@/hooks/useRequest";
import { IBookInfo, IChapterInfo } from "@/types/book";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
import { ErrorBlock } from "@/bases";
import Loading from "@/components/loading";
import { useTheme } from "../../context/ThemeContext";
import styles from './index.module.scss';

interface ChapterContentProps {
  onContentClick?: ()=>void;
}

export function ChapterContent({
  onContentClick,
}:ChapterContentProps) {

  const {bookId, chapterId} = useParams();
  const {data: bookData} = useRequest<IBookInfo>({url: api.getBook(bookId as string)})
  const {data: chapterData, isLoading, error} = useRequest<IChapterInfo[]>({
    url: api.getChapter(bookId as string, chapterId as string),
  });

  const {bgColor, fontSize} = useTheme();

  const isFirst = Number(chapterId) === 1;
  const isLast = Number(chapterId) === bookData?.chapters?.length;
  const navigate = useNavigate();

  if (error)
    return <ErrorBlock />
  if (isLoading)
    return <Loading />
  if (!chapterData!.length)
    return <ErrorBlock />

  return (
    // content box
    <div
      className={`
        h-screen w-full p-ygm-l overflow-hidden overflow-y-auto
      `}
      style={{fontSize: fontSize, backgroundColor: bgColor}}
      onClick={onContentClick}
    >

      {/** title */}
      <div className="leading-tight text-ygm-xxl font-semibold mb-ygm-m text-ygm-weak">
        {chapterData![0].chapterName}
      </div>

      {/** paragraphs */}
      {chapterData![0].content.map((item, index)=>(
        <p key={index} className="leading-[33px] indent-[2em]">
          {item}
        </p>
      ))}

      {/** pagination */}
      <div className="py-[10px] flex items-center justify-end gap-x-ygm-s">
        <div className={`${styles.button} ${isFirst ? styles.disabled : ''}`}
          onClick={(e)=>{
            e.stopPropagation();
            if (!isFirst)
              navigate(`/book/${bookId}/${Number(chapterId)-1}`, {replace: true})
          }}
        >
          上一章
        </div>
        <div className={`${styles.button} ${isLast ? styles.disabled : ''}`}
          onClick={(e)=>{
            e.stopPropagation();
            if (!isLast)
              navigate(`/book/${bookId}/${Number(chapterId)+1}`, {replace: true})
          }}
        >
          下一章
        </div>
      </div>

    </div>
  );
}
