// src/components/ui/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Shadows,
  Dimensions,
} from '@/constants/theme';

// ============================================
// TIPOS
// ============================================

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  // Contenido
  title: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;

  // Apariencia
  variant?: ButtonVariant;
  size?: ButtonSize;
  gradient?: boolean;
  fullWidth?: boolean;

  // Estado
  loading?: boolean;
  disabled?: boolean;

  // Estilos personalizados
  style?: ViewStyle;
  textStyle?: TextStyle;
}

// ============================================
// COMPONENTE
// ============================================

export default function Button({
  title,
  leftIcon,
  rightIcon,
  variant = 'primary',
  size = 'md',
  gradient = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  onPress,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  // Obtener estilos según variante y tamaño
  const containerStyle = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${size}`],
    styles[`text_${variant}`],
    isDisabled && styles.textDisabled,
    textStyle,
  ];

  // Renderizar contenido
  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? Colors.brand.primary : Colors.base.white}
          size="small"
        />
      ) : (
        <>
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={getIconSize(size)}
              color={getIconColor(variant, isDisabled)}
              style={styles.leftIcon}
            />
          )}
          <Text style={textStyles}>{title}</Text>
          {rightIcon && (
            <Ionicons
              name={rightIcon}
              size={getIconSize(size)}
              color={getIconColor(variant, isDisabled)}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </>
  );

  // Si es primary con gradient
  if (variant === 'primary' && gradient && !isDisabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        {...rest}
      >
        <LinearGradient
          colors={['#108A33', '#15B545']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[containerStyle, styles.gradient]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Botón normal
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={containerStyle}
      {...rest}
    >
      {content}
    </TouchableOpacity>
  );
}

// ============================================
// HELPERS
// ============================================

function getIconSize(size: ButtonSize): number {
  switch (size) {
    case 'sm':
      return 16;
    case 'lg':
      return 24;
    default:
      return 20;
  }
}

function getIconColor(variant: ButtonVariant, disabled: boolean): string {
  if (disabled) return Colors.grey[400];

  switch (variant) {
    case 'outline':
    case 'ghost':
      return Colors.brand.primary;
    case 'danger':
      return Colors.base.white;
    default:
      return Colors.base.white;
  }
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  // Base
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.xl,
    ...Shadows.md,
  },

  // Tamaños
  size_sm: {
    height: Dimensions.button.height.sm,
    paddingHorizontal: Spacing.md,
    minWidth: 80,
  },
  size_md: {
    height: Dimensions.button.height.md,
    paddingHorizontal: Spacing.lg,
    minWidth: Dimensions.button.minWidth,
  },
  size_lg: {
    height: Dimensions.button.height.lg,
    paddingHorizontal: Spacing.xl,
    minWidth: 160,
  },

  // Variantes
  variant_primary: {
    backgroundColor: Colors.brand.primary,
  },
  variant_secondary: {
    backgroundColor: Colors.grey[200],
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.brand.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  variant_ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  variant_danger: {
    backgroundColor: Colors.semantic.error,
  },

  // Textos
  text: {
    fontWeight: Typography.weight.bold,
  },
  text_sm: {
    fontSize: Typography.size.sm,
  },
  text_md: {
    fontSize: Typography.size.md,
  },
  text_lg: {
    fontSize: Typography.size.lg,
  },

  // Variantes de texto
  text_primary: {
    color: Colors.base.white,
  },
  text_secondary: {
    color: Colors.light.text,
  },
  text_outline: {
    color: Colors.brand.primary,
  },
  text_ghost: {
    color: Colors.brand.primary,
  },
  text_danger: {
    color: Colors.base.white,
  },

  // Estados
  disabled: {
    backgroundColor: Colors.grey[300],
    shadowOpacity: 0,
    elevation: 0,
  },
  textDisabled: {
    color: Colors.grey[500],
  },

  // Otros
  fullWidth: {
    width: '100%',
  },
  gradient: {
    shadowColor: Colors.brand.primary,
    shadowOpacity: 0.3,
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
});
