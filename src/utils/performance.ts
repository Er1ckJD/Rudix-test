// src/utils/performance.ts
import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import { InteractionManager, Platform } from 'react-native';

/**
 * Utilidades de optimización de performance
 */

// ============================================
// DEBOUNCE & THROTTLE
// ============================================

/**
 * Debounce: Ejecuta función después de que pare la actividad
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle: Limita ejecuciones a una vez cada X tiempo
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================
// HOOKS OPTIMIZADOS
// ============================================

/**
 * useDebounce: Hook para valores debounceados
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useThrottle: Hook para valores throttleados
 */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = React.useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      },
      limit - (Date.now() - lastRan.current)
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

/**
 * useMemoCompare: useMemo con comparación personalizada
 */
export function useMemoCompare<T>(
  next: T,
  compare: (prev: T | undefined, next: T) => boolean
): T {
  const previousRef = useRef<T>();
  const previous = previousRef.current;

  const isEqual = compare(previous, next);

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  return isEqual && previous !== undefined ? previous : next;
}

/**
 * useStableCallback: Callback que no cambia de referencia
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []) as T;
}

// ============================================
// INTERACTION MANAGER
// ============================================

/**
 * useAfterInteractions: Ejecuta código después de animaciones
 */
export function useAfterInteractions(callback: () => void, deps: any[] = []) {
  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() => {
      callback();
    });

    return () => handle.cancel();
  }, deps);
}

/**
 * runAfterInteractions: Wrapper de InteractionManager
 */
export function runAfterInteractions<T>(
  task: () => T | Promise<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    InteractionManager.runAfterInteractions(() => {
      try {
        const result = task();
        if (result instanceof Promise) {
          result.then(resolve).catch(reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}

// ============================================
// MEMOIZACIÓN INTELIGENTE
// ============================================

/**
 * Comparador profundo simple para arrays
 */
export function areArraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, index) => item === b[index]);
}

/**
 * Comparador superficial para objetos
 */
export function areObjectsShallowEqual<T extends object>(
  a: T,
  b: T
): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => a[key as keyof T] === b[key as keyof T]);
}

// ============================================
// LAZY LOADING
// ============================================

/**
 * useLazyLoad: Carga componente después de render inicial
 */
export function useLazyLoad(delay: number = 0): boolean {
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isReady;
}

/**
 * Carga diferida de imágenes
 */
export class ImagePreloader {
  private static cache = new Set<string>();

  static preload(urls: string[]): Promise<void[]> {
    const promises = urls.map((url) => {
      if (this.cache.has(url)) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        if (Platform.OS === 'web') {
          const img = new Image();
          img.onload = () => {
            this.cache.add(url);
            resolve();
          };
          img.onerror = reject;
          img.src = url;
        } else {
          // En React Native, usar FastImage o Image.prefetch
          resolve();
        }
      });
    });

    return Promise.all(promises);
  }

  static isCached(url: string): boolean {
    return this.cache.has(url);
  }

  static clearCache(): void {
    this.cache.clear();
  }
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Mide tiempo de ejecución de función
 */
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    const duration = Date.now() - start;
    console.log(`⏱️ ${name}: ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    console.log(`❌ ${name} failed after ${duration}ms`);
    throw error;
  }
}

/**
 * Hook para medir renders
 */
export function useRenderCount(componentName: string) {
  const renders = useRef(0);

  useEffect(() => {
    renders.current += 1;
    if (__DEV__) {
      console.log(`🔄 ${componentName} rendered ${renders.current} times`);
    }
  });

  return renders.current;
}

/**
 * Hook para detectar renders innecesarios
 */
export function useWhyDidYouUpdate(
  name: string,
  props: Record<string, any>
) {
  const previousProps = useRef<Record<string, any>>();

  useEffect(() => {
    if (previousProps.current && __DEV__) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps: Record<string, { from: any; to: any }> = {};

      allKeys.forEach((key) => {
        if (previousProps.current![key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current![key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length > 0) {
        console.log('[why-did-you-update]', name, changedProps);
      }
    }

    previousProps.current = props;
  });
}

// ============================================
// BATCH UPDATES
// ============================================

/**
 * Agrupa múltiples actualizaciones de estado
 */
export function batchUpdates<T>(updates: Array<() => void>): void {
  // En React Native, unstable_batchedUpdates está disponible
  if (typeof (global as any).unstable_batchedUpdates === 'function') {
    (global as any).unstable_batchedUpdates(() => {
      updates.forEach((update) => update());
    });
  } else {
    updates.forEach((update) => update());
  }
}

// ============================================
// LISTA OPTIMIZADA
// ============================================

/**
 * Configuración recomendada para FlatList
 */
export const OptimizedFlatListConfig = {
  // Performance
  removeClippedSubviews: true,
  maxToRenderPerBatch: 10,
  updateCellsBatchingPeriod: 50,
  initialNumToRender: 10,
  windowSize: 5,
  
  // Evitar warnings
  getItemLayout: undefined, // Definir si items tienen altura fija
  
  // Mejoras visuales
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled' as const,
};

/**
 * Key extractor optimizado
 */
export function createKeyExtractor<T extends { id: string | number }>(
  prefix: string = 'item'
) {
  return (item: T, index: number) => `${prefix}-${item.id || index}`;
}

// ============================================
// EXPORTS
// ============================================

export default {
  debounce,
  throttle,
  useDebounce,
  useThrottle,
  useMemoCompare,
  useStableCallback,
  useAfterInteractions,
  runAfterInteractions,
  useLazyLoad,
  ImagePreloader,
  measureAsync,
  useRenderCount,
  useWhyDidYouUpdate,
  OptimizedFlatListConfig,
  createKeyExtractor,
};
