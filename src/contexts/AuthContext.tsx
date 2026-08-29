"use client";

import type { AuthState } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const refreshToken = useCallback(async () => {
    try {
      const res = await fetch("api/auth/refresh", { method: "POST" });
      if (!res.ok) return false;
      const data = await res.json();

      setAccessToken(data.accessToken);
      setIsAuthenticated(true);
      if (!user) setUser({ username: "admin" });

      return true;
    } catch {
      return false;
    }
  }, [user]);

  const startRefreshTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(
      async () => {
        const success = await refreshToken();
        if (!success) {
          setIsAuthenticated(false);
          setUser(null);
          setAccessToken(null);
          if (intervalRef.current) clearInterval(intervalRef.current);
          router.push("/login");
        }
      },
      13 * 60 * 1000,
    );
  }, [refreshToken, router]);

  const stopRefreshTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      try {
        const res = await fetch("api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
          return false;
        }

        const data = await res.json();

        // update state
        setAccessToken(data.accessToken);
        setUser(data.user);
        setIsAuthenticated(true);

        startRefreshTimer();

        router.push("/dashboard");

        return true;
      } catch {
        return false;
      }
    },
    [router, startRefreshTimer],
  );

  const logout = useCallback(async () => {
    try {
      await fetch("api/auth/logout", { method: "POST" });
    } catch {}

    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);

    stopRefreshTimer();

    router.push("/login");
  }, [router, stopRefreshTimer]);

  useEffect(() => {
    const tryRefresh = async () => {
      const success = await refreshToken();

      if (success) {
        startRefreshTimer();
      }

      setIsLoading(false);
    };

    tryRefresh();

    return () => stopRefreshTimer();
  }, [refreshToken, startRefreshTimer, stopRefreshTimer]);

  const value = {
    isAuthenticated,
    user,
    accessToken,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//* Custom hook for consuming the context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
