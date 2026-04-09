# Routing

## Setup

Routes are defined centrally in `src/router.tsx` using `createBrowserRouter`.

```tsx
// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';

const CountriesPage = React.lazy(() => import('@/pages/Countries/page'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <CountriesPage />
      </Suspense>
    ),
  },
]);
```

## Page files

`src/pages/<Name>/page.tsx` — thin re-export proxy, **default export**:

```tsx
// src/pages/Countries/page.tsx
export { CountriesPage as default } from '@/features/countries/components/CountriesPage';
```

The actual page component lives inside the feature's `components/` folder.

## Auth guard

`src/features/auth/components/ProtectedRoute.tsx` wraps routes that require authentication.  
Unauthenticated users are redirected to `/login`.