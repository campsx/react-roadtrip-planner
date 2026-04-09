# /new-api

Create a new API module for a feature, following the one-function-per-file pattern.

## Usage

```
/new-api <feature> <action1> [action2] ...
```

Example: `/new-api trips getAll getById create remove`

## What to generate

For each action, create one file under `src/features/<feature>/api/`:

```
src/features/<feature>/api/
├── <action1>.ts
├── <action2>.ts
├── mappers.ts      # only if raw→typed mapping is needed
└── index.ts        # aggregates all actions into <feature>Api
```

## Rules

- `index.ts` **only** aggregates — never implement logic inside it.
- Each function file has a single named `async` export matching the file name.
- All functions import the Axios instance from `src/lib/client.ts`.
- Return typed promises; no error handling inside — let the caller decide.
- Raw API shapes that differ from domain types go in `mappers.ts`.

## Template

```ts
// src/features/<feature>/api/<action>.ts
import { client } from '@/lib/client';
import type { <Resource> } from '../model/<feature>.types';

export async function <action>(...): Promise<<Resource>> {
  const { data } = await client.get('/<endpoint>');
  return data;
}

// src/features/<feature>/api/index.ts
import { <action1> } from './<action1>';
import { <action2> } from './<action2>';

export const <feature>Api = {
  <action1>,
  <action2>,
};
```