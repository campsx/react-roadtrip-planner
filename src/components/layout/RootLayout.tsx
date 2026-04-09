import { Outlet } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { useNotification } from '@/features/notification/hooks/useNotification';
import { NotificationStack } from '@/components/ui/NotificationStack';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export function RootLayout() {
  return (
    <AppProviders>
      <RootContent />
    </AppProviders>
  );
}

function RootContent() {
  const { addNotification } = useNotification();

  return (
    <>
      <ErrorBoundary onError={(message) => addNotification({ type: 'error', message, duration: 0 })}>
        <Outlet />
      </ErrorBoundary>
      <NotificationStack />
    </>
  );
}
