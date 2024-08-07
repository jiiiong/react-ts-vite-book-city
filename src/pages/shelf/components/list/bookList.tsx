import { Space } from "@/bases";
import BookCover from "@/components/book-cover";
import { IBookInfo } from "@/types/book";
import { px2rem } from "@/utils/unit";
import { useNavigate } from "react-router-dom";
// 之所以使用 BookList props，而不是直接访问 localStorage
// 是为了这个组件能被 groupList 使用，用来显示 group 内部的书籍
interface ShelfBookListProps {
  BookList: IBookInfo[];
  isEditing?: boolean;
  selectedBook?: IBookInfo[];
  onEditingBookCLick?: (book: IBookInfo) => void,
}

export function ShelfBookList(
  {
    BookList,
    isEditing = false,
    selectedBook,
    onEditingBookCLick,
  }
: ShelfBookListProps
) {
  const navigate = useNavigate();
  function handleBookClick(book: IBookInfo) {
    if (!isEditing)
      navigate(`/book/${book.bookId}`);
    else {
      onEditingBookCLick?.(book);
    }
  }
  return (
    // grid
    <>
      {/** booklist */}
      {BookList.map((item) => (
        /** bookitem */
        <div key={item.bookId} onClick={()=>handleBookClick(item)}>
          <div>
            <BookCover
              src={item.coverImg}
              alt={item.title}
              style={{ "--width": px2rem(96), "--height": px2rem(130) }}
              editMode={isEditing}
              active={selectedBook?.findIndex((ii)=>ii.bookId === item.bookId) !== -1}
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
