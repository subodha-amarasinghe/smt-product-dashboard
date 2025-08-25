import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";

interface DarkModeContextProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

const getInitialDarkMode = (): boolean => {
  const saved = localStorage.getItem("darkMode");
  if (saved !== null) return saved === "true";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
};

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(getInitialDarkMode);

    const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode])

    const contextValue = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode, toggleDarkMode]);

    return (
        <DarkModeContext.Provider value={contextValue}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = (): DarkModeContextProps => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
};
