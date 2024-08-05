import { Popup } from "@/bases/popup";
import BookCover from "@/components/book-cover";
import { useReadLocalStorage } from "@/hooks/useReadLocalStorage";
import { IBookInfo } from "@/types/book";
import { px2rem } from "@/utils/unit";
import { useState } from "react";
import { ShelfBookList } from "./bookList";

interface ShelfGroupListProps {
  isEditing: boolean;
  selectedGroup: string[];
  onEditingGroupCLick: (group: string) => void,
}

export function ShelfGroupList({
  isEditing,
  selectedGroup,
  onEditingGroupCLick,
}:ShelfGroupListProps) {
  const groups = useReadLocalStorage<Record<string, IBookInfo[]>>('shelf-group');
  const [groupPopup, setGroupPopup] = useState<string|null>(null);

  function handleGroupClick(group: string) {
    if (!isEditing){
      setGroupPopup(group)
    }
    else {
      onEditingGroupCLick(group);
    }
  }

  if (!groups)
    return null;
  return (
    <>
      {/** grouplist */}
      {Object.entries(groups).map(([groupName, books]) => (
        /** group Item */
        <div key={groupName}>
          <div onClick={() => handleGroupClick(groupName)}>
            {/** bookList */}
            <div
              className="
              w-[96px] h-[130px] border-ygm-weak border-[1px] border-solid rounded-ygm-s
              p-ygm-xs
              relative overflow-hidden
              grid grid-cols-2 gap-[6px]
            "
            >
              {books.map(
                (item, index) =>
                  index < 4 && (
                    <div key={item.bookId}>
                      <BookCover
                        src={item.coverImg}
                        alt={item.title}
                        style={{
                          "--width": px2rem(40),
                          "--height": px2rem(57),
                        }}
                      />
                    </div>
                  ),
              )}
              {/** checkbox */}
              {isEditing && (
                <div className="absolute right-[3px] bottom-[3px] leading-none text-ygm-xl">
                  {!(
                    selectedGroup.findIndex((item) => item === groupName) !== -1
                  ) ? (
                    <i className="icon-checkbox-unchecked text-ygm-weak" />
                  ) : (
                    <i className="icon-checkbox-checked text-ygm-primary" />
                  )}
                </div>
              )}
            </div>
            {/** group name */}
            <div className="mt-[5px] text-ygm-m line-clamp-1">{groupName}</div>
            {/** group popup */}
          </div>
          <Popup
            position="bottom"
            visible={groupPopup === groupName}
            onMaskClick={() => {
              setGroupPopup(null);
            }}
          >
            <div
              className="

                min-h-[20vh] max-h-[70vh] bg-white rounded-t-ygm-xl
                p-ygm-l overflow-y-auto
                grid grid-cols-3 gap-[20px]
              "
            >
              <ShelfBookList
                BookList={books}
              />
            </div>
          </Popup>
        </div>
      ))}
    </>
  );
}


