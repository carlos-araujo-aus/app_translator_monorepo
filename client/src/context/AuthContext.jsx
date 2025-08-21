import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser as loginApi } from '../services/api'; // Import our api service

// 1. Create the context
const AuthContext = createContext(null);

// Custom hook to use the auth context easily
export const useAuth = () => {
    return useContext(AuthContext);
};

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This effect runs on initial load to check if a token exists
        if (token) {
            setUser({ isAuthenticated: true });
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const response = await loginApi({ email, password });
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser({ isAuthenticated: true });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    // The value that will be available to all children components
    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token, // easy boolean check
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};