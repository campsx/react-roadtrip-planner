# Tech Stack

| Layer      | Choice                       | Version  |
|------------|------------------------------|----------|
| UI         | React                        | 19       |
| Styles     | Tailwind CSS (Vite plugin)   | 4        |
| Routing    | React Router DOM             | 7        |
| HTTP       | Axios                        | 1.x      |
| Build      | Vite                         | 6        |
| Language   | TypeScript                   | 6        |
| Linting    | ESLint 9 + typescript-eslint | 9 / 8    |
| Formatting | Prettier                     | 3        |

**Node requirement:** `>=24.0.0` (set in `package.json` engines).

## Available npm scripts

| Script           | Command                    |
|------------------|----------------------------|
| `dev`            | `vite`                     |
| `build`          | `tsc -b && vite build`     |
| `preview`        | `vite preview`             |
| `lint`           | `eslint .`                 |
| `lint:fix`       | `eslint . --fix`           |
| `format`         | `prettier --write .`       |
| `type-check`     | `tsc --noEmit`             |