import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { lightTheme, darkTheme, Theme } from './index';

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(preferences => {
      console.log('Theme changed:', preferences.colorScheme);
      setColorScheme(preferences.colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const isDark = colorScheme === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  console.log('Current color scheme:', colorScheme);
  console.log('Using theme:', isDark ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 