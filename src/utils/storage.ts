// src/utils/storage.ts
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Unified storage utility.
 * Provides a single interface for both standard (AsyncStorage) and
 * secure (SecureStore) storage.
 */
export const storage = {
  /**
   * Methods for non-sensitive data using AsyncStorage.
   * Ideal for user preferences, settings, etc.
   */
  // --- Standard Storage ---
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error('Failed to fetch from standard storage', e);
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('Failed to save to standard storage', e);
      return false;
    }
  },
  removeItem: async (key: string): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Failed to remove from standard storage', e);
      return false;
    }
  },

  /**
   * Methods for sensitive data using SecureStore.
   * Ideal for auth tokens, API keys, etc.
   */
  // --- Secure Storage ---
  getSecureItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error('Failed to fetch from secure storage', e);
      return null;
    }
  },
  setSecureItem: async (key: string, value: string): Promise<boolean> => {
    try {
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (e) {
      console.error('Failed to save to secure storage', e);
      return false;
    }
  },
  removeSecureItem: async (key: string): Promise<boolean> => {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (e) {
      console.error('Failed to remove from secure storage', e);
      return false;
    }
  },
  
  // --- Bulk Operations ---
  clearAll: async () => {
      // Be careful with this!
      await AsyncStorage.clear();
      // Note: SecureStore does not have a bulk clear method.
      // You would need to remove items by key.
  }
};
