# Glean Assessment App

A production-grade React application built as a take-home assessment. Features a social feed with voting and pinning, a design system with dark mode, and a full component workshop.

## Tech Stack

| Layer                | Choice                              |
| -------------------- | ----------------------------------- |
| Framework            | React 19 + TypeScript (Vite)        |
| Styling              | CSS Modules + CSS custom properties |
| Routing              | React Router v7                     |
| Server state         | TanStack Query v5                   |
| Client state         | Zustand v5                          |
| Schema validation    | Zod v4                              |
| Error boundaries     | react-error-boundary                |
| Testing              | Vitest + React Testing Library      |
| Component workshop   | Storybook 10                        |
| Linting / Formatting | ESLint + Prettier + Husky           |

## Features

- **Feed** — paginated post list with upvote/downvote and pin-to-top
- **Design system** — token-based CSS with light/dark mode support
- **Accessibility** — semantic HTML, ARIA attributes, keyboard navigation, focus management
- **Full UI states** — loading skeletons, error boundaries with retry, empty states

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Scripts

| Command                   | Description                         |
| ------------------------- | ----------------------------------- |
| `npm run dev`             | Start dev server                    |
| `npm run build`           | Type-check and build for production |
| `npm run preview`         | Preview production build            |
| `npm test`                | Run unit tests                      |
| `npm run test:coverage`   | Run tests with coverage report      |
| `npm run lint`            | Lint (zero warnings policy)         |
| `npm run lint:fix`        | Lint and auto-fix                   |
| `npm run format`          | Format all files with Prettier      |
| `npm run storybook`       | Start Storybook on port 6006        |
| `npm run build-storybook` | Build static Storybook              |

## Project Structure

```
src/
├── design-system/     # CSS tokens and global reset
├── app/               # Providers, router, layouts, store aggregator
├── shared/            # Reusable components, hooks, lib, utils, types
├── features/          # Feature modules (feed, counter)
├── pages/             # Route-level components — compose features only
└── main.tsx           # Entry point
```

## Architecture

- **Feature-scoped** — each feature owns its schemas, types, API layer, query options, store slice, hooks, and components
- **Strict boundaries** — features import from `shared/` only, pages import from `features/` only
- **Zod-first** — all TypeScript types for API shapes are inferred from Zod schemas, never written by hand
- **Query/store split** — TanStack Query owns server data, Zustand owns UI/session state only
