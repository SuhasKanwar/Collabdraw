"use client";

import React , { createContext, useContext, useEffect, useState } from "react";

interface AuthContext {
    token: string | null;
    user: any;
    setToken: (token: string | null) => void;
    setUser: (user: any) => void;
    isAuthenticated: boolean;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContext>({
    token: null,
    user: null,
    setToken: () => {},
    setUser: () => {},
    isAuthenticated: false,
    logout: () => {},
    isLoggedIn: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [user, setUserState] = useState<any>(null);

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

    const setUser = (user: any) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
        setUserState(JSON.parse(localStorage.getItem("user") || "null"));
    }

    const logout = () => {
        setToken(null);
        setTokenState(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, setToken, setUser, isAuthenticated: !!token, logout, isLoggedIn: !!token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);