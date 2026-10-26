import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";
import { setAuthToken } from "../api/client";
import authService, { AuthResult } from "../services/authService";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AUTH_KEY = "@bookstore_auth";
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setAuthToken(null);
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_KEY);
        if (!raw) return;
        const saved: AuthResult = JSON.parse(raw);

        if (!saved.token || saved.expiresAt <= Date.now()) {
          await logout();
          return;
        }

        setAuthToken(saved.token);
        try {
          const verifiedUser = await authService.getMe(saved.user.id);
          setUser(verifiedUser);
          setToken(saved.token);
        } catch (err: any) {
          if ([401, 403, 404].includes(err?.response?.status)) {
            await logout();
          } else {
            // Mất mạng: vẫn duy trì dữ liệu offline tạm thời
            setUser(saved.user);
            setToken(saved.token);
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await authService.login(email, pass);
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(res));
    setAuthToken(res.token);
    setUser(res.user);
    setToken(res.token);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
