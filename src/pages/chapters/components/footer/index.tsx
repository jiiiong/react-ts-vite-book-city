import { Popup } from "@/bases/popup"

interface ChapterFooterProps {
  visible: boolean;
}

export function ChapterFooter({
  visible
}:ChapterFooterProps) {
  return (
    <Popup visible={visible} mask={false} position="bottom">
      <div>footer</div>
    </Popup>
  );
}
