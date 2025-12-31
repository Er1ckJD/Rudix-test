// src/components/ui/Card.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import {
  Colors,
  Spacing,
  BorderRadius,
  Shadows,
  CommonStyles,
} from '@/constants/theme';

// ============================================
// TIPOS
// ============================================

type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface BaseCardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  style?: ViewStyle;
}

interface CardProps extends BaseCardProps {
  onPress?: never;
}

interface TouchableCardProps extends BaseCardProps, Omit<TouchableOpacityProps, 'style'> {
  onPress: () => void;
}

type CardComponentProps = CardProps | TouchableCardProps;

// ============================================
// COMPONENTE
// ============================================

export default function Card({
  children,
  variant = 'elevated',
  padding = 'md',
  style,
  onPress,
  ...rest
}: CardComponentProps) {
  const containerStyle = [
    styles.base,
    styles[`variant_${variant}`],
    styles[`padding_${padding}`],
    style,
  ];

  // Si tiene onPress, usar TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.8}
        {...(rest as TouchableOpacityProps)}
      >
        {children}
      </TouchableOpacity>
    );
  }

  // Si no, usar View normal
  return <View style={containerStyle}>{children}</View>;
}

// ============================================
// SUB-COMPONENTES
// ============================================

/**
 * Header del Card
 */
export function CardHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.header, style]}>{children}</View>;
}

/**
 * Contenido del Card
 */
export function CardContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.content, style]}>{children}</View>;
}

/**
 * Footer del Card
 */
export function CardFooter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

/**
 * Divisor horizontal
 */
export function CardDivider({ style }: { style?: ViewStyle }) {
  return <View style={[styles.divider, style]} />;
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  // Base
  base: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },

  // Variantes
  variant_default: {
    backgroundColor: Colors.base.white,
    ...Shadows.sm,
  },
  variant_elevated: {
    backgroundColor: Colors.base.white,
    ...Shadows.md,
  },
  variant_outlined: {
    backgroundColor: Colors.base.white,
    borderWidth: 1,
    borderColor: Colors.grey[300],
  },
  variant_flat: {
    backgroundColor: Colors.grey[50],
  },

  // Padding
  padding_none: {
    padding: 0,
  },
  padding_sm: {
    padding: Spacing.sm,
  },
  padding_md: {
    padding: Spacing.md,
  },
  padding_lg: {
    padding: Spacing.lg,
  },

  // Sub-componentes
  header: {
    paddingBottom: Spacing.md,
  },
  content: {
    // Sin estilos por defecto, completamente flexible
  },
  footer: {
    paddingTop: Spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.grey[200],
    marginVertical: Spacing.md,
  },
});

// ============================================
// EXPORTS
// ============================================

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Divider = CardDivider;
