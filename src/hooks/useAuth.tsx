// src/hooks/useAuth.tsx
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { apiClient } from '@/api/client';
import { saveToken, deleteToken, getToken } from '@/api/storage';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import { User, UserRole, AuthData, AuthResponse } from '@/types/user';

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
                const storedToken = await getToken();
                if (storedToken) {
                    setToken(storedToken);
                    
                    const response = await apiClient.get<{ user: User }>('/auth/me');
                    
                    if (response.data?.user) {
                        setUser(response.data.user);
                        // Establecer rol activo basado en roles disponibles
                        if (response.data.user.roles.includes('driver')) {
                            setActiveRole('driver');
                        }
                    } else {
                        throw new Error('User data not found in response.');
                    }
                }
            } catch (e) {
                console.error("Session restore failed:", e);
                await deleteToken();
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUserFromToken();
    }, []);

    const handleError = (err: unknown): string => {
        let errorMessage = 'An unknown error occurred.';
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || 'Error de conexión';
        } else if (err instanceof Error) {
            errorMessage = err.message;
        }

        Alert.alert('Error de Autenticación', errorMessage);
        return errorMessage;
    };

    const clearError = () => setError(null);

    const register = async (data: AuthData) => {
        setError(null);
        try {
            const response = await apiClient.post<AuthResponse>('/auth/register', data);
            const { user: userData, token: authToken } = response.data;
            await saveToken(authToken);
            setUser(userData);
            setToken(authToken);
            setActiveRole('user');
            return { success: true };
        } catch (err) {
            const errorMessage = handleError(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const login = async (email: string, password: string) => {
        setError(null);
        try {
            const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
            const { user: userData, token: authToken } = response.data;
            await saveToken(authToken);
setUser(userData);
            setToken(authToken);
            setActiveRole('user');
            return { success: true };
        } catch (err) {
            const errorMessage = handleError(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const verifyPhone = async (phone: string) => {
        setError(null);
        try {
            const response = await apiClient.post<SendOtpResponse>('/auth/send-otp', { telefono: phone });
            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = handleError(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const verifyCode = async (phone: string, code: string) => {
        setError(null);
        try {
            const response = await apiClient.post<AuthResponse>('/auth/verify-otp', { telefono: phone, code });
            const { user: userData, token: authToken } = response.data;
            await saveToken(authToken);
            setUser(userData);
            setToken(authToken);
            setActiveRole('user');
            return { success: true };
        } catch (err) {
            const errorMessage = handleError(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        await deleteToken();
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
    
    // Mock login solo en desarrollo
    useEffect(() => {
        if (__DEV__) {
            const mockLogin = async () => {
                console.log('Attempting mock login...');
                setError(null);
                try {
                    const mockUser: User = {
                        id: 'dev-mock-id',
                        nombres: 'Dev',
                        apellidos: 'User',
                        email: 'dev@rudix.com',
                        telefono: '9876543210',
                        roles: ['user', 'driver'],
                        photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
                        rating: 4.95,
                        totalTrips: 124,
                        fidelityLevel: 'plus',
                    };
                    const mockToken = 'dev-mock-token';

                    await saveToken(mockToken);
                    setUser(mockUser);
                    setToken(mockToken);
                    setActiveRole('user');
                    console.log('✅ Mock Login Successful!');
                } catch (err) {
                    const errorMessage = handleError(err);
                    setError(errorMessage);
                    console.error('❌ Mock Login Failed:', errorMessage);
                }
            };
            
            (global as any).mockLogin = mockLogin;
            console.log('🔧 Mock login available: global.mockLogin()');

            return () => {
                delete (global as any).mockLogin;
            };
        }
    }, []);

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