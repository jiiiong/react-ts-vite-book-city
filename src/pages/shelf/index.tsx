import { useState } from 'react';
import { ShelfHeader } from './components/header';
import { IBookInfo } from '@/types/book';
import { ShelfBookList } from './components/list/bookList';
import { ShelfList } from './components/list';
import { ShelfGroupList } from './components/list/GroupList';
import { useReadLocalStorage } from '@/hooks/useReadLocalStorage';
import { EditorBar } from './components/footer/editorBar';
import { removeBooks, removeGroup, setGroup } from '@/utils/shelf';

function Shelf () {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBook, setSelectedBook] = useState<IBookInfo[]>([])
    const [selectedGroup, setSelectedGroup] = useState<string[]>([])
    const bookList = useReadLocalStorage<IBookInfo[]>('shelf') || [];

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

    function updateSelectedGroup(groupName: string) {
      const arr = selectedGroup.filter((item)=>(item !== groupName))
      // 如果原来不存在这本书
      if (arr.length === selectedGroup.length)
        arr.push(groupName)
      setSelectedGroup(arr);
    }

    function clearSelectedGroup() {
      setSelectedGroup([]);
    }

    function onToggleEditing() {
      if (isEditing) {
        setSelectedBook([]);
        setSelectedGroup([]);
      }
      setIsEditing(!isEditing);
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
            onEditClick={onToggleEditing}
          />
        </div>
        {/** shelf content */}
        <div
          className="
          px-ygm-xl py-ygm-s
          flex-1 overflow-y-auto
          relative
          "
        >
          <ShelfList>
            <ShelfGroupList
              isEditing={isEditing}
              selectedGroup={selectedGroup}
              onEditingGroupCLick={updateSelectedGroup}
            />
            <ShelfBookList
              isEditing={isEditing}
              selectedBook={selectedBook}
              onEditingBookCLick={updateSelectedBook}
              BookList={bookList}
            />
          </ShelfList>
        </div>
        {/** footer */}
        <EditorBar
          isEditing={isEditing}
          selectedBook={selectedBook}
          selectGroup={selectedGroup}
          onDelete={()=>{
            removeBooks(selectedBook)
            clearSelectedBook();
            removeGroup(selectedGroup)
            clearSelectedGroup();
          }}

          onGroup={(groupName)=>{
            setGroup(groupName, selectedBook, selectedGroup)
            clearSelectedBook();
            clearSelectedGroup();
          }}
        />
      </div>
    );
}

export default Shelf;
