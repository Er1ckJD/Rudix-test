// src/components/ui/Input.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Dimensions,
} from '@/constants/theme';

// ============================================
// TIPOS
// ============================================

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'filled' | 'outlined';

interface InputProps extends TextInputProps {
  // Etiquetas
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;

  // Iconos
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;

  // Apariencia
  variant?: InputVariant;
  size?: InputSize;

  // Estado
  error?: boolean;
  disabled?: boolean;

  // Estilos
  containerStyle?: ViewStyle;
}

// ============================================
// COMPONENTE
// ============================================

export default function Input({
  // Etiquetas
  label,
  placeholder,
  helperText,
  errorText,

  // Iconos
  leftIcon,
  rightIcon,
  onRightIconPress,

  // Apariencia
  variant = 'outlined',
  size = 'md',

  // Estado
  error = false,
  disabled = false,

  // Estilos
  containerStyle,
  style,

  // Eventos
  onFocus,
  onBlur,

  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const hasError = error || !!errorText;
  const isPassword = rest.secureTextEntry;

  // Manejar foco
  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Estilos dinámicos
  const containerStyles = [
    styles.container,
    containerStyle,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    isFocused && styles.focused,
    hasError && styles.error,
    disabled && styles.disabled,
  ];

  const inputStyles = [
    styles.input,
    styles[`input_${size}`],
    leftIcon && styles.inputWithLeftIcon,
    (rightIcon || isPassword) && styles.inputWithRightIcon,
    style,
  ];

  // Determinar icono derecho (password tiene prioridad)
  const finalRightIcon = isPassword
    ? (isPasswordVisible ? 'eye-off-outline' : 'eye-outline')
    : rightIcon;

  const handleRightIconPress = isPassword
    ? togglePasswordVisibility
    : onRightIconPress;

  return (
    <View style={containerStyles}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, hasError && styles.labelError]}>
          {label}
        </Text>
      )}

      {/* Input Container */}
      <View style={inputContainerStyles}>
        {/* Left Icon */}
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={getIconSize(size)}
            color={getIconColor(isFocused, hasError, disabled)}
            style={styles.leftIcon}
          />
        )}

        {/* Input */}
        <TextInput
          style={inputStyles}
          placeholder={placeholder}
          placeholderTextColor={Colors.grey[500]}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />

        {/* Right Icon */}
        {finalRightIcon && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            disabled={!handleRightIconPress}
            style={styles.rightIconContainer}
          >
            <Ionicons
              name={finalRightIcon}
              size={getIconSize(size)}
              color={getIconColor(isFocused, hasError, disabled)}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Helper/Error Text */}
      {(helperText || errorText) && (
        <Text style={[styles.helperText, hasError && styles.errorText]}>
          {errorText || helperText}
        </Text>
      )}
    </View>
  );
}

// ============================================
// HELPERS
// ============================================

function getIconSize(size: InputSize): number {
  switch (size) {
    case 'sm':
      return 16;
    case 'lg':
      return 24;
    default:
      return 20;
  }
}

function getIconColor(focused: boolean, error: boolean, disabled: boolean): string {
  if (disabled) return Colors.grey[400];
  if (error) return Colors.semantic.error;
  if (focused) return Colors.brand.primary;
  return Colors.grey[600];
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  // Container
  container: {
    width: '100%',
    marginBottom: Spacing.md,
  },

  // Label
  label: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.light.text,
    marginBottom: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  labelError: {
    color: Colors.semantic.error,
  },

  // Input Container
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },

  // Variantes
  variant_default: {
    backgroundColor: Colors.base.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[300],
  },
  variant_filled: {
    backgroundColor: Colors.grey[100],
    borderRadius: BorderRadius.md,
  },
  variant_outlined: {
    backgroundColor: Colors.base.white,
    borderWidth: 1.5,
    borderColor: Colors.grey[300],
    borderRadius: BorderRadius.md,
  },

  // Tamaños
  size_sm: {
    height: Dimensions.input.height.sm,
    paddingHorizontal: Spacing.sm,
  },
  size_md: {
    height: Dimensions.input.height.md,
    paddingHorizontal: Spacing.md,
  },
  size_lg: {
    height: Dimensions.input.height.lg,
    paddingHorizontal: Spacing.lg,
  },

  // Estados
  focused: {
    borderColor: Colors.brand.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: Colors.semantic.error,
  },
  disabled: {
    backgroundColor: Colors.grey[100],
    borderColor: Colors.grey[200],
    opacity: 0.6,
  },

  // Input
  input: {
    flex: 1,
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.regular,
    color: Colors.light.text,
    padding: 0, // Remove default padding
  },
  input_sm: {
    fontSize: Typography.size.sm,
  },
  input_md: {
    fontSize: Typography.size.base,
  },
  input_lg: {
    fontSize: Typography.size.md,
  },

  inputWithLeftIcon: {
    marginLeft: Spacing.xs,
  },
  inputWithRightIcon: {
    marginRight: Spacing.xs,
  },

  // Iconos
  leftIcon: {
    marginRight: Spacing.xs,
  },
  rightIconContainer: {
    padding: Spacing.xs,
    marginLeft: Spacing.xs,
  },

  // Helper/Error Text
  helperText: {
    fontSize: Typography.size.xs,
    color: Colors.grey[600],
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  errorText: {
    color: Colors.semantic.error,
  },
});
