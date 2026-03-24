# CLAUDE.md — Project Rules for Claude Code

> Read this file fully before touching any code.
> These are non-negotiable architectural decisions. Do not deviate without asking first.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + TypeScript (Vite `react-ts` template) |
| Styling | CSS Modules + CSS custom properties (design tokens) |
| Routing | React Router v6 |
| Server state / data fetching | TanStack Query v5 |
| Client state | Zustand (feature-scoped slices) |
| Schema validation | Zod (API responses only) |
| Error boundaries | `react-error-boundary` |
| Testing | Vitest + React Testing Library |
| Linting / Formatting | ESLint + Prettier |
| Prop validation | TypeScript interfaces — no PropTypes, ever |

**File conventions**: All files use `.tsx` (components) or `.ts` (hooks, services, utils, types). No `.jsx` or `.js`. No Tailwind, no styled-components, no `style={{}}`. Env vars use `VITE_` prefix, accessed via `import.meta.env.VITE_*`.

---

## Folder Structure

```
src/
├── design-system/
│   ├── tokens.css                   ← CSS custom properties (:root) — single source of truth
│   └── global.css                   ← Reset + base typography using tokens only
│
├── app/
│   ├── providers/
│   │   └── AppProviders.tsx         ← RouterProvider + QueryClientProvider
│   ├── router/
│   │   └── index.tsx                ← All route definitions in one place
│   ├── layouts/
│   │   └── AppLayout.tsx            ← Every layout wraps content in ErrorBoundary
│   └── store/
│       └── index.ts                 ← Re-exports all Zustand slices (aggregator only)
│
├── assets/                          ← Images, icons, fonts
│
├── shared/
│   ├── components/
│   │   ├── ErrorBoundary/
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── ErrorBoundary.module.css
│   │   │   └── index.ts
│   │   └── Button/ ...
│   ├── hooks/                       ← Generic hooks used by 2+ features
│   ├── lib/
│   │   ├── apiClient.ts             ← Axios instance — only file that calls axios
│   │   └── queryClient.ts           ← TanStack QueryClient instance + defaults
│   ├── utils/                       ← Pure functions only. No side effects.
│   └── types/
│       └── index.ts                 ← Global interfaces (ApiError, AsyncState<T>)
│
├── features/
│   └── {name}/                      ← One folder per feature. Repeat this shape.
│       ├── api/
│       │   ├── {name}Api.ts         ← Typed domain calls — validates response with Zod
│       │   └── {name}QueryOptions.ts
│       ├── components/
│       ├── hooks/
│       ├── store/
│       │   └── {name}Store.ts       ← Zustand slice (UI state only)
│       ├── types/
│       │   ├── index.ts             ← Inferred types from schemas (z.infer<>)
│       │   └── schemas.ts           ← Zod schemas for this feature's API responses
│       └── index.ts                 ← Public API — export only what other layers need
│
├── pages/                           ← Route-level components. Compose features. Zero logic.
│
└── main.tsx                         ← Entry point. Import order is mandatory.
```

### Import order in `main.tsx` — never change this sequence

```tsx
import './design-system/tokens.css';
import './design-system/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppProviders from './app/providers/AppProviders';
import App from './App';
```

### Hard boundary rules

- `features/` imports from `shared/` only — never from another feature
- `pages/` imports from `features/` only — no direct api calls, no store access
- `shared/components/` — zero business logic, zero api calls, zero store access
- `shared/lib/apiClient.ts` — the only file that calls axios directly
- `app/store/index.ts` — re-exports slices only, defines nothing itself
- `design-system/` — tokens and global reset only, nothing else
- TypeScript types are always inferred from Zod schemas — never written by hand for API shapes

---

## TypeScript Rules

- Interface named `{Name}Props` declared **above** the component. Never inline object types.
- Defaults set in the destructuring signature, never in the body.
- Never use `any`. Use proper types or `unknown` with narrowing.
- Component: named props interface above the component, `cx()` helper for conditional classes, defaults in destructuring.

### Naming conventions

| Thing | Pattern | Example |
|---|---|---|
| Component props | `{Name}Props` | `ButtonProps`, `UserCardProps` |
| Zod schema | `{entity}Schema` | `userSchema`, `userListSchema` |
| Inferred type from schema | Plain noun | `User`, `Product` (via `z.infer<>`) |
| Query options factory | `{entity}QueryOptions` | `userQueryOptions` |
| Zustand slice type | `{Name}Slice` | `AuthSlice` |

### Signatures — always infer types from Zod schemas, never write by hand

```ts
// features/{name}/types/schemas.ts
export const {entity}Schema = z.object({ ... });
export const {entity}ListSchema = z.array({entity}Schema);

// features/{name}/types/index.ts
export type {Entity}     = z.infer<typeof {entity}Schema>;
export type {Entity}List = z.infer<typeof {entity}ListSchema>;
```

### Event handler types — required signatures

```ts
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
const handleClick  = (e: React.MouseEvent<HTMLButtonElement>) => {};
```

---

## Design System — Token Rules

**Token chain**: `tokens.css` → `.module.css` via `var(--token)` → JSX `className`. Never skip a level.

### Token naming

| Category | Pattern | Example |
|---|---|---|
| Color primitive | `--color-{scale}-{step}` | `--color-blue-600` |
| Color semantic | `--color-{role}` | `--color-brand`, `--color-text-primary` |
| Spacing | `--space-{n}` | `--space-4` (= 16px) |
| Typography | `--text-{size}`, `--font-{weight}` | `--text-sm`, `--font-semibold` |
| Radius | `--radius-{size}` | `--radius-md` |
| Shadow | `--shadow-{size}` | `--shadow-md` |
| Motion | `--duration-{speed}`, `--ease-{curve}` | `--duration-normal` |
| Z-index | `--z-{layer}` | `--z-modal` |

### CSS module rules

- All properties must reference tokens via `var(--token)`. No hardcoded colors, spacing, or font values.

### Dark mode

- `:root` = light. `[data-theme="dark"]` = dark.
- Only semantic tokens change in dark mode. Primitives never change.
- Toggle: `document.documentElement.setAttribute('data-theme', 'dark')`
- Never write `@media (prefers-color-scheme)` inside component CSS modules.

---

## Component Rules

- Always functional. Never class components.
- `className` accepted as escape hatch for layout overrides only.
- JSX > 80 lines → extract sub-components. Logic in JSX → extract to a hook.
- CSS module > 100 lines → consider splitting.

---

## Routing Rules (React Router v6)

- All route definitions live only in `app/router/index.tsx` — nowhere else.
- Pages compose features — no logic, no api calls.
- Use `<Outlet />` in layouts for nested routes.
- Use `useNavigate` and `useParams` — never `window.location`.
- Lazy load pages with `React.lazy` + `Suspense` for multiple routes.

---

## Zustand Rules

**Zustand owns UI state and session state only — never server data.**
Server data is owned by TanStack Query. Zustand owns: auth session, UI preferences, modal state, sidebar state.

### Slice signature

```ts
// features/{name}/store/{name}Store.ts
export const use{Name}Store = create<{Name}Slice>((set) => ({ ... }));
```

- `app/store/index.ts` re-exports slices only — `export { use{Name}Store } from '../features/{name}/store/{name}Store'`. Defines nothing itself.
- One slice per feature — never a god store.
- Never store API response data in Zustand.
- Access state outside React with `use{Name}Store.getState()`.

---

## API Layer Rules

**`shared/lib/apiClient.ts` is the only file that calls axios directly.** It must declare `_skipAuth?: boolean` on `AxiosRequestConfig` via module augmentation, create the axios instance, attach the auth interceptor (reads token from store), and normalize all errors in the response interceptor.

### Public vs protected endpoints — calling convention

```ts
// Public endpoint
apiClient.get('/path', { _skipAuth: true }).then(r => r.data);

// Protected endpoint — auth header attached automatically
apiClient.get('/path').then(r => r.data);
```

> **`_skipAuth: true` is a client-side axios config flag. Never use custom headers like `X-Skip-Auth` — that header goes to the server.**

`queryClient.ts`: `staleTime: 5min`, `retry: 1`, `refetchOnWindowFocus: false`, `mutations retry: 0`.

---

## Zod Schema Rules

**Schemas validate API responses only — not forms, not props.**

### Validation signature — always in the api file, after response, before return

```ts
const res = await apiClient.get('/path');
return {entity}Schema.parse(res.data); // throws ZodError if shape is wrong
```

- `schema.parse()` — use in production. Throws on invalid data. Fail loudly.
- `schema.safeParse()` — use only when you need to handle the error without throwing.
- Never use `z.any()` or `z.unknown()` as a shortcut — define the actual shape.
- If the API returns a shape you don't fully control, use `.passthrough()` and document why.
- ZodErrors surface through TanStack Query's `isError` state — no special handling needed.

---

## Error Boundary Rules

**Use `react-error-boundary` via `shared/components/ErrorBoundary` — never import it directly.**

- Every layout in `app/layouts/` must wrap `<Outlet />` in `<ErrorBoundary>`.
- **`resetKeys` is required on every boundary.** Layout boundaries: `resetKeys={[location.pathname]}`. Feature boundaries: feature-specific key.
- `onError` is required at layout level (wire telemetry). Optional at feature level.
- Never import `react-error-boundary` directly in feature code — always use `shared/components/ErrorBoundary`.
- Never swallow errors silently — the fallback must show the error message and a retry action.

---

## Accessibility (a11y) Rules

### Semantic HTML first

Use `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<aside>` — never `<div onClick>` or `<span onClick>`. Use `<button>` for actions, `<a>` for navigation, `<ul>`/`<ol>` for lists.

### Interactive elements

- Icon-only buttons: `aria-label` required.
- Loading buttons: `disabled` + `aria-busy={loading}` + `aria-label`.
- Disabled buttons use `disabled` attribute — not just visual styling.

### Loading and status states

- All loading spinners: `role="status"` + `aria-label="Loading {thing}"`.
- All error messages: `role="alert"`.
- Empty states: regular text, no special aria needed.

### Focus management

- On route change: focus moves to the main content heading (`<h1>`).
- On modal open: focus moves to the first interactive element inside.
- On modal close: focus returns to the trigger element.
- Never `outline: none` — use `:focus-visible` with `var(--color-border-focus)`.

### Forms

- Every `<input>` needs an associated `<label>` via `htmlFor` or wrapping.
- Error messages linked via `aria-describedby`. Required fields: `aria-required="true"`.

### Color and keyboard

- Never convey meaning through color alone — pair with text or icon.
- All interactive components must be keyboard accessible.
- Modals trap focus inside until dismissed. Dropdowns/menus close on `Escape`.
- Tab order follows visual reading order — never use `tabIndex > 0`.

---

## TanStack Query Rules

**Always use `queryOptions()` factory — never pass raw objects to `useQuery`.**

### Signatures

```ts
// features/{name}/api/{name}QueryOptions.ts
export const {entity}QueryOptions = {
  all:    ()           => queryOptions({ queryKey: ['{entities}'],      queryFn: {entity}Api.getAll }),
  detail: (id: string) => queryOptions({ queryKey: ['{entities}', id], queryFn: () => {entity}Api.getById(id) }),
};

// Hook signature — always wrap useQuery/useMutation in a feature hook
const use{Entity}List     = () => useQuery({entity}QueryOptions.all());
const use{Entity}Mutation = () => useMutation({ mutationFn: ..., onSuccess: () => queryClient.invalidateQueries(...) });
```

- Query keys defined only in `{entity}QueryOptions.ts` — never hardcoded inline.
- Invalidate using `queryOptions.all().queryKey` — never hardcode key strings.
- Never call `useQuery`/`useMutation` directly in components — always via a feature hook.
- Include `staleTime` on every `queryOptions` call (default: 5 minutes).

---

## UI States — Handle All Four. Every Time.

```ts
if (isLoading)     return <LoadingSpinner />;            // role="status" aria-label required
if (isError)       return <ErrorMessage onRetry={refetch} />;   // role="alert" required
if (!data?.length) return <EmptyState />;
return <SuccessContent data={data} />;
```

---

## Testing Rules

- **Feature tests** (async / server state): use `renderWithQuery`, mock the api module (`vi.mock`), cover all 4 states.
- **Component tests** (no server state): use `render` from `@testing-library/react` directly.
- Mock the api module — not the hook.
- `renderWithQuery`: wraps component in a fresh `QueryClient` with `retry: false`. Use for any component that calls a query hook.
- `createTestQueryClient()`: `new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })`.

---

## Anti-Patterns

| ❌ Never | ✅ Always |
|---|---|
| `prop-types` | TypeScript interfaces |
| `any` type | Proper types or `unknown` with narrowing |
| Hardcode color/spacing/font in CSS | `var(--token)` |
| `style={{ color: '#333' }}` inline | CSS module class |
| Raw axios/fetch outside `apiClient.ts` | `apiClient` wrapper |
| Server data in Zustand | TanStack Query owns server data |
| Hardcode query key strings inline | `queryOptions` factory keys |
| Pass raw objects to `useQuery` | `queryOptions()` factory |
| Call `useQuery`/`useMutation` in components | Wrap in a feature hook |
| Write TypeScript types for API shapes manually | Infer from Zod schema with `z.infer<>` |
| `z.any()` or `z.unknown()` as a shortcut | Define the actual shape |
| `X-Skip-Auth` or similar headers | `_skipAuth: true` in axios config |
| `ErrorBoundary` without `resetKeys` | Always provide `resetKeys` |
| Import `react-error-boundary` in feature code | Use `shared/components/ErrorBoundary` |
| `<div onClick>` for actions | `<button>` |
| `outline: none` on focus | `:focus-visible` with visible style |
| Icon-only button without `aria-label` | `aria-label` always |
| `<input>` without `<label>` | `htmlFor` or wrapping label |
| Error message without `role="alert"` | `role="alert"` on all error text |
| Loading spinner without `role="status"` | `role="status"` + `aria-label` |
| Skip any of the 4 UI states | isLoading / isError / empty / success |
| Feature importing from another feature | Lift to `shared/` |
| `.jsx` / `.js` file extensions | `.tsx` / `.ts` always |
| Route definitions scattered in components | All routes in `app/router/index.tsx` |
| `window.location` for navigation | `useNavigate` from React Router |
| Zustand slice defined in `app/store/` | Slice in `features/{name}/store/` |

---

## Build Order — Non-Negotiable

### New shared component
1. `shared/components/ComponentName/` folder
2. Add types to `shared/types/index.ts` if needed
3. `ComponentName.module.css` — base + variants + states, tokens only
4. `ComponentName.tsx` — typed interface, `cx()`, semantic HTML, a11y attributes
5. `ComponentName.test.tsx` — render, variants, interactions, disabled, a11y
6. `index.ts` re-export

### New feature — Schemas → Types → Api → QueryOptions → Store → Hooks → Components
1. `features/{name}/types/schemas.ts` — Zod schemas first
2. `features/{name}/types/index.ts` — infer types from schemas with `z.infer<>`
3. `features/{name}/api/{name}Api.ts` — typed domain calls, validate with schema
4. `features/{name}/api/{name}QueryOptions.ts` — `queryOptions` factory + mutation keys
5. `features/{name}/store/{name}Store.ts` — Zustand slice for UI/session state only
6. `features/{name}/hooks/use{Name}.ts` — `useQuery` / `useMutation` wrappers
7. `features/{name}/components/` — feature UI, semantic HTML, a11y attributes
8. `features/{name}/{Name}.test.tsx` — `renderWithQuery`, mock api, all 4 states
9. `features/{name}/index.ts` — export public API only
10. Add route to `app/router/index.tsx`
11. Create `pages/{Name}Page.tsx` — import feature, render it, nothing else

**Schemas → Types → Api → QueryOptions → Store → Hooks → Components. This order is non-negotiable.**

---

## Claude Skills

Skills are macros you invoke by name. They expand into a deterministic sequence of steps. Always confirm preconditions before executing.

---

### Scaffold Feature

**Trigger**: "Scaffold [feature-name] feature" or `/scaffold [name]`

**Preconditions**:
- Feature name is a singular noun (e.g., `product`, `invoice`)
- No existing folder at `features/{name}/`

**Execution sequence** (follows Build Order exactly):
1. Create folder structure: `features/{name}/types/`, `api/`, `store/`, `hooks/`, `components/`
2. `schemas.ts` — ask for field list if not provided; generate Zod schema per the Zod Schema Rules
3. `types/index.ts` — infer all types with `z.infer<>` per the TypeScript Rules
4. `{name}Api.ts` — CRUD stubs (`getAll`, `getById`, `createOne`, `updateOne`, `deleteOne`), each validating with `.parse()`
5. `{name}QueryOptions.ts` — `queryOptions` factory with `all` and `detail` keys + mutation keys
6. `{name}Store.ts` — Zustand slice for UI state only (no server data) per the Zustand Rules
7. `use{Name}List.ts` — `useQuery` wrapper; `useCreate{Name}.ts` — `useMutation` with `onSuccess` invalidation
8. `{Name}List.tsx` — all 4 UI states: loading (`role="status"`), error (`role="alert"` + retry), empty, success
9. `{Name}.test.tsx` — `vi.mock` the api module, `renderWithQuery`, cover all 4 states
10. `index.ts` — public API exports only
11. Prompt: "Add route to `app/router/index.tsx`?" — generate if yes
12. Prompt: "Create `pages/{Name}Page.tsx`?" — generate if yes

**Output**: List all created files with a one-sentence description each.

---

### A11y Audit

**Trigger**: "A11y audit [ComponentName]" or `/a11y [ComponentName]`

**Preconditions**: Component file must be readable.

**Execution sequence** (check in this order):
1. Every `<button>` and `<a>` — visible text or `aria-label`
2. Every loading state — `role="status"` + `aria-label`
3. Every error state — `role="alert"`
4. Every `<input>` — associated `<label>` via `htmlFor` or wrapping
5. Every `<input>` with possible error — `aria-describedby` pointing to error element
6. Required fields — `aria-required="true"`
7. Focus styles — no `outline: none` without `:focus-visible` alternative using token
8. Interactive `<div>` or `<span>` — replace with `<button>` or `<a>`
9. `tabIndex` — never values greater than `0`
10. Semantic structure — `<main>`, `<nav>`, `<header>` used appropriately

**Output**: For each violation: file + line + rule violated + corrected code. If none: "A11y audit passed — N checks clean."

---

### API Sync

**Trigger**: "API sync [feature-name]" + JSON payload, or `/api-sync [name] { ...json }`

**Preconditions**:
- JSON response shape provided in message
- `features/{name}/types/schemas.ts` exists

**Execution sequence**:
1. Parse the provided JSON response
2. Diff against existing `{entity}Schema`
   - New fields → add with appropriate Zod type
   - Removed fields → mark `.optional()` + add `// deprecated` comment
   - Type-changed fields → update Zod type, note the change
3. Update `schemas.ts` — **never remove a field, only deprecate**
4. Verify `types/index.ts` still correctly infers all types (no edits needed if using `z.infer<>`)
5. Check `{name}Api.ts` — confirm `.parse()` calls reference the updated schema

**Output**: Diff-style summary of every field added, deprecated, or type-changed (before/after). Never silently drop fields.

---

## Claude Code Behavior

- Read this entire file before generating any code in a new session.
- Before modifying an existing file: state what you're changing and why.
- If a task is ambiguous: ask ONE clarifying question, then write code.
- Every generated component must include: typed interface + module CSS + a11y attributes + test stub.
- Do not refactor files outside the scope of the current task.
- Do not create new abstractions unless explicitly asked.
- If a needed token doesn't exist in `tokens.css`: say so and ask before inventing a value.
- Never use `any`. Use `unknown` and narrow it if type is genuinely uncertain.
- Never suggest PropTypes, inline styles, or Tailwind.
- Never write TypeScript types for API shapes — infer from Zod schemas.
- Never use `X-Skip-Auth` or similar headers — use `_skipAuth: true` in axios config.
- Never put route definitions anywhere except `app/router/index.tsx`.
- Never define a Zustand slice anywhere except `features/{name}/store/`.
- Never call axios/fetch directly outside `shared/lib/apiClient.ts`.
- Never pass raw query objects to `useQuery` — always use the `queryOptions` factory.
- Never render an `ErrorBoundary` without `resetKeys`.
- Never import `react-error-boundary` directly in feature code — use `shared/components/ErrorBoundary`.
- Every interactive element must have visible text or `aria-label`.
- Every loading state must have `role="status"`. Every error state must have `role="alert"`.
- When asked to scaffold a feature, invoke the Scaffold Feature skill.
- When reviewing a component for accessibility, invoke the A11y Audit skill.
