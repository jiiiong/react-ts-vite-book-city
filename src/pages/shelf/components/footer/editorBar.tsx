import { Dialog } from "@/bases/dialog/dialog";
import { Popup } from "@/bases/popup";
import { useReadLocalStorage } from "@/hooks/useReadLocalStorage";
import { IBookInfo } from "@/types/book";
import { useState } from "react";

interface EditorBarProps {
  isEditing: boolean;
  selectedBook: IBookInfo[];
  selectGroup: string[];
  onDelete: () => void;
  onGroup: (groupName: string) => void;
}

export function EditorBar({
  isEditing,
  selectedBook,
  selectGroup,
  onDelete,
  onGroup,
}:EditorBarProps) {
  const selecedCount = selectedBook.length + selectGroup.length;
  const [groupPopup, setGroupPopup] = useState(false);
  const [dialog, setDialog] = useState(false);
  const groupList = useReadLocalStorage<Record<string, IBookInfo[]>[]>('shelf-group') || [];

  function showGroupPopup() {
    if (selecedCount)
      setGroupPopup(true);
  }

  return (
    <>
      <Popup position="bottom" visible={isEditing} mask={false}>
        <div
          className="
          border-t-[1px] border-solid border-ygm-box
          shadow-[0_4px_24px_rgb(51,51,51,0.4)]
          grid grid-cols-2
          bg-white
          text-ygm-l text-center
        "
        >
          <div
            className={`py-ygm-m ${!selecedCount && "text-ygm-weak"}`}
            onClick={showGroupPopup}
          >
            分组至
          </div>
          <div
            className={`py-ygm-m ${!selecedCount && "text-ygm-weak"}`}
            onClick={onDelete}
          >
            删除 ({selecedCount})
          </div>
        </div>
      </Popup>
      <Popup
        position="bottom"
        visible={groupPopup}
        onMaskClick={() => setGroupPopup(false)}
      >
        <div
          className="
          max-h-[70vh] overflow-y-auto
          bg-white rounded-t-ygm-xl
          p-ygm-m
          text-ygm-l leading-none
          "
        >
          <div className="mb-ygm-xl text-center font-semibold">书籍分组</div>
          <div
            className="ml-ygm-xl mb-ygm-xl text-ygm-primary line-clamp-1"
            onClick={() => {
              setGroupPopup(false);
              setDialog(true)
              // onGroup("新建分组");

            }}
          >
            <i className="icon-plus text-ygm-s"></i>
            <span className="ml-ygm-s">新建分组</span>
          </div>
          <div>
            {Object.keys(groupList).map((groupName) => (
              <div
                key={groupName}
                className="ml-ygm-xl mb-ygm-xl line-clamp-1"
                onClick={() => {
                  onGroup(groupName);
                  setGroupPopup(false);
                }}
              >
                <i className="icon-folder-open pr-ygm-s text-ygm-m text-ygm-weak" />
                {groupName}
              </div>
            ))}
          </div>
        </div>
      </Popup>
      <Dialog
        visible={dialog}
        onMaskClick={() => setDialog(false)}
        title="新建分组"
        content={
          <input
            type="text"
            className="dd
              border-solid border-ygm-weak border-[1px]
              rounded-ygm-m
              px-ygm-s
            "
          />
        }
        buttons={[
          { key: "cancel", text: "取消" },
          { key: "confirm", text: "确认", type: 'primary' },
        ]}
      />

    </>
  );
}
