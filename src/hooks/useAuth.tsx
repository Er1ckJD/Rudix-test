import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { apiClient } from '@/api/client';
import { saveToken, deleteToken, getToken } from '@/api/storage';
import { AxiosError } from 'axios';

// Define user role
type UserRole = 'user' | 'driver';

// Update User interface
interface User {
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  // Let's assume the API will provide the roles a user has
  roles: UserRole[]; 
}

interface AuthData {
    nombres?: string;
    apellidos?: string;
    telefono?: string;
    email?: string;
    password?: string;
}

// Define the shape of the context
interface AuthContextType {
    user: User | null;
    token: string | null;
    activeRole: UserRole;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean, error?: string }>;
    register: (data: AuthData) => Promise<{ success: boolean, error?: string }>;
    verifyPhone: (phone: string) => Promise<{ success: boolean; data?: any; error?: string; }>;
    verifyCode: (phone: string, code: string) => Promise<{ success: boolean; error?: string; }>;
    logout: () => void;
    switchActiveRole: (role: UserRole) => void;
    mockLogin: () => Promise<void>; // Add mockLogin to the interface
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [activeRole, setActiveRole] = useState<UserRole>('user'); // Default role
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // This effect runs once on startup to check for an existing token
    useEffect(() => {
        const loadUserFromToken = async () => {
            try {
                const storedToken = await getToken();
                if (storedToken) {
                    setToken(storedToken);
                    // We will not set a mock user here.
                    // The user will be null until they log in.
                }
            } catch (e) {
                // Handle token loading error
                console.error("Failed to load token", e);
            } finally {
                setLoading(false);
            }
        };
        loadUserFromToken();
    }, []);

    const handleError = (err: unknown) => {
        if (err instanceof AxiosError) {
            return err.response?.data?.message || 'Error de conexión';
        }
        if (err instanceof Error) {
            return err.message;
        }
        return 'An unknown error occurred.';
    };

    // --- Authentication Functions ---

    const register = async (data: AuthData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post('/auth/register', data);
            const { user: userData, token: authToken } = response.data;
            await saveToken(authToken);
            setUser(userData);
            setToken(authToken);
            setActiveRole(userData.roles.includes('driver') ? 'driver' : 'user');
            return { success: true };
        } catch (err) {
            const errorMessage = handleError(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { user: userData, token: authToken } = response.data;
            await saveToken(authToken);
            setUser(userData);
            setToken(authToken);
            setActiveRole(userData.roles?.includes('driver') ? 'driver' : 'user');
            return { success: true };
        } catch (err) {
            const errorMessage = handleError(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const verifyPhone = async (phone: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post('/auth/send-otp', { telefono: phone });
            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = handleError(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async (phone: string, code: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post('/auth/verify-otp', { telefono: phone, code });
            const { user: userData, token: authToken } = response.data;
            await saveToken(authToken);
            setUser(userData);
            setToken(authToken);
            setActiveRole(userData.roles?.includes('driver') ? 'driver' : 'user');
            return { success: true };
        } catch (err) {
            const errorMessage = handleError(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await deleteToken();
        setUser(null);
        setToken(null);
        setActiveRole('user'); // Reset to default on logout
    };
    
    // --- Role Switching Function ---
    const switchActiveRole = (role: UserRole) => {
        if (user?.roles.includes(role)) {
            setActiveRole(role);
        } else {
            console.warn(`User does not have the role: ${role}`);
        }
    };

    // --- Mock Login Function for Development ---
    const mockLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const mockUser: User = {
                id: 'dev-mock-id',
                nombres: 'Dev',
                apellidos: 'User',
                email: 'dev@rudix.com',
                telefono: '9876543210',
                roles: ['user', 'driver']
            };
            const mockToken = 'dev-mock-token'; // A dummy token

            await saveToken(mockToken);
            setUser(mockUser);
            setToken(mockToken);
            setActiveRole('user'); // Default to user role after mock login
            console.log('Mock Login Successful!');
        } catch (err) {
            const errorMessage = handleError(err);
            setError(errorMessage);
            console.error('Mock Login Failed:', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // The value provided to the context consumers
    const value = {
        user,
        token,
        activeRole,
        loading,
        error,
        login,
        register,
        verifyPhone,
        verifyCode,
        logout,
        switchActiveRole,
        mockLogin // Add mockLogin to the context value
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create the custom hook for consuming the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};