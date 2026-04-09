Perform a complete professional review of the project in the current directory and generate a detailed report.

## Steps

1. **Exploration** — Read the key project files:
   - `CLAUDE.md`, `package.json`, `tsconfig.json`, `vite.config.*`, `eslint.config.*`
   - The full `src/` tree: router, features, components, hooks, utilities, api

2. **Analysis** — Evaluate the following axes:
   - **Architecture**: consistency with the declared structure, separation of concerns, coupling
   - **Code quality**: duplication, readability, file/function size, naming
   - **Performance**: lazy loading, memoization, unnecessary re-renders, bundle size
   - **Security**: exposure of sensitive variables, token handling, XSS/injection
   - **DX / Maintainability**: TypeScript typing, error handling, tests, conventions
   - **Libraries**: outdated, missing, or oversized dependencies

3. **Report** — Write the file `CLAUDE_ACTION/REVIEW.md` (create the folder if it doesn't exist). This folder is gitignored — never write generated reports to the project root.

## `CLAUDE_ACTION/REVIEW.md` structure

```markdown
# Professional Review — <project name>

> Generated on <date> · Stack: <main stack>

## Executive summary
<3-5 sentences: overall state, strengths, top priority>

## Strengths
<list of good practices already in place>

## Critical issues
<anything that could break in production or create major debt — include file:line where possible>

## Refactoring recommendations
<ordered by priority, with rationale and correction example>

## Recommended libraries
| Need | Suggested library | Why |
|------|------------------|-----|
| ...  | ...              | ... |

## Libraries to reconsider
<current dependencies that are under-used, outdated, or replaceable>

## Non-urgent improvements
<quick wins, patterns to adopt, tooling>

## Global score
| Axis           | Score /10 | Comment |
|----------------|-----------|---------|
| Architecture   |           |         |
| Code quality   |           |         |
| Performance    |           |         |
| Security       |           |         |
| Maintainability|           |         |
```

After writing the file, tell the user the path `CLAUDE_ACTION/REVIEW.md` and paste the executive summary.