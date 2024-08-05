import React, { useState } from 'react';
import { ShelfHeader } from './components/header';
import { IBookInfo } from '@/types/book';
import { ShelfBookList } from './components/list/bookList';
import { ShelfList } from './components/list';

const Shelf:React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBook, setSelectedBook] = useState<IBookInfo[]>([])

    function updateSelectedBook(book: IBookInfo) {
      const arr = selectedBook.filter((item)=>(item.bookId !== book.bookId))
      // 如果原来不存在这本书
      if (arr.length === selectedBook.length)
        arr.push(book)
        setSelectedBook(arr);
    }

    function clearSelectedBook() {
      setSelectedBook([]);
    }

    return (
      <div
        className="
          h-screen flex flex-col
        "
      >
        {/** nav */}
        <div className="flex-initial">
          <ShelfHeader
            isEditing={isEditing}
            onEditClick={() => setIsEditing(!isEditing)}
          />
        </div>
        {/** content */}
        <div
          className="
          px-ygm-xl pt-ygm-s
          flex-1 overflow-y-auto
          "
        >
          <ShelfList>
            <ShelfBookList
              isEditing={isEditing}
              selectedBook={selectedBook}
              onEditingBookCLick={updateSelectedBook}
            />
          </ShelfList>

        </div>
      </div>
    );
}

export default Shelf;
