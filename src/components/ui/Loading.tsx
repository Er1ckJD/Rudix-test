// src/components/ui/Loading.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

// ============================================
// LOADING SPINNER
// ============================================

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = 'medium',
  color = Colors.brand.primary,
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const spinnerSize = size === 'small' ? 20 : size === 'large' ? 48 : 32;

  const containerStyle = fullScreen ? styles.fullScreenContainer : styles.inlineContainer;

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={spinnerSize} color={color} />
      {text && <Text style={styles.loadingText}>{text}</Text>}
    </View>
  );
}

// ============================================
// SKELETON LOADER
// ============================================

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 4, style }: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

// ============================================
// SKELETON PRESETS
// ============================================

export function SkeletonCard() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonCardHeader}>
        <Skeleton width={40} height={40} borderRadius={20} />
        <View style={{ flex: 1, marginLeft: Spacing.md }}>
          <Skeleton width="60%" height={16} style={{ marginBottom: Spacing.xs }} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
      <Skeleton width="100%" height={100} style={{ marginTop: Spacing.md }} />
      <Skeleton width="100%" height={14} style={{ marginTop: Spacing.sm }} />
      <Skeleton width="80%" height={14} style={{ marginTop: Spacing.xs }} />
    </View>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.skeletonListItem}>
          <Skeleton width={50} height={50} borderRadius={25} />
          <View style={{ flex: 1, marginLeft: Spacing.md }}>
            <Skeleton width="70%" height={16} style={{ marginBottom: Spacing.xs }} />
            <Skeleton width="50%" height={12} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function SkeletonTripCard() {
  return (
    <View style={styles.skeletonTripCard}>
      {/* Header */}
      <View style={styles.tripCardHeader}>
        <Skeleton width={80} height={12} />
        <Skeleton width={60} height={20} borderRadius={10} />
      </View>
      
      {/* Route */}
      <View style={styles.tripCardRoute}>
        <View style={styles.tripCardDots}>
          <Skeleton width={10} height={10} borderRadius={5} />
          <View style={styles.tripCardLine} />
          <Skeleton width={10} height={10} borderRadius={5} />
        </View>
        <View style={{ flex: 1 }}>
          <Skeleton width="90%" height={14} style={{ marginBottom: Spacing.md }} />
          <Skeleton width="85%" height={14} />
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.tripCardFooter}>
        <Skeleton width={35} height={35} borderRadius={17.5} />
        <View style={{ flex: 1, marginLeft: Spacing.sm }}>
          <Skeleton width="40%" height={12} style={{ marginBottom: Spacing.xs }} />
          <Skeleton width="30%" height={10} />
        </View>
        <Skeleton width={80} height={28} borderRadius={14} />
      </View>
    </View>
  );
}

// ============================================
// SHIMMER EFFECT (alternativa más elegante)
// ============================================

export function ShimmerPlaceholder({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}: SkeletonProps) {
  const translateX = useSharedValue(-300);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(300, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.shimmerContainer,
        {
          width,
          height,
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View style={[styles.shimmerOverlay, animatedStyle]} />
    </View>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  // Loading Spinner
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  inlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.light.textSecondary,
    fontWeight: Typography.weight.medium,
  },

  // Skeleton
  skeleton: {
    backgroundColor: Colors.grey[200],
  },

  // Skeleton Card
  skeletonCard: {
    backgroundColor: Colors.base.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  skeletonCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Skeleton List
  skeletonListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[100],
  },

  // Skeleton Trip Card
  skeletonTripCard: {
    backgroundColor: Colors.base.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  tripCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  tripCardRoute: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  tripCardDots: {
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  tripCardLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.grey[200],
    marginVertical: Spacing.xs,
  },
  tripCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.grey[100],
  },

  // Shimmer
  shimmerContainer: {
    backgroundColor: Colors.grey[200],
    overflow: 'hidden',
  },
  shimmerOverlay: {
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
