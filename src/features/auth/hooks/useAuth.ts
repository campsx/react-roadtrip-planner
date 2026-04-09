import { useContext } from 'react';
import { AuthContext } from '../model/auth.store';
import type { AuthContextValue } from '../model/auth.types';

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
