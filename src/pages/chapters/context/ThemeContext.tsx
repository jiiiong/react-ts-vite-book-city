import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { BG_COLORS, DEFAULT_BG_COLOR_INDEX, DEFAULT_FONT_SIZE } from "../constants";

interface Theme {
  bgColor: string,
  fontSize: number,
  nightMode: boolean,
}

type Actions = object;

const initalTheme: Theme = {
  bgColor: BG_COLORS[DEFAULT_BG_COLOR_INDEX],
  fontSize: DEFAULT_FONT_SIZE,
  nightMode: false,
};

const themeContext = createContext<Theme>(initalTheme);
const themeDispatchContext = createContext<Dispatch<Actions> | null>(null);

export function ThemeProvider({children}: {children: ReactNode}) {
  const [theme, dispatch] = useReducer(themeReducer, initalTheme);
  return (
    <themeContext.Provider value={theme}>
      <themeDispatchContext.Provider value={dispatch}>
        {children}
      </themeDispatchContext.Provider>
    </themeContext.Provider>);
}

export function useTheme() {
  return useContext(themeContext);
}

export function useThemeDispatch() {
  return useContext(themeDispatchContext);
}

function themeReducer(theme: Theme, action: Actions) {
  return theme
}


