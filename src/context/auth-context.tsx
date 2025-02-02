'use client'

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import React, { createContext } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    signIn: (token: string) => void;
    signOut: () => void;
    recoveryToken: () => string | undefined;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    
    var isAuthenticated = !!recoveryToken();

    function signIn(token: string) {
        setCookie("ClassExchange.token", token, {
            maxAge: 60 * 60 * 3 // 3 hours
        });
    }

    function signOut() {
        deleteCookie("ClassExchange.token");
    }

    function recoveryToken() {
        const cookie = getCookie("ClassExchange.token");
        const token = cookie?.toString();
        return token;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, recoveryToken }}>
            {children}
        </AuthContext.Provider>
    )
}