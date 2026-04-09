export type NotificationType = 'error' | 'success' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  /** Durée en ms avant fermeture auto. 0 = pas de fermeture auto. Défaut : 5000 */
  duration?: number;
}

export interface NotificationContextValue {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
}
