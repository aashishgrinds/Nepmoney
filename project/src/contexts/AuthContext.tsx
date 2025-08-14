import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { LocalStorage } from '../lib/storage';
import { DEMO_USER } from '../lib/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = LocalStorage.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'demo' && password === 'demo123') {
      setUser(DEMO_USER);
      LocalStorage.setUser(DEMO_USER);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    LocalStorage.removeUser();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}