# Contributing to Numoni Admin Dashboard v2

Thank you for your interest in contributing to the Numoni Admin Dashboard! This document outlines everything you need to know to get started as a contributor, maintain code quality, and get your changes merged efficiently.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Prerequisites](#-prerequisites)
- [Development Setup](#-development-setup)
- [Project Conventions](#-project-conventions)
  - [Branch Naming](#branch-naming)
  - [Commit Messages](#commit-messages)
  - [Code Style](#code-style)
  - [TypeScript Guidelines](#typescript-guidelines)
  - [File & Folder Naming](#file--folder-naming)
- [Development Workflow](#-development-workflow)
- [Component Guidelines](#-component-guidelines)
- [Adding New Features](#-adding-new-features)
  - [New API Hook (Query)](#new-api-hook-query)
  - [New Mutation Hook](#new-mutation-hook)
  - [New Page / Route](#new-page--route)
  - [New Zod Schema](#new-zod-schema)
- [Pull Request Process](#-pull-request-process)
- [Common Pitfalls](#-common-pitfalls)

---

## 📜 Code of Conduct

- Be respectful and constructive in code reviews
- Write code for your team, not just for yourself — clarity over cleverness
- Document non-obvious decisions with inline comments
- Ask questions rather than making assumptions on features

---

## ✅ Prerequisites

Ensure you have the following installed before contributing:

| Tool | Version | Notes |
|---|---|---|
| **Node.js** | >= 24.0.0 | Check with `node -v` |
| **pnpm** | Latest | `npm install -g pnpm` |
| **Git** | Any recent version | — |

> ⚠️ **Important**: This project uses `pnpm` exclusively. The `package.json` engine policy will reject `npm` or `yarn` installs.

---

## 🛠️ Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/<your-username>/numoni-admin-v2.git
   cd numoni-admin-v2
   ```

2. **Add the upstream remote** (to sync with the main repository)

   ```bash
   git remote add upstream https://github.com/<org>/numoni-admin-v2.git
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```
   
   This will also automatically set up [Husky](https://typicode.github.io/husky/) git hooks via the `prepare` script.

4. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in all required values. Refer to the [README Environment Variables](./README.md#-environment-variables) section for the full list and descriptions.

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000) with Turbopack-powered hot reload.

---

## 🗂️ Project Conventions

### Branch Naming

Use descriptive, hyphen-separated branch names prefixed by type:

```
<type>/<short-description>
```

| Prefix | When to Use |
|---|---|
| `feat/` | New feature or page |
| `fix/` | Bug fixes |
| `refactor/` | Code restructuring without behaviour change |
| `chore/` | Build config, tooling, dependency updates |
| `docs/` | Documentation-only changes |
| `style/` | Styling or UI-only changes |
| `perf/` | Performance improvements |
| `wip/` | Work-in-progress (not ready for review) |

**Examples:**

```bash
feat/merchant-settlement-type
fix/customer-balance-adjustment-validation
refactor/deals-table-hook
docs/update-readme
```

---

### Commit Messages

This project enforces **Conventional Commits** via [Commitlint](https://commitlint.js.org/) and [Husky](https://typicode.github.io/husky/). Every commit message **must** follow this format:

```
<type>(<optional-scope>): <short description>

[optional body]

[optional footer(s)]
```

#### Allowed Types

| Type | Description |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `refactor` | Code change that is neither a fix nor a feature |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `build` | Build system or external dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Other changes that don't modify src or test files |
| `revert` | Revert a previous commit |
| `layout` | Layout-specific UI changes |
| `pages` | Page-level additions or modifications |
| `api` | API route changes |
| `wip` | Work in progress commits (use sparingly) |
| `translation` | Internationalisation/localisation changes |
| `security` | Security-related fixes or improvements |
| `changeset` | Version management changeset commits |

#### Rules

- **Type**: always lowercase
- **Scope**: always lowercase (optional but recommended)
- **Subject**: no sentence-case, pascal-case, start-case, or upper-case; no trailing period
- **Header max length**: 100 characters
- **Body line length**: max 100 characters

#### Good Examples

```bash
feat(merchants): add settlement type update dialog
fix(customers): resolve balance adjustment not invalidating query
refactor(hooks): extract pagination logic into reusable hook
docs(readme): update environment variable table
chore(deps): upgrade tanstack query to v5.90.21
api(images): add S3 image proxy route for CORS resolution
```

#### Bad Examples

```bash
# ❌ Wrong type casing
Feat: add new feature

# ❌ Missing type
add merchant settlement

# ❌ Full sentence with period
feat: Added new merchant settlement feature.

# ❌ Type not in allowed list
update: changed something
```

---

### Code Style

- **ESLint** is configured with Next.js and TypeScript rules — run `pnpm lint` before committing
- **No `any` types** — use `unknown`, generics, or define proper types
- **No unused imports** — ESLint will catch and report these
- **Prefer named exports** over default exports for components (except pages and layouts which Next.js requires as default)
- **Avoid inline styles** — use Tailwind CSS classes or CSS variables
- **Use `cn()` utility** from `lib/utils.ts` for conditional class merging

---

### TypeScript Guidelines

1. **All files must be TypeScript** (`.ts` or `.tsx`) — no plain JavaScript
2. **Define explicit return types** for all non-trivial functions and custom hooks
3. **Avoid `as` type assertions** — use proper type guards instead
4. **Define shared types** in `lib/types.ts` or the appropriate file under `lib/types/`
5. **Use Zod schemas** for all form validation and place schemas in `lib/schemas/`
6. **Prefer interfaces for object shapes**, types for unions/intersections
7. **Run type-check before submitting PRs**:

   ```bash
   pnpm type-check
   ```

---

### File & Folder Naming

| Item | Convention | Example |
|---|---|---|
| React components | `kebab-case.tsx` | `merchant-details.tsx` |
| Custom hooks | `camelCase.ts` with `use` prefix | `useGetMerchants.ts` |
| Utility files | `kebab-case.ts` | `phone-utils.ts` |
| Zod schemas | `kebab-case-schema.ts` | `merchant-schema.ts` |
| Type definition files | `kebab-case.ts` | `branch-api.ts` |
| Zustand stores | `kebab-case-store.ts` | `user-auth-store.ts` |
| Page files (Next.js) | `page.tsx` | `app/dashboard/merchants/page.tsx` |
| Layout files (Next.js) | `layout.tsx` | `app/dashboard/layout.tsx` |

---

## 🔄 Development Workflow

### 1. Sync with upstream before starting work

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Create your feature branch

```bash
git checkout -b feat/your-feature-name
```

### 3. Make your changes

Refer to [Adding New Features](#-adding-new-features) for patterns.

### 4. Verify your work

```bash
# Lint the code
pnpm lint

# Type-check all TypeScript
pnpm type-check

# Manually test in browser
pnpm dev
```

### 5. Commit your changes

```bash
git add .
git commit -m "feat(scope): your descriptive message"
```

Husky will run `pnpm lint` and `pnpm type-check` on commit. Fix any errors before proceeding.

### 6. Push and open a PR

```bash
git push origin feat/your-feature-name
```

Then open a Pull Request against the `main` (or `develop`) branch.

---

## 🧩 Component Guidelines

### Where to Place Components

| Type | Location |
|---|---|
| Feature-specific UI | `components/admin/<feature-name>/` |
| Shared across features | `components/common/` |
| Auth-related | `components/auth/` |
| Base UI primitives (shadcn/ui) | `components/ui/` |

### Component Structure

```tsx
// 1. Imports — external libs first, then internal
import { useState } from 'react'
import { SomeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetMerchants } from '@/hooks/query/useGetMerchants'
import type { Merchant } from '@/lib/types'

// 2. Type/interface definitions
interface MerchantCardProps {
  merchant: Merchant
  onSelect: (id: string) => void
}

// 3. Component (named export preferred)
export function MerchantCard({ merchant, onSelect }: MerchantCardProps) {
  // 4. Hooks at the top
  const [isOpen, setIsOpen] = useState(false)

  // 5. Handlers
  function handleClick() {
    onSelect(merchant.id)
  }

  // 6. Render
  return (
    <div className="...">
      {/* ... */}
    </div>
  )
}
```

### Dos and Don'ts

| ✅ Do | ❌ Don't |
|---|---|
| Use `cn()` for conditional classes | Inline style objects |
| Use `sonner` toast for user feedback | `alert()` or `console.log` |
| Use TanStack Query for all API calls | Direct `fetch`/`axios` in components |
| Add aria-labels to interactive elements | Leave buttons with no accessible label |
| Use `<Dialog>` for confirmations | Browser `confirm()` |
| Handle loading and error states | Assume the happy path only |

---

## ➕ Adding New Features

### New API Hook (Query)

Place all query hooks in `hooks/query/`. Follow this pattern:

```ts
// hooks/query/useGetExampleList.ts
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import type { ExampleItem } from '@/lib/types'

interface GetExampleListParams {
  page?: number
  size?: number
}

interface ExampleListResponse {
  data: ExampleItem[]
  total: number
}

export function useGetExampleList(params: GetExampleListParams) {
  return useQuery({
    queryKey: ['example-list', params],
    queryFn: async () => {
      const { data } = await api.get<ExampleListResponse>('/example', {
        params,
      })
      return data
    },
  })
}
```

**Rules:**
- `queryKey` must be unique — use a descriptive string + params tuple
- Always type both the params and the response
- Keep the hook focused — one API call per hook (exceptions: composite queries)

---

### New Mutation Hook

Place all mutation hooks in `hooks/mutation/`. Follow this pattern:

```ts
// hooks/mutation/useCreateExample.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/api'
import type { CreateExamplePayload } from '@/lib/types'

export function useCreateExample() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateExamplePayload) => {
      const { data } = await api.post('/example', payload)
      return data
    },
    onSuccess: () => {
      // Invalidate related queries to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['example-list'] })
      toast.success('Example created successfully')
    },
    onError: () => {
      toast.error('Failed to create example. Please try again.')
    },
  })
}
```

**Rules:**
- Always invalidate the related query key on success
- Always show a toast on success and failure
- Pass typed payloads — avoid `any`

---

### New Page / Route

1. Create the folder under `app/dashboard/<feature-name>/`
2. Add a `page.tsx` with a `default` export (Next.js requirement)
3. Add the route constant to `constant/routes.ts`
4. If the page needs sidebar navigation, update `lib/sidebar-navigation-helper.ts`

```tsx
// app/dashboard/example/page.tsx
import { ExampleView } from '@/components/admin/example/example-view'

export default function ExamplePage() {
  return <ExampleView />
}
```

---

### New Zod Schema

Place schemas in `lib/schemas/` and name them `<domain>-schema.ts`:

```ts
// lib/schemas/example-schema.ts
import { z } from 'zod'

export const createExampleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  amount: z.coerce.number().positive('Amount must be positive'),
})

export type CreateExampleFormValues = z.infer<typeof createExampleSchema>
```

Then wire it to a form:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createExampleSchema, type CreateExampleFormValues } from '@/lib/schemas/example-schema'

const form = useForm<CreateExampleFormValues>({
  resolver: zodResolver(createExampleSchema),
  defaultValues: { name: '', amount: 0 },
})
```

---

## 🔍 Pull Request Process

1. **Ensure your branch is up to date** with the target branch before opening a PR
2. **Fill out the PR template** (if one exists), including:
   - What changed and why
   - Screenshots/recordings for UI changes
   - Steps to test
3. **All checks must pass**:
   - `pnpm lint` — no lint errors
   - `pnpm type-check` — no TypeScript errors
4. **Request at least one reviewer** from the core team
5. **Address review comments** before re-requesting a review
6. **Do not self-merge** — wait for explicit approval

### PR Title Format

Follow the same Conventional Commit format:

```
feat(merchants): add settlement type update dialog
fix(auth): redirect to last visited route after sign-in
```

---

## ⚠️ Common Pitfalls

| Pitfall | What to do instead |
|---|---|
| Using array index as React `key` | Use a stable, unique ID from the data (`item.id`) |
| Calling API directly in component | Use a query/mutation hook |
| Creating a new Axios instance | Use the shared `lib/api.ts` instance |
| Hardcoding route strings | Define routes in `constant/routes.ts` |
| Using `any` type | Define proper types or use `unknown` with type guards |
| Ignoring error states in queries | Always handle `isError` and display feedback |
| Missing query invalidation after mutation | Always invalidate the relevant `queryKey` in `onSuccess` |
| Skipping `pnpm type-check` | Run it before every PR — CI will catch it anyway |
| Using `npm` or `yarn` | Only `pnpm` is allowed in this project |

---

If you have any questions about contributing, please open a GitHub Discussion or reach out to the core team.

*Happy coding! 🚀*
