import { useEffect, useRef } from 'react';
import { useNotification } from '../../features/notification/hooks/useNotification';
import type { Notification, NotificationType } from '../../features/notification/model/notification.types';

const STYLES: Record<NotificationType, { container: string; icon: string }> = {
  error: {
    container: 'bg-red-50 border-red-400 text-red-800',
    icon: '✕',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    icon: '⚠',
  },
  success: {
    container: 'bg-green-50 border-green-400 text-green-800',
    icon: '✓',
  },
  info: {
    container: 'bg-blue-50 border-blue-400 text-blue-800',
    icon: 'ℹ',
  },
};

function NotificationItem({ notification }: { notification: Notification }) {
  const { removeNotification } = useNotification();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { container, icon } = STYLES[notification.type];
  const duration = notification.duration ?? 5000;

  useEffect(() => {
    if (duration === 0) return;
    timerRef.current = setTimeout(() => removeNotification(notification.id), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [notification.id, duration, removeNotification]);

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-lg border-l-4 px-4 py-3 shadow-md ${container} w-80 max-w-full`}
    >
      <span className="mt-0.5 shrink-0 font-bold" aria-hidden="true">
        {icon}
      </span>
      <p className="flex-1 text-sm leading-snug">{notification.message}</p>
      <button
        onClick={() => removeNotification(notification.id)}
        aria-label="Fermer la notification"
        className="shrink-0 opacity-60 hover:opacity-100 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
}

export function NotificationStack() {
  const { notifications } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
    >
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  );
}