import { createContext, useCallback, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useNotification } from '../../notification/hooks/useNotification';
import type { AuthUser, AuthContextValue } from './auth.types';

export const AuthContext = createContext<AuthContextValue | null>(null);

function getStoredUser(): AuthUser | null {
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');
  if (accessToken && username) return { accessToken, username };
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const authUser = await authApi.login(username, password);
      localStorage.setItem('accessToken', authUser.accessToken);
      localStorage.setItem('username', authUser.username);
      setUser(authUser);
      navigate('/countries');
    } catch (err: unknown) {
      const message = (err as { message?: string }).message ?? 'Identifiants incorrects.';
      addNotification({ type: 'error', message });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, addNotification]);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
