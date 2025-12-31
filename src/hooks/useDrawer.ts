import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useCallback } from 'react';

/**
 * Custom hook to control a Drawer navigator.
 * Abstracts away the direct use of navigation.dispatch and DrawerActions.
 */
export function useDrawer() {
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const closeDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }, [navigation]);

  const toggleDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }, [navigation]);

  return { openDrawer, closeDrawer, toggleDrawer };
}
