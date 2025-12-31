// src/components/ui/Screen.tsx
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Colors, Spacing } from '@/constants/theme';
import { LoadingSpinner } from './Loading';

// ============================================
// TIPOS
// ============================================

interface BaseScreenProps {
  children: React.ReactNode;
  
  // Safe area
  edges?: Edge[];
  
  // Estilo
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  backgroundColor?: string;
  
  // Loading
  loading?: boolean;
  loadingText?: string;
  
  // Error
  error?: boolean;
  errorComponent?: React.ReactNode;
  
  // Animación de entrada
  animated?: boolean;
}

interface ScrollableScreenProps extends BaseScreenProps {
  scrollable: true;
  
  // Scroll props
  scrollViewProps?: Omit<ScrollViewProps, 'children' | 'style'>;
  
  // Refresh
  refreshing?: boolean;
  onRefresh?: () => void;
  
  // Keyboard
  keyboardAware?: boolean;
  keyboardVerticalOffset?: number;
}

interface StaticScreenProps extends BaseScreenProps {
  scrollable?: false;
}

type ScreenProps = ScrollableScreenProps | StaticScreenProps;

// ============================================
// COMPONENTE
// ============================================

export default function Screen(props: ScreenProps) {
  const {
    children,
    edges = ['top', 'bottom'],
    style,
    contentContainerStyle,
    backgroundColor = Colors.light.background,
    loading = false,
    loadingText,
    error = false,
    errorComponent,
    animated = true,
  } = props;

  // Safe area container base
  const containerStyle = [
    styles.container,
    { backgroundColor },
    style,
  ];

  // Renderizar loading
  if (loading) {
    return (
      <SafeAreaView style={containerStyle} edges={edges}>
        <LoadingSpinner fullScreen text={loadingText} />
      </SafeAreaView>
    );
  }

  // Renderizar error
  if (error && errorComponent) {
    return (
      <SafeAreaView style={containerStyle} edges={edges}>
        {errorComponent}
      </SafeAreaView>
    );
  }

  // Wrapper con animación opcional
  const AnimatedWrapper = animated ? Animated.View : View;
  const animationProps = animated ? { entering: FadeIn, exiting: FadeOut } : {};

  // Caso 1: Pantalla con scroll
  if (props.scrollable) {
    const {
      scrollViewProps,
      refreshing,
      onRefresh,
      keyboardAware = true,
      keyboardVerticalOffset = 0,
    } = props;

    const scrollContent = (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing || false}
              onRefresh={onRefresh}
              tintColor={Colors.brand.primary}
              colors={[Colors.brand.primary]}
            />
          ) : undefined
        }
        {...scrollViewProps}
      >
        <AnimatedWrapper {...animationProps}>
          {children}
        </AnimatedWrapper>
      </ScrollView>
    );

    // Con KeyboardAvoidingView si está habilitado
    if (keyboardAware) {
      return (
        <SafeAreaView style={containerStyle} edges={edges}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={styles.keyboardAvoid}
          >
            {scrollContent}
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={containerStyle} edges={edges}>
        {scrollContent}
      </SafeAreaView>
    );
  }

  // Caso 2: Pantalla estática (sin scroll)
  return (
    <SafeAreaView style={containerStyle} edges={edges}>
      <AnimatedWrapper style={[styles.staticContent, contentContainerStyle]} {...animationProps}>
        {children}
      </AnimatedWrapper>
    </SafeAreaView>
  );
}

// ============================================
// SUB-COMPONENTES
// ============================================

/**
 * Header de pantalla con padding consistente
 */
export function ScreenHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.header, style]}>{children}</View>;
}

/**
 * Footer de pantalla (sticky bottom)
 */
export function ScreenFooter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

/**
 * Sección de contenido con padding
 */
export function ScreenSection({
  children,
  title,
  style,
}: {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.section, style]}>
      {title && <View style={styles.sectionHeader}>{/* Title component */}</View>}
      {children}
    </View>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.lg,
  },
  
  // Static
  staticContent: {
    flex: 1,
  },
  
  // Keyboard
  keyboardAvoid: {
    flex: 1,
  },
  
  // Sub-componentes
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.grey[200],
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
});

// ============================================
// EXPORTS
// ============================================

Screen.Header = ScreenHeader;
Screen.Footer = ScreenFooter;
Screen.Section = ScreenSection;
