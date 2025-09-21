"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      api.setToken(storedToken);
      const response = await api.getCurrentUser();
      if (response.data) {
        setUser(response.data.user);
        setToken(storedToken);
      } else {
        // Invalid token
        localStorage.removeItem('token');
        api.setToken(null);
      }
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const response = await api.login(email, password);
    if (response.data) {
      const { token: newToken, user: userData } = response.data;
      localStorage.setItem('token', newToken);
      api.setToken(newToken);
      setUser(userData);
      setToken(newToken);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const response = await api.register(name, email, password);
    if (response.data) {
      const { token: newToken, user: userData } = response.data;
      localStorage.setItem('token', newToken);
      api.setToken(newToken);
      setUser(userData);
      setToken(newToken);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    api.setToken(null);
    setUser(null);
    setToken(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}