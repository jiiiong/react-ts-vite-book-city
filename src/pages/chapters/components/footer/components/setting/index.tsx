import { Popup } from "@/bases/popup";
import { Slider, SliderRef } from "@/bases/slider/slider";
import { BG_COLORS } from "@/pages/chapters/constants";
import { useTheme, useThemeDispatch } from "@/pages/chapters/context/ThemeContext";
import { useEffect, useRef } from "react";

interface ChapterSettingProps {
  visible: boolean;
}
export function ChapterSetting({
  visible,
}:ChapterSettingProps) {
  const theme = useTheme();
  const themeDispatch = useThemeDispatch();
  const SliderRef = useRef<SliderRef>(null);
  useEffect(()=>{
    SliderRef.current?.setValue(theme.fontSize);
  },[theme.fontSize])

  return (
    <Popup position="bottom" mask={false} visible={visible}>
      <div className="bg-ygm-background px-ygm-xl text-ygm-l">
        {/** font size slider */}
        <div className="h-[60px] flex items-center justify-center gap-x-ygm-xl">
          <div
            onClick={
              theme.fontSize > 14 ?
              ()=>themeDispatch({type: 'setFontSize', fontSize:  theme.fontSize - 1}):
              undefined
            }
          >A-</div>
          <Slider
            ref={SliderRef}
            min={14}
            max={28}
            initValue={16}
            onChange={(value)=>themeDispatch({type: 'setFontSize', fontSize: value})}
          />
          <div
            onClick={
              theme.fontSize < 28 ?
              () => themeDispatch({type: 'setFontSize', fontSize: theme.fontSize + 1}) :
              undefined
            }
          >A+</div>
        </div>
        {/** bg color platte */}
        <div className="pb-ygm-m grid grid-cols-4">
          {BG_COLORS.map((color) => (
            <div
              key={color}
              className={`w-[68px] h-[31px] rounded-ygm-s m-auto
              ${theme.bgColor === color && !theme.nightMode ? "border-solid border-[1px] border-ygm-primary" : ""}
              `}
              style={{ backgroundColor: color }}
              onClick={()=>{
                themeDispatch({type:'setBgColor', bgColor: color})
                themeDispatch({type: 'setNightTheme', nightTheme: false})
              }}
            ></div>
          ))}
        </div>
      </div>
    </Popup>
  );
}
