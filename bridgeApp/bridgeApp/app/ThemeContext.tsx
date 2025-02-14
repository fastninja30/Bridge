import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  darkModeEnabled: boolean;
  toggleDarkMode: () => void;
}

// Create Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    setDarkModeEnabled((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkModeEnabled, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook for using Theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
