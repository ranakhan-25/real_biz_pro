"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const THEME_KEY = "realbiz-theme";
const PRIMARY_KEY = "realbiz-primary";

// ✅ এখানে primary color set করুন
const DEFAULT_PRIMARY = "#2ed573";

interface ThemeContextType {
  theme: Theme;
  primaryColor: string;
  toggle: () => void;
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  primaryColor: DEFAULT_PRIMARY,
  toggle: () => {},
  toggleTheme: () => {},
  setPrimaryColor: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [primaryColor, setPrimaryColorState] = useState(DEFAULT_PRIMARY);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    if (storedTheme === "dark") setTheme("dark");

    const storedPrimary = window.localStorage.getItem(PRIMARY_KEY);
    if (storedPrimary) setPrimaryColorState(storedPrimary);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);

    // Primary color → CSS variables
    root.style.setProperty("--color-primary", primaryColor);
    root.style.setProperty("--color-primary-hover", primaryColor);
    root.style.setProperty("--color-primary-light", `${primaryColor}18`);

    // যদি shadcn / tailwind primary use করেন
    root.style.setProperty("--primary", primaryColor);

    window.localStorage.setItem(PRIMARY_KEY, primaryColor);
  }, [theme, primaryColor]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        primaryColor,
        toggle,
        toggleTheme: toggle,
        setPrimaryColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
