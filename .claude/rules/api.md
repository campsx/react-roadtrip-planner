# API Guidelines

## One-function-per-file pattern

```ts
// src/features/<name>/api/<action>.ts
import { client } from '@/lib/client';
import type { Resource } from '../model/<name>.types';

export async function <action>(...): Promise<Resource> {
  const { data } = await client.get('/<endpoint>');
  return data;
}

// src/features/<name>/api/index.ts  — aggregation only
import { <action> } from './<action>';

export const <name>Api = { <action> };
```

## Rules

- `index.ts` **only** aggregates — never implement logic inside it.
- **Never** edit a function from `index.ts` — always edit the source file (`<action>.ts`).
- Consume via `featureApi.method()` — never call `client` directly from a component.
- API functions return typed promises; errors are handled at the call site, not inside.

## Mappers (`mappers.ts`)

When the raw API shape differs from the domain type, add a `mappers.ts` alongside the action files:

```ts
// src/features/<name>/api/mappers.ts
import type { RawResource } from '@/api/types';
import type { Resource } from '../model/<name>.types';

export function mapResource(raw: RawResource): Resource { ... }
```

Import mappers inside the action file — not in `index.ts`.

## Axios client (`src/api/client.ts`)

- Lives at `src/lib/client.ts`. Base URL from `env.API_URL` (`VITE_API_BASE_URL`).
- **Request interceptor:** attaches `Authorization: Bearer <token>` from `localStorage.accessToken` when present.
- **Response interceptor:** on 401 (non-login requests), clears `localStorage` and redirects to `/login`. Normalises errors to `{ status, message }`.
