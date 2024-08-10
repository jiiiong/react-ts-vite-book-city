import { Popup } from "@/bases/popup"
import { useTheme, useThemeDispatch } from "../../context/ThemeContext";
import { ChapterCatalog } from "./components/catalog";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChapterProgress } from "./components/progress";
import { ChapterSetting } from "./components/setting";

interface ChapterFooterProps {
  visible: boolean;
}

export function ChapterFooter({
  visible
}:ChapterFooterProps) {
  const {nightMode} = useTheme();
  const [catalogPopup, setCatalogPopup] = useState(false);
  const [progressPopup, setProgressPopup] = useState(false);
  const [settingPopup, setSettingPopup] = useState(false);

  const themeDispatch = useThemeDispatch();
  const theme = useTheme();

  const bookId = useParams().bookId;
  const navigate = useNavigate()

  function handleNightModeSwitch() {
    themeDispatch({type: 'setNightTheme', nightTheme: !theme.nightMode});
  }

  function handleCatalogSwitch() {
    setCatalogPopup(!catalogPopup);
  }

  // 我需要根据 props 更新一部分的 state；
  if (!visible && (progressPopup || settingPopup)){
    setProgressPopup(false);
    setSettingPopup(false);
  }

  return (
    <div>
      <Popup visible={visible} mask={false} position="bottom">
        <div className="pb-ygm-xs pt-ygm-s bg-ygm-background grid grid-cols-4">
          <div className="flex flex-col items-center"
            onClick={handleCatalogSwitch}
          >
            <i className="icon-menu text-ygm-weak text-ygm-xxl" />
            <span className="text-ygm-s">目录</span>
          </div>
          <div className="flex flex-col items-center"
            onClick={()=>setProgressPopup(true)}
          >
            <i className="icon-tab text-ygm-weak text-ygm-xxl" />
            <span className="text-ygm-s">进度</span>
          </div>
          <div className="flex flex-col items-center"
            onClick={()=>setSettingPopup(true)}
          >
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
      <ChapterCatalog visible={catalogPopup} onMaskClick={handleCatalogSwitch}
        onChapterClick={(index)=>{
          navigate(`/book/${bookId}/${index+1}`, {replace: true});
          handleCatalogSwitch();
        }}
      />
      <ChapterProgress visible={progressPopup} />
      <ChapterSetting visible={settingPopup}/>
    </div>
  );
}
