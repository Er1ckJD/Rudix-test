// src/types/navigation.ts
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';

// ============================================
// ROOT STACK
// ============================================
export type RootStackParamList = {
  '(auth)': undefined;
  '(onboarding)': undefined;
  '(passenger)': undefined;
  '(driver)': undefined;
  'chat/[id]': { id: string };
  '+not-found': undefined;
};

// ============================================
// AUTH STACK
// ============================================
export type AuthStackParamList = {
  index: undefined;
  'login-options': undefined;
  'phone-input': undefined;
  'verify-code': { phone: string };
};

// ============================================
// ONBOARDING STACK
// ============================================
export type OnboardingStackParamList = {
  security: undefined;
  comfort: undefined;
};

// ============================================
// PASSENGER STACK
// ============================================
export type PassengerStackParamList = {
  '(home)': undefined;
  ride: undefined;
  fidelity: undefined;
  notifications: undefined;
  profile: undefined;
  safety: undefined;
  settings: undefined;
  support: undefined;
};

export type PassengerHomeTabsParamList = {
  index: undefined;
  history: undefined;
  activity: undefined;
};

export type RideStackParamList = {
  search: undefined;
  'select-service': { destination: string };
  tracking: undefined;
  rating: { tripId: string };
};

// ============================================
// DRIVER STACK
// ============================================
export type DriverStackParamList = {
  '(home)': undefined;
  register: undefined;
  earnings: undefined;
  fidelity: undefined;
  settings: undefined;
  support: undefined;
};

export type DriverRegisterStackParamList = {
  index: undefined;
  'personal-info': undefined;
  license: undefined;
  'service-type': undefined;
  'vehicle-info': { type: 'standard' | 'lux' };
  'almost-there': undefined;
  'optional-docs': undefined;
  contract: undefined;
  notifications: undefined;
  success: undefined;
};

// ============================================
// SCREEN PROPS TYPES
// ============================================
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

export type PassengerHomeTabsScreenProps<T extends keyof PassengerHomeTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<PassengerHomeTabsParamList, T>,
    DrawerScreenProps<PassengerStackParamList>
  >;

// Declara el tipo global de navegación
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}