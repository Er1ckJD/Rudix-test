// src/utils/animations.ts
import {
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  Easing,
  SharedValue,
} from 'react-native-reanimated';

/**
 * Utilidades de animación centralizadas
 * Garantiza consistencia en todas las transiciones
 */

// ============================================
// CONFIGURACIONES DE TIMING
// ============================================

export const AnimationDurations = {
  fast: 150,
  normal: 250,
  slow: 350,
  verySlow: 500,
} as const;

export const AnimationEasings = {
  // Ease functions de CSS traducidas a RN
  linear: Easing.linear,
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
  
  // Personalizadas
  smooth: Easing.bezier(0.25, 0.1, 0.25, 1),
  snappy: Easing.bezier(0.4, 0, 0.2, 1),
  bouncy: Easing.bezier(0.68, -0.55, 0.265, 1.55),
} as const;

// ============================================
// PRESETS DE ANIMACIÓN
// ============================================

/**
 * Fade In/Out
 */
export const fadeIn = (duration = AnimationDurations.normal) => {
  return withTiming(1, {
    duration,
    easing: AnimationEasings.easeOut,
  });
};

export const fadeOut = (duration = AnimationDurations.normal) => {
  return withTiming(0, {
    duration,
    easing: AnimationEasings.easeIn,
  });
};

/**
 * Scale animations
 */
export const scaleIn = (duration = AnimationDurations.normal) => {
  return withSpring(1, {
    damping: 15,
    stiffness: 150,
  });
};

export const scaleOut = (duration = AnimationDurations.normal) => {
  return withTiming(0, {
    duration,
    easing: AnimationEasings.easeIn,
  });
};

/**
 * Slide animations
 */
export const slideInFromRight = (distance = 300, duration = AnimationDurations.normal) => {
  return withTiming(0, {
    duration,
    easing: AnimationEasings.smooth,
  });
};

export const slideOutToRight = (distance = 300, duration = AnimationDurations.normal) => {
  return withTiming(distance, {
    duration,
    easing: AnimationEasings.smooth,
  });
};

export const slideInFromBottom = (distance = 300, duration = AnimationDurations.normal) => {
  return withTiming(0, {
    duration,
    easing: AnimationEasings.smooth,
  });
};

export const slideOutToBottom = (distance = 300, duration = AnimationDurations.normal) => {
  return withTiming(distance, {
    duration,
    easing: AnimationEasings.smooth,
  });
};

/**
 * Bounce effect
 */
export const bounce = () => {
  return withSequence(
    withTiming(0.9, { duration: 100 }),
    withSpring(1, { damping: 10, stiffness: 200 })
  );
};

/**
 * Shake effect (para errores)
 */
export const shake = () => {
  return withSequence(
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(0, { duration: 50 })
  );
};

/**
 * Pulse (para notificaciones)
 */
export const pulse = () => {
  return withSequence(
    withTiming(1.1, { duration: 300 }),
    withTiming(1, { duration: 300 })
  );
};

// ============================================
// ANIMACIONES COMPLEJAS
// ============================================

/**
 * Entrada de modal desde abajo
 */
export function modalEnterFromBottom() {
  return {
    translateY: slideInFromBottom(),
    opacity: fadeIn(AnimationDurations.fast),
  };
}

/**
 * Salida de modal hacia abajo
 */
export function modalExitToBottom() {
  return {
    translateY: slideOutToBottom(),
    opacity: fadeOut(AnimationDurations.fast),
  };
}

/**
 * Card flip
 */
export function flipCard() {
  return withSequence(
    withTiming(90, { duration: AnimationDurations.normal }),
    withTiming(0, { duration: AnimationDurations.normal })
  );
}

/**
 * Staggered list animation
 * Anima items de una lista con retraso
 */
export function staggeredFadeIn(index: number, itemDelay = 100) {
  return withDelay(
    index * itemDelay,
    withTiming(1, {
      duration: AnimationDurations.normal,
      easing: AnimationEasings.easeOut,
    })
  );
}

// ============================================
// HOOKS DE ANIMACIÓN REUTILIZABLES
// ============================================

/**
 * Genera valores iniciales para entrada de pantalla
 */
export function getScreenEnterInitialValues() {
  return {
    opacity: 0,
    translateY: 50,
  };
}

/**
 * Genera animación de entrada de pantalla
 */
export function getScreenEnterAnimation() {
  return {
    opacity: fadeIn(),
    translateY: slideInFromBottom(50),
  };
}

/**
 * Genera animación de salida de pantalla
 */
export function getScreenExitAnimation() {
  return {
    opacity: fadeOut(),
    translateY: slideOutToBottom(50),
  };
}

// ============================================
// UTILIDADES DE INTERPOLACIÓN
// ============================================

/**
 * Interpolación común para rotación
 */
export function interpolateRotation(
  value: SharedValue<number>,
  inputRange: number[] = [0, 1],
  outputRange: string[] = ['0deg', '360deg']
) {
  'worklet';
  // Implementación básica, se puede expandir
  return `${value.value * 360}deg`;
}

/**
 * Interpolación para escala con bounce
 */
export function interpolateBounceScale(value: number) {
  'worklet';
  if (value <= 0.5) {
    return 0.8 + value * 0.4; // 0.8 -> 1.0
  } else {
    return 1.0 + (value - 0.5) * 0.2; // 1.0 -> 1.1
  }
}

// ============================================
// CONSTANTES DE GESTOS
// ============================================

export const GestureConfig = {
  // Swipe
  swipeVelocityThreshold: 500,
  swipeDistanceThreshold: 50,
  
  // Pan
  panActivationDistance: 10,
  
  // Long press
  longPressDuration: 500,
} as const;

// ============================================
// EXPORTS
// ============================================

export default {
  durations: AnimationDurations,
  easings: AnimationEasings,
  fadeIn,
  fadeOut,
  scaleIn,
  scaleOut,
  slideInFromRight,
  slideOutToRight,
  slideInFromBottom,
  slideOutToBottom,
  bounce,
  shake,
  pulse,
  modalEnterFromBottom,
  modalExitToBottom,
  flipCard,
  staggeredFadeIn,
  getScreenEnterInitialValues,
  getScreenEnterAnimation,
  getScreenExitAnimation,
  GestureConfig,
};
