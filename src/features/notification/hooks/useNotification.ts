import { useContext } from 'react';
import { NotificationContext } from '../model/notification.store';
import type { NotificationContextValue } from '../model/notification.types';

export function useNotification(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be within a NotificationProvider');
  return ctx;
}
