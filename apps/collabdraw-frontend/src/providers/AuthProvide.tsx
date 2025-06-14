"use client";

import React , { createContext, useContext, useEffect, useState } from "react";

interface AuthContext {
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContext>({
    token: null,
    setToken: () => {},
    isAuthenticated: false,
    logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if(storedToken) {
            setTokenState(storedToken);
        }
    }, []);

    const setToken = (token: string | null) => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
        setTokenState(token);
    }

    const logout = () => {
        setToken(null);
        setTokenState(null);
    }

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated: !!token, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);