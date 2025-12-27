/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  common: {
    white: '#fff',
    black: '#000',
    error: '#d32f2f',
    gold: '#FFD700',
    lightGold: '#FFF9C4',
    darkGold: '#FBC02D',
    facebook: '#3b5998',
    whatsapp: '#25D366',
    lightGreen: '#E8F5E9',
    lightRed: '#FFEBEE',
    bbva: '#004481',
    chatBlue: '#1976D2',
    appleBlue: '#007AFF',
  },
  grey: {
    50: '#F9FAFB',
    100: '#f9f9f9',
    200: '#f5f5f5',
    250: '#F3F4F6',
    300: '#f0f0f0',
    400: '#eee',
    450: '#E5E7EB',
    500: '#e1e1e1',
    600: '#e0e0e0',
    700: '#ddd',
    800: '#ccc',
    900: '#999',
    950: '#9CA3AF',
    1000: '#888',
    1100: '#666',
    1200: '#555',
    1300: '#444',
    1400: '#333',
    1500: '#1A1A1A',
    1600: '#AAA',
  },
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
primary: '#108A33',
    primaryTransparent: 'rgba(16, 138, 51, 0.2)',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#108A33',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
