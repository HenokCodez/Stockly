import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type DarkModeContextType = {
  isDark: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function useDarkMode(): DarkModeContextType {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

type Props = {
  children: ReactNode;
};

export function DarkModeProvider({ children }: Props) {
  // Initial value from localStorage or system preference
  /*
    It means:
    1️⃣ If the user has previously saved a choice (in localStorage), use that.
    2️⃣ Else default to system preference (prefers-color-scheme).
    3️⃣ Else fallback to false (light mode).
    ✅ It's trying to be smart, but can be simplified if you don’t care about system preference.
  */
  const getInitialMode = (): boolean => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return stored === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  };

  const [isDark, setIsDark] = useState<boolean>(getInitialMode);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(isDark));
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  return <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}
