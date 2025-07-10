"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { User, AuthState } from "@/types/auth";
import { getCurrentUser, clearUserData, isAuthenticated } from "@/lib/auth";

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
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
        const authenticated = isAuthenticated();

        setAuthState({
          user,
          isAuthenticated: authenticated,
          isLoading: false,
        });

        // Redirect logic
        if (!authenticated && pathname !== "/login") {
          console.log("No valid token found, redirecting to login");
          router.push("/login");
        } else if (authenticated && pathname === "/login") {
          console.log("User is authenticated, redirecting to home");
          router.push("/");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        if (pathname !== "/login") {
          router.push("/login");
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

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
    // Redirect to login after logout
    router.push("/login");
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
