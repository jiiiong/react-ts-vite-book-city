import { Popup } from "@/bases/popup"
import { useTheme, useThemeDispatch } from "../../context/ThemeContext";

interface ChapterFooterProps {
  visible: boolean;
}

export function ChapterFooter({
  visible
}:ChapterFooterProps) {
  const {nightMode} = useTheme();
  const themeDispatch = useThemeDispatch();
  function handleNightModeSwitch() {
    themeDispatch({type: 'flipNightMode'});
  }
  return (
    <Popup visible={visible} mask={false} position="bottom">
      <div className="pb-ygm-xs pt-ygm-s bg-ygm-background grid grid-cols-4">
        <div className="flex flex-col items-center">
          <i className="icon-menu text-ygm-weak text-ygm-xxl" />
          <span className="text-ygm-s">目录</span>
        </div>
        <div className="flex flex-col items-center">
          <i className="icon-tab text-ygm-weak text-ygm-xxl" />
          <span className="text-ygm-s">进度</span>
        </div>
        <div className="flex flex-col items-center">
          <i className="icon-cog text-ygm-weak text-ygm-xxl" />
          <span className="text-ygm-s">设置</span>
        </div>
        <div className="flex flex-col items-center"
          onClick={handleNightModeSwitch}
        >
          <i className={`
            ${nightMode ? 'icon-sun' : 'icon-star-full'}
          text-ygm-weak text-ygm-xxl`} />
          <span className="text-ygm-s">
            {nightMode ? '日间' : '夜间'}
          </span>
        </div>
      </div>
    </Popup>
  );
}
