import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { Spinner } from '@/components/ui/Spinner';

const LoginPage = lazy(() => import('./pages/Login/page'));
const CountriesPage = lazy(() => import('./pages/Countries/page'));
const CountryDetailPage = lazy(() => import('./pages/CountryDetail/page'));
const RoadtripPage = lazy(() => import('./pages/Roadtrip/page'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFound'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: withSuspense(LoginPage),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Layout />,
            children: [
              {
                index: true,
                element: <Navigate to="/countries" replace />,
              },
              {
                path: 'countries',
                element: withSuspense(CountriesPage),
              },
              {
                path: 'countries/:code',
                element: withSuspense(CountryDetailPage),
              },
              {
                path: 'roadtrip',
                element: withSuspense(RoadtripPage),
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: withSuspense(NotFoundPage),
      },
    ],
  },
]);
