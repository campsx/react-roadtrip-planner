# /refacto

Analyse a refactoring request, produce a structured action plan, then execute or prepare the changes while keeping project rules up to date.

## Usage

```
/refacto <description of what to refactor>
```

Examples:
- `/refacto extract fetch logic from useCountries into a generic hook`
- `/refacto move shared types to src/types/`
- `/refacto rename featureApi to consistent camelCase throughout`

## What this command must do

### Step 1 — Analyse

Before writing anything:

1. Read the files concerned by the request.
2. Identify the gap between current state and the goal.
3. List impacted files (modified, created, deleted).
4. Identify rules in `.claude/rules/` related to this refactoring.

### Step 2 — Produce `CLAUDE_ACTION/REFACTO.md`

Create (or overwrite) `CLAUDE_ACTION/REFACTO.md` at the project root with the following action plan:

```md
# Refacto — <short title>

## Context
<Why this refactoring? What problem does it solve?>

## Current state
<Concise description of what exists today — files, patterns, issues.>

## Goal
<What the code should look like after the refactoring.>

## Action plan

- [ ] Step 1 — <precise action, file(s) concerned>
- [ ] Step 2 — …
- [ ] Step N — …

## Files touched

| File | Action |
|------|--------|
| `src/…` | modified / created / deleted |

## Impact on rules

| Rule file | Change to make |
|-----------|----------------|
| `.claude/rules/architecture.md` | … |
| `.claude/rules/coding.md` | … |
| _(none if existing conventions already cover this case)_ | |

## Risks / points of attention
<What could break, side effects, tests to check.>
```

### Step 3 — Ask for confirmation

Display a summary of the plan and ask:

> Plan written to `CLAUDE_ACTION/REFACTO.md`. Proceed with execution? (yes / no / modify the plan)

Do not modify any code before receiving confirmation.

### Step 4 — Execute

If confirmed:

1. Apply changes in the order of the plan, step by step.
2. Check each step in `CLAUDE_ACTION/REFACTO.md` as it completes (`- [x]`).
3. Run `npm run type-check` and `npm run lint` after each critical step.

### Step 5 — Update rules

Once the refactoring is complete:

1. Re-read the "Impact on rules" column in `CLAUDE_ACTION/REFACTO.md`.
2. Update the relevant `.claude/rules/` files to reflect the new patterns.
3. If a new convention emerges that didn't exist before, add it in the appropriate rule file.
4. If `CLAUDE.md` itself needs to evolve (new section, new command), update it.

### Step 6 — Close

Update `CLAUDE_ACTION/REFACTO.md`:
- All checkboxes checked.
- Add a `## Result` section with a summary of what changed.

## Rules

- Never modify code without having produced `CLAUDE_ACTION/REFACTO.md` first.
- Never skip confirmation before executing.
- If the refactoring changes a convention → rules **must** be updated in the same session.
- If the refactoring is too large for one session, split the plan into phases and indicate it in `CLAUDE_ACTION/REFACTO.md`.