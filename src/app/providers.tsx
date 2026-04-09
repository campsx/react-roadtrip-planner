import type { ReactNode } from 'react';
import { AuthProvider } from '@/features/auth/model/auth.store';
import { NotificationProvider } from '@/features/notification/model/notification.store';
import { RoadtripProvider } from '@/features/roadtrip/model/roadtrip.store';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <RoadtripProvider>{children}</RoadtripProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
