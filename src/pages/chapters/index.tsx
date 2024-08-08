import { useState } from "react";
import { ChapterContent } from "./components/content";
import { ChapterFooter } from "./components/footer";
import { ChapterHeader } from "./components/header";
import { ThemeProvider } from "./context/ThemeContext";

export function Chapter() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <ThemeProvider>
      <div
        className="h-screen"
      >
        <ChapterHeader visible={showPopup}/>
        <ChapterContent onContentClick={()=>setShowPopup(!showPopup)}/>
        <ChapterFooter visible={showPopup}/>
      </div>
    </ThemeProvider>

  );
}
