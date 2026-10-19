import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserPreferences } from '../types';
import { api, getStoredToken, clearStoredToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  login: (email: string, pass: string) => Promise<void>;
  register: (details: { email: string; password: string; name: string; callsign?: string }) => Promise<void>;
  quickDemoLogin: () => Promise<void>;
  logout: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      api.auth
        .me()
        .then((res) => {
          setUser(res.user);
        })
        .catch(() => {
          clearStoredToken();
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await api.auth.login({ email, password: pass });
    setUser(res.user);
    setAuthModalOpen(false);
  };

  const register = async (details: { email: string; password: string; name: string; callsign?: string }) => {
    const res = await api.auth.register(details);
    setUser(res.user);
    setAuthModalOpen(false);
  };

  const quickDemoLogin = async () => {
    await login('operative@noir.ai', 'noir2026');
  };

  const logout = () => {
    api.auth.logout();
    setUser(null);
  };

  const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    if (!user) return;
    const res = await api.auth.updateProfile({
      preferences: { ...user.preferences, ...prefs },
    });
    setUser(res.user);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const res = await api.auth.updateProfile(updates);
    setUser(res.user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        login,
        register,
        quickDemoLogin,
        logout,
        updatePreferences,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
