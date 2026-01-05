import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { storage } from '@/utils/storage';

type ColorScheme = 'light' | 'dark';

interface ColorSchemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  isSystem: boolean;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'APP_THEME';

export const ColorSchemeProvider = ({ children }: { children: React.ReactNode }) => {
  const deviceScheme = useDeviceColorScheme();
  const [colorScheme, _setColorScheme] = useState<ColorScheme>(deviceScheme || 'light');
  const [isSystem, setIsSystem] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await storage.getItem(THEME_STORAGE_KEY) as ColorScheme | null;
        if (savedTheme) {
          _setColorScheme(savedTheme);
          setIsSystem(false);
        } else {
          _setColorScheme(deviceScheme || 'light');
          setIsSystem(true);
        }
} catch {
        _setColorScheme(deviceScheme || 'light');
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [deviceScheme]);
  
  const setColorScheme = async (scheme: ColorScheme) => {
    _setColorScheme(scheme);
    setIsSystem(false);
    try {
      await storage.setItem(THEME_STORAGE_KEY, scheme);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };
  
  if (isLoading) {
    return null; 
  }

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme, isSystem }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
    const context = useContext(ColorSchemeContext);
    if (context === undefined) {
        throw new Error('useColorScheme must be used within a ColorSchemeProvider');
    }
    return context;
};