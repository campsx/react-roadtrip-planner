# /new-feature

Analyse a feature creation request, produce a structured plan, ask for confirmation, then scaffold the full feature slice.

## Usage

```
/new-feature <featureName> [description]
```

Examples:
- `/new-feature bookmarks`
- `/new-feature trips manage road trip itineraries`

## What this command must do

### Step 1 — Analyse

Before writing anything:

1. Read `src/features/` to understand existing patterns and avoid naming collisions.
2. Determine which sub-folders are needed — all features get `model/` + `hooks/` + `components/`; add `api/` only if remote data is involved.
3. List all files to create.
4. Identify any existing code this feature must integrate with (router, `AppProviders`, shared components).

### Step 2 — Produce `CLAUDE_ACTION/FEATURE.md`

Create (or overwrite) `CLAUDE_ACTION/FEATURE.md` at the project root:

```md
# New feature — <featureName>

## Description
<What this feature does and why it is needed.>

## Scope
- Remote data (API): yes / no
- Context / store: yes / no
- New route: yes / no

## Files to create

| File | Purpose |
|------|---------|
| `src/features/<name>/model/<name>.types.ts` | Domain types |
| `src/features/<name>/model/<name>.store.tsx` | React context + provider |
| `src/features/<name>/hooks/use<Name>.ts` | Public hook |
| `src/features/<name>/components/<Name>Page.tsx` | Page component |
| `src/features/<name>/api/<action>.ts` | API call (if applicable) |
| `src/features/<name>/api/index.ts` | API aggregator (if applicable) |
| `src/app/pages/<Name>/page.tsx` | Router proxy page (if applicable) |

## Integration points

| Where | Change |
|-------|--------|
| `src/app/router.tsx` | Add route (if applicable) |
| `src/app/providers.tsx` | Add provider to AppProviders (if applicable) |

## Risks / points of attention
<Naming conflicts, shared state, auth requirements, etc.>
```

### Step 3 — Ask for confirmation

Display a summary and ask:

> Plan written to `CLAUDE_ACTION/FEATURE.md`. Proceed with scaffolding? (yes / no / modify the plan)

Do not create any files before receiving confirmation.

### Step 4 — Scaffold

If confirmed:

1. Create each file in the order listed in `CLAUDE_ACTION/FEATURE.md`.
2. Use the templates below — adapt content to the feature name and description.
3. Run `npm run type-check` and `npm run lint` once all files are created.

## Templates

### `model/<name>.types.ts`

```ts
export interface <Name> {
  id: string;
  // add fields here
}
```

### `model/<name>.store.tsx`

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { <Name> } from './<name>.types';

interface <Name>ContextValue {
  items: <Name>[];
  setItems: (items: <Name>[]) => void;
}

const <Name>Context = createContext<<Name>ContextValue | null>(null);

export function <Name>Provider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<<Name>[]>([]);
  return (
    <<Name>Context.Provider value={{ items, setItems }}>
      {children}
    </<Name>Context.Provider>
  );
}

export function use<Name>Context() {
  const ctx = useContext(<Name>Context);
  if (!ctx) throw new Error('use<Name>Context must be used inside <Name>Provider');
  return ctx;
}
```

### `hooks/use<Name>.ts`

```ts
import { use<Name>Context } from '../model/<name>.store';

export function use<Name>() {
  return use<Name>Context();
}
```

### `components/<Name>Page.tsx`

```tsx
export function <Name>Page() {
  return (
    <main>
      <h1><Name></h1>
    </main>
  );
}
```

### `api/<action>.ts` (if applicable)

```ts
import { client } from '@/lib/client';
import type { <Name> } from '../model/<name>.types';

export async function <action>(): Promise<<Name>[]> {
  const { data } = await client.get('/<endpoint>');
  return data;
}
```

### `api/index.ts` (if applicable)

```ts
import { <action> } from './<action>';

export const <name>Api = { <action> };
```

### `src/app/pages/<Name>/page.tsx` (if applicable)

```tsx
export { <Name>Page as default } from '@/features/<name>/components/<Name>Page';
```

### Step 5 — Close

Update `CLAUDE_ACTION/FEATURE.md`:
- Mark all files as created.
- Add a `## Result` section listing the created files and any integration changes made.

## Rules

- Never create files without having produced `CLAUDE_ACTION/FEATURE.md` first.
- Never skip confirmation before scaffolding.
- The `hooks/use<Name>.ts` public hook is the **only** entry point for other features — never expose the context directly.
- If a new route is added → update `src/app/router.tsx` in the same session.
- If a provider is added → add it to `src/app/providers.tsx` in the same session.