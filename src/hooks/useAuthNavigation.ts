import { useState } from 'react';

export type AuthScreen =
    | 'preregister'
    | 'welcome'
    | 'phoneVerification'
    | 'codeVerification'
    | 'login'
    | 'locationPermission';

export const useAuthNavigation = (initialScreen: AuthScreen = 'welcome') => {
    const [currentScreen, setCurrentScreen] = useState<AuthScreen>(initialScreen);
    const [navigationHistory, setNavigationHistory] = useState<AuthScreen[]>([initialScreen]);

    const navigateTo = (screen: AuthScreen) => {
        setCurrentScreen(screen);
        setNavigationHistory(prev => [...prev, screen]);
    };

    const goBack = () => {
        if (navigationHistory.length > 1) {
            const newHistory = [...navigationHistory];
            newHistory.pop();
            const previousScreen = newHistory[newHistory.length - 1];
            setCurrentScreen(previousScreen);
            setNavigationHistory(newHistory);
        }
    };

    const reset = () => {
        setCurrentScreen('welcome');
        setNavigationHistory(['welcome']);
    };

    return {
        currentScreen,
        navigateTo,
        goBack,
        reset,
        canGoBack: navigationHistory.length > 1
    };
};