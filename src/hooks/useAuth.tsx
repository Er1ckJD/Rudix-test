// src/hooks/useAuth.tsx
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { AuthService } from '@/api/services/auth.service';
import { storage } from '@/utils/storage';
import { Alert } from 'react-native';
import { User, UserRole, AuthData } from '@/types/user';
import { LoginResponse } from '@/types/api';

interface SendOtpResponse {
    message: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    roles: UserRole[];
    activeRole: UserRole;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean, error?: string }>;
    register: (data: AuthData) => Promise<{ success: boolean, error?: string }>;
    verifyPhone: (phone: string) => Promise<{ success: boolean; data?: SendOtpResponse; error?: string; }>;
    verifyCode: (phone: string, code: string) => Promise<{ success: boolean; error?: string; }>;
    logout: () => void;
    switchActiveRole: (role: UserRole) => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'userToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [activeRole, setActiveRole] = useState<UserRole>('user');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar usuario al iniciar
    useEffect(() => {
        const loadUserFromToken = async () => {
            setLoading(true);
            try {
                const storedToken = await storage.getSecureItem(TOKEN_KEY);
                if (storedToken) {
                    setToken(storedToken);
                    
                    const response = await AuthService.getCurrentUser();
                    
                    if (response.user) {
                        setUser(response.user);
                        // Establecer rol activo basado en roles disponibles
                        if (response.user.roles.includes('driver')) {
                            setActiveRole('driver');
                        }
                    } else {
                        throw new Error('User data not found in response.');
                    }
                }
            } catch (e: any) {
                console.error("Session restore failed:", e.message);
                await AuthService.logout();
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUserFromToken();
    }, []);

    const clearError = () => setError(null);

    const processAuthResponse = async (response: LoginResponse) => {
        const { user: userData, token: authToken, refreshToken } = response;
        await storage.setSecureItem(TOKEN_KEY, authToken);
        if (refreshToken) {
            await storage.setSecureItem(REFRESH_TOKEN_KEY, refreshToken);
        }
        setUser(userData);
        setToken(authToken);
        setActiveRole('user');
    };
    
    const register = async (data: AuthData) => {
        setError(null);
        try {
            const response = await AuthService.register(data);
            await processAuthResponse(response);
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const login = async (email: string, password: string) => {
        setError(null);
        try {
            const response = await AuthService.login({ email, password });
            await processAuthResponse(response);
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const verifyPhone = async (phone: string) => {
        setError(null);
        try {
            const response = await AuthService.sendOTP({ telefono: phone });
            return { success: true, data: response };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const verifyCode = async (phone: string, code: string) => {
        setError(null);
        try {
            const response = await AuthService.verifyOTP({ telefono: phone, code });
            await processAuthResponse(response);
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
        setToken(null);
        setActiveRole('user');
    };
    
    const switchActiveRole = (role: UserRole) => {
        if (user?.roles.includes(role)) {
            setActiveRole(role);
        } else {
            console.warn(`User does not have the role: ${role}`);
        }
    };
    
    const value = {
        user,
        token,
        roles: user?.roles || [],
        activeRole,
        loading,
        error,
        login,
        register,
        verifyPhone,
        verifyCode,
        logout,
        switchActiveRole,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};