import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type FontFamily = "sora" | "inter" | "roboto" | "poppins";

interface StyleContextType {
  fontSize: number;
  fontFamily: FontFamily;
  setFontSize: (size: number) => void;
  setFontFamily: (font: FontFamily) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

const fontFamilyMap = {
  sora: "Sora",
  inter: "Inter",
  roboto: "Roboto",
  poppins: "Poppins",
};

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSizeState] = useState<number>(() => {
    const saved = localStorage.getItem("fontSize");
    return saved ? parseInt(saved) : 100;
  });

  const [fontFamily, setFontFamilyState] = useState<FontFamily>(() => {
    const saved = localStorage.getItem("fontFamily");
    return (saved as FontFamily) || "sora";
  });

  useEffect(() => {
    const root = document.documentElement;
    const scale = fontSize / 100;
    root.style.setProperty("--font-size-xs", `${0.75 * scale}rem`);
    root.style.setProperty("--font-size-sm", `${0.875 * scale}rem`);
    root.style.setProperty("--font-size-base", `${1 * scale}rem`);
    root.style.setProperty("--font-size-lg", `${1.125 * scale}rem`);
    root.style.setProperty("--font-size-xl", `${1.25 * scale}rem`);
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.style.fontFamily = `${fontFamilyMap[fontFamily]}, sans-serif`;
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontFamily]);

  const setFontSize = (size: number) => {
    setFontSizeState(Math.max(75, Math.min(150, size)));
  };

  const setFontFamily = (font: FontFamily) => {
    setFontFamilyState(font);
  };

  const increaseFontSize = () => {
    setFontSize(fontSize + 10);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 10);
  };

  return (
    <StyleContext.Provider
      value={{
        fontSize,
        fontFamily,
        setFontSize,
        setFontFamily,
        increaseFontSize,
        decreaseFontSize,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error("useStyle must be used within a StyleProvider");
  }
  return context;
};
