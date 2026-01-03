// src/constants/theme.ts
import { Platform } from 'react-native';

/**
 * Sistema de diseño RuDix
 * Centraliza todos los valores de diseño para consistencia
 */

// ============================================
// COLORES
// ============================================

export const Colors = {
  // Brand
  brand: {
    primary: '#108A33',
    primaryDark: '#0D6B28',
    primaryLight: '#15B545',
    secondary: '#FFD700',
    accent: '#007AFF',
  },

  // Semánticos
  semantic: {
    success: '#4CAF50',
    error: '#E53935',
    warning: '#FF9800',
    info: '#2196F3',
  },

  // Grises (escala simplificada)
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    450: '#C5C5C5',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    950: '#595959',
    1000: '#4A4A4A',
    1100: '#363636',
    1200: '#2B2B2B',
    1400: '#1A1A1A',
  },

  // Básicos
  base: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },

  // Comunes
  common: {
    lightGreen: '#C8E6C9',
    darkGold: '#B8860B',
    lightGold: '#FFF9C4',
    gold: '#FFD700',
    lightRed: '#FFEBEE',
    error: '#E53935',
  },

  // Sociales
  social: {
    facebook: '#3B5998',
    google: '#DB4437',
    apple: '#000000',
    whatsapp: '#25D366',
  },

  // Light theme
  light: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  // Dark theme
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    border: '#333333',
    overlay: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(255, 255, 255, 0.05)',
  },
} as const;

// ============================================
// ESPACIADO (Sistema de 4px)
// ============================================

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// ============================================
// TIPOGRAFÍA
// ============================================

export const Typography = {
  // Tamaños
  size: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 48,
  },

  // Pesos
  weight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Familias (según plataforma)
  family: Platform.select({
    ios: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
      mono: 'Courier',
    },
    android: {
      regular: 'Roboto',
      medium: 'Roboto-Medium',
      bold: 'Roboto-Bold',
      mono: 'monospace',
    },
    default: {
      regular: 'system-ui',
      medium: 'system-ui',
      bold: 'system-ui',
      mono: 'monospace',
    },
  }),
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// ============================================
// SOMBRAS
// ============================================

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: Colors.base.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: Colors.base.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: Colors.base.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: Colors.base.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;

// ============================================
// ICONOS
// ============================================

export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// ============================================
// DIMENSIONES COMUNES
// ============================================

export const Dimensions = {
  // Botones
  button: {
    height: {
      sm: 36,
      md: 48,
      lg: 56,
    },
    minWidth: 120,
  },

  // Inputs
  input: {
    height: {
      sm: 36,
      md: 48,
      lg: 56,
    },
  },

  // Avatares
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  },

  // Cards
  card: {
    minHeight: 80,
  },

  // Tab bar
  tabBar: {
    height: 60,
  },

  // Header
  header: {
    height: 56,
  },
} as const;

// ============================================
// ANIMACIONES
// ============================================

export const Animations = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    default: 'ease-in-out',
    spring: 'spring',
  },
} as const;

// ============================================
// UTILIDADES
// ============================================

/**
 * Convierte opacidad (0-1) a hex
 */
export function hexWithOpacity(hex: string, opacity: number): string {
  const alpha = Math.round(opacity * 255);
  const alphaHex = alpha.toString(16).padStart(2, '0');
  return `${hex}${alphaHex}`;
}

/**
 * Obtiene color según el theme
 */
export function getThemedColor(
  colorScheme: 'light' | 'dark',
  lightColor: string,
  darkColor: string
): string {
  return colorScheme === 'dark' ? darkColor : lightColor;
}

/**
 * Genera estilos de sombra según plataforma
 */
export function createShadow(
  elevation: keyof typeof Shadows
): typeof Shadows.md {
  return Shadows[elevation];
}

// ============================================
// PRESETS DE ESTILOS COMUNES
// ============================================

export const CommonStyles = {
  // Contenedores
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  
  centerContent: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },

  rowBetween: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },

  // Textos
  h1: {
    fontSize: Typography.size.xxxl,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
  },

  h2: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
  },

  h3: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
  },

  body: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.regular,
    color: Colors.light.text,
    lineHeight: Typography.size.base * Typography.lineHeight.normal,
  },

  caption: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.regular,
    color: Colors.light.textSecondary,
  },

  // Cards
  card: {
    backgroundColor: Colors.base.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Shadows.md,
  },

  // Separadores
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: Spacing.md,
  },
} as const;

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Shadows,
  IconSizes,
  Dimensions,
  Animations,
  CommonStyles,
  hexWithOpacity,
  getThemedColor,
  createShadow,
};