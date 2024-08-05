import { Space } from "@/bases";
import BookCover from "@/components/book-cover";
import { useReadLocalStorage } from "@/hooks/useReadLocalStorage";
import { IBookInfo } from "@/types/book";
import { px2rem } from "@/utils/unit";
import { useNavigate } from "react-router-dom";

interface ShelfBookListProps {
  isEditing: boolean;
  selectedBook: IBookInfo[];
  onEditingBookCLick: (book: IBookInfo) => void,
}

export function ShelfBookList(
  {
    isEditing,
    selectedBook,
    onEditingBookCLick,
  }
: ShelfBookListProps
) {
  const navigate = useNavigate();
  const BookList = useReadLocalStorage<IBookInfo[]>('shelf') || [];
  function handleBookClick(book: IBookInfo) {
    if (!isEditing)
      navigate(`/book/${book.bookId}`);
    else {
      onEditingBookCLick(book);
    }
  }
  return (
    // grid
    <>
      {/** booklist */}
      {BookList.map((item) => (
        /** bookitem */
        <div key={item.bookId} onClick={()=>handleBookClick(item)}>
          <div className="relative">
            <BookCover
              src={item.coverImg}
              alt={item.title}
              style={{ "--width": px2rem(96), "--height": px2rem(130) }}
              editMode={isEditing}
              active={selectedBook.findIndex((ii)=>ii.bookId === item.bookId) !== -1}
            />
          </div>

          <Space direction="vertical" gap={px2rem(0)}>
            <div className="mt-[5px] text-ygm-m line-clamp-1">{item.title}</div>
            <div className="text-ygm-s line-clamp-1 text-ygm-weak">
              {item.author}
            </div>
          </Space>
        </div>
      ))}
    </>
  );
}
