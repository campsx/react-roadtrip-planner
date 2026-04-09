import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';
import type { Notification, NotificationContextValue } from './notification.types';

type Action =
  | { type: 'ADD'; payload: Notification }
  | { type: 'REMOVE'; id: string };

function reducer(state: Notification[], action: Action): Notification[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((n) => n.id !== action.id);
    default:
      return state;
  }
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(reducer, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>): string => {
      const id = crypto.randomUUID();
      dispatch({ type: 'ADD', payload: { duration: 5000, ...notification, id } });
      return id;
    },
    [],
  );

  useEffect(() => {
    function handleUnhandledRejection(event: PromiseRejectionEvent) {
      const message =
        event.reason instanceof Error
          ? event.reason.message
          : 'Une erreur inattendue est survenue.';
      addNotification({ type: 'error', message, duration: 0 });
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
