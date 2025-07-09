"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthState } from "@/types/auth";
import { getCurrentUser, clearUserData } from "@/lib/auth";

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing user session on mount
    const checkAuth = () => {
      try {
        const user = getCurrentUser();
        setAuthState({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        });
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = (user: User) => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    clearUserData();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
