# Coding Conventions

## Exports

- **Named exports** everywhere except page-level route components and `main.tsx`.
- Page components use **default export** (required by `React.lazy`).

## Components

- Functional components only — no class components.
- Extract logic into custom hooks when a component exceeds ~80 lines.
- Use React 19 features where appropriate: `use()`, Actions, `useOptimistic`, `useFormStatus`.

## TypeScript

- Never suppress errors with `@ts-ignore` — fix them properly.
- Prefer explicit return types on API functions and hooks.

## Environment variables

- Must be prefixed with `VITE_`.
- **Never** access `import.meta.env` directly — always go through `src/config/env.ts`.
- Never commit `.env` files; keep `.env.example` as a template.

```ts
// src/config/env.ts — single source of truth
export const env = {
  API_URL: import.meta.env.VITE_API_BASE_URL,
  APP_ENV: import.meta.env.VITE_APP_ENV,
  IS_DEV:  import.meta.env.DEV,
};
```

## Testing

- Co-locate tests next to the file they test: `Component.test.tsx`.

## Do / Don't

| Do | Don't |
|----|-------|
| Use `@/` path alias for all `src/` imports | Use relative `../../` paths from deep files |
| Update CLAUDE.md when changing structure or conventions | Leave conventions implicit or undocumented |
| Discuss before adding state-management libs | Install Redux/Zustand/Jotai without discussion |