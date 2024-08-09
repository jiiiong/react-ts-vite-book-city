import { Popup } from "@/bases/popup";
import { BookCatelogList } from "@/components/book-catelogList";
import { useRequest } from "@/hooks/useRequest";
import { api } from "../../../../api";
import { IBookInfo } from "@/types/book";
import { useParams } from "react-router-dom";
import { ErrorBlock } from "@/bases";
import Loading from "@/components/loading";

interface ChapterCatalogProps {
  visible: boolean;
  onMaskClick?: () => void;
  onChapterClick?: (index: number)=> void;
}

export function ChapterCatalog({
  visible,
  onMaskClick,
  onChapterClick,
}:ChapterCatalogProps) {

  const bookId = useParams().bookId as string
  const {data, isLoading, error} = useRequest<IBookInfo>({url: api.getBook(bookId)})

  if (error)
    return <ErrorBlock />
  if (isLoading)
    return <Loading />

  return (
    <Popup visible={visible} onMaskClick={onMaskClick}>
      <BookCatelogList
        catelogList={data!.chapters as string[]}
        imgUrl={data!.coverImg}
        title={data!.title}
        author={data!.author}
        bookId={data!.bookId}
        onClickChapter={onChapterClick}
      />
    </Popup>
  );
}
