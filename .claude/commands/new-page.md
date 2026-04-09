# /new-page

Create a new route page component.

## Usage

```
/new-page <PageName>
```

## What to generate

1. `src/pages/<PageName>/<PageName>.tsx` — default export, functional component
2. `src/pages/<PageName>/index.ts` — re-exports the default
3. Add the route to `src/router.tsx` with `React.lazy` + `Suspense`

## Template

```tsx
// src/pages/<PageName>/<PageName>.tsx
export default function <PageName>Page() {
  return (
    <main>
      <h1><PageName></h1>
    </main>
  );
}
```