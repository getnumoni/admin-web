# Numoni Admin Dashboard v2

> A comprehensive, enterprise-grade admin dashboard for the **Numoni** platform — a loyalty points and rewards ecosystem connecting merchants, customers, and charities across Africa.

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Architecture](#%EF%B8%8F-architecture)
- [API Proxy & CORS](#-api-proxy--cors-resolution)
- [Contributing](#-contributing)
- [Support](#-support)

---

## 🚀 Project Overview

The **Numoni Admin Dashboard v2** is a modern, full-featured administrative interface built with **Next.js 16** and **React 19**. It serves as the central management hub for the Numoni ecosystem, giving administrators powerful tools to:

- Onboard and manage **merchants** and their KYC verification lifecycle
- Monitor and manage **customer** accounts, loyalty point balances, and transaction histories
- Administer **charity** organisations, track donations, and measure impact
- Create and approve **deals & promotions** (sponsored and internal)
- Manage **admin users**, roles, modules, and permission matrices
- Configure and manage **POS terminals** and branch locations
- Process and monitor **sign-up bonus** requests
- View real-time **analytics, reports, funding, and settlement overviews**
- Handle **support tickets** raised by customers and merchants
- Monitor the **alerts dashboard** and system-wide **activity logs**
- Send and manage **notifications**
- Track **transactions** across customers and merchants

---

## ✨ Features

### 🏪 Merchant Management
- Merchant registration and full onboarding flow
- Business information and document management
- KYC verification (CAC, NIN, TIN document checks)
- Merchant verification status controls
- Password reset and account controls
- Transaction monitoring per merchant
- Merchant reward points and reward type management
- Performance analytics and settlement type configuration (daily/instant)
- QR code generation and download (with S3 CORS proxy support)

### 👥 Customer Management
- Customer account creation and management
- Loyalty points tracking and balance adjustments
- Transaction history and shared points overview
- Password reset and account deactivation/deletion
- Customer reviews and feedback monitoring
- Churn rate trend analytics

### 🏥 Charity Operations
- Charity registration and verification
- Brand-charity association management
- Donation tracking and total donation metrics
- Most-supported charity leaderboards
- Charity summary and impact reports

### 🎁 Deals & Promotions
- Internal and sponsored deal creation and management
- Deal approval and status management
- Deal performance analytics
- File-based deal uploads

### 🏦 POS & Branch Management
- POS terminal creation, update, and deletion
- Branch registration and configuration
- Bulk POS upload via CSV
- Sample CSV template download

### 👮 Admin Management & RBAC
- Admin user creation and management
- Role creation and assignment
- Module-based permission mapping
- Role-level access control enforcement

### 🎰 Bonus Management
- Sign-up bonus request creation and listing
- Registration bonus tracking
- Bonus approval workflow
- Bonus statistics dashboard

### 📊 Reports & Analytics
- Sales dashboard with date-range filtering
- Point distribution and flow reports
- Charity summary and top charities reports
- Merchant usage analytics and deal performance
- Donation trend visualisations
- Revenue dashboard and settlement overview
- Funding overview and reconciliation
- Shared points and wallet balance stats
- Total issued and redeemed points tracking

### 🔔 Notifications
- In-app notification centre
- Mark notifications as read

### 🎫 Support System
- Support ticket creation and management
- Ticket type configuration
- Ticket detail view

### 🔍 Activity & Audit
- System-wide activity log monitoring
- Audit trail listing

### 🚨 Alerts Dashboard
- Real-time alert monitoring across the platform

---

## 🛠️ Tech Stack

### Core Framework

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.1.5 | React framework with App Router |
| [React](https://react.dev/) | 19.2.1 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5.9.3 | Static typing |

### UI & Styling

| Technology | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | ^4.2.1 | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | — | Pre-built accessible component library |
| [Radix UI](https://www.radix-ui.com/) | various | Headless, accessible UI primitives |
| [Lucide React](https://lucide.dev/) | ^0.544.0 | Icon library |
| [Framer Motion](https://www.framer.com/motion/) | ^12.35.2 | Animations and transitions |
| [Recharts](https://recharts.org/) | 3.1.0 | Data visualisation and charts |
| [Sonner](https://sonner.emilkowal.ski/) | ^2.0.7 | Toast notifications |
| [Vaul](https://vaul.emilkowal.ski/) | ^1.1.2 | Drawer component |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6 | Theme management |
| [cmdk](https://cmdk.paco.me/) | ^1.1.1 | Command palette |
| [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) | ^1.4.0 | Tailwind animation utilities |

### State Management & Data Fetching

| Technology | Version | Purpose |
|---|---|---|
| [Zustand](https://zustand-demo.pmnd.rs/) | ^5.0.11 | Client-side global state |
| [TanStack Query](https://tanstack.com/query) | ^5.90.21 | Server state, caching, and sync |
| [TanStack Table](https://tanstack.com/table) | ^8.21.3 | Headless table management |
| [React Hook Form](https://react-hook-form.com/) | ^7.71.2 | Form state and validation |
| [Zod](https://zod.dev/) | ^4.3.6 | Schema-based runtime validation |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | ^5.2.2 | Connects Zod schemas to React Hook Form |

### Networking & Storage

| Technology | Version | Purpose |
|---|---|---|
| [Axios](https://axios-http.com/) | ^1.13.6 | HTTP client with interceptors |
| [cookies-next](https://github.com/andreizanik/cookies-next) | ^6.1.1 | Cookie-based secure token storage |

### Utilities & Date Handling

| Technology | Version | Purpose |
|---|---|---|
| [date-fns](https://date-fns.org/) | ^4.1.0 | Date manipulation and formatting |
| [react-day-picker](https://react-day-picker.js.org/) | ^9.14.0 | Calendar/date picker UI |
| [clsx](https://github.com/lukeed/clsx) | ^2.1.1 | Conditional class merging |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | ^3.5.0 | Tailwind class deduplication |
| [class-variance-authority](https://cva.style/) | ^0.7.1 | Variant-based component styling |

### Authentication & Security

| Technology | Purpose |
|---|---|
| JWT Tokens | Access and refresh token-based authentication |
| Cookie Storage | Secure, server-accessible token storage via `cookies-next` |
| Role-Based Access Control | Module/privilege matrix for admin permissions |
| Next.js Middleware | Server-side route protection |

### Developer Tooling

| Technology | Version | Purpose |
|---|---|---|
| [ESLint](https://eslint.org/) | ^9.39.4 | Linting with Next.js + TypeScript rules |
| [Husky](https://typicode.github.io/husky/) | ^9.1.7 | Git hooks (pre-commit, commit-msg) |
| [Commitlint](https://commitlint.js.org/) | ^20.4.3 | Conventional commit enforcement |
| [Turbopack](https://turbo.build/pack) | built-in | Fast Next.js bundler for dev |
| [TanStack Query DevTools](https://tanstack.com/query/latest/docs/framework/react/devtools) | ^5.91.3 | Query debugging in development |

---

## 📁 Project Structure

```
numoni-admin-v2/
├── app/                              # Next.js App Router root
│   ├── api/                         # Next.js API Routes (server-side)
│   │   ├── branches/                # Branch management endpoints
│   │   ├── generateBankToken/       # Bank token generation
│   │   ├── images/proxy/            # S3 CORS image proxy
│   │   ├── maps/                    # Google Maps integration
│   │   ├── pay-on-us/               # Pay-on-us payment endpoints
│   │   └── places/                  # Google Places location services
│   ├── auth/
│   │   └── sign-in/                 # Login page
│   └── dashboard/                   # Protected dashboard pages
│       ├── activity-logs/           # System activity log viewer
│       ├── admin-management/        # Admin user management
│       ├── alerts-dashboard/        # Real-time alerts monitoring
│       ├── bonus/                   # Sign-up bonus management
│       ├── charity/                 # Charity management
│       ├── customers/               # Customer management
│       ├── deals-promo/             # Deals and promotions
│       ├── merchants/               # Merchant management
│       ├── notifications/           # In-app notification centre
│       ├── reports/                 # Analytics and reporting
│       ├── roles/                   # Role and permission management
│       ├── support/                 # Support ticket system
│       └── transactions/            # Transaction management
│
├── components/                      # Reusable UI components
│   ├── admin/                       # Feature-specific components
│   │   ├── active-users-card.tsx
│   │   ├── activity-logs.tsx
│   │   ├── add-merchants/           # Merchant creation/onboarding forms
│   │   ├── admin-management/        # Admin CRUD components
│   │   ├── alert-dashboard/         # Alert display components
│   │   ├── bonuses/                 # Bonus management UI
│   │   ├── charity/                 # Charity CRUD components
│   │   ├── customers/               # Customer management UI
│   │   ├── deals-and-promo/         # Deal management UI
│   │   ├── most-supported-charity.tsx
│   │   ├── notification.tsx
│   │   ├── pos-branch/              # POS and branch management
│   │   ├── reports/                 # Report views and charts
│   │   ├── review-dashboard.tsx
│   │   ├── roles-and-permission/    # RBAC management UI
│   │   ├── support/                 # Support ticket UI
│   │   ├── top-performing-merchant.tsx
│   │   └── transactions/            # Transaction views
│   ├── auth/                        # Authentication components (sign-in form, guards)
│   ├── common/                      # Shared layout components (sidebar, navbar, etc.)
│   └── ui/                          # Base shadcn/ui components (button, input, table, etc.)
│
├── constant/                        # Static application constants
│   ├── icons.ts                     # Centralised icon exports
│   ├── images.ts                    # Static image asset paths
│   └── routes.ts                    # Application route definitions
│
├── context/                         # React Context providers
│
├── data/                            # Static mock data and enumerations
│
├── hooks/                           # Custom React hooks
│   ├── mutation/                    # 48 TanStack mutation hooks
│   │   ├── useSignIn.ts
│   │   ├── useCreateMerchants.ts
│   │   ├── useCreateCharity.ts
│   │   ├── useAddMerchantKyc.ts
│   │   ├── useCreateDeals.ts
│   │   ├── useUploadPosCsv.ts
│   │   └── ...
│   ├── query/                       # 90 TanStack query hooks
│   │   ├── useGetAllMerchants.ts
│   │   ├── useGetCustomers.ts
│   │   ├── useGetAllCharity.ts
│   │   ├── useGetDealList.ts
│   │   ├── useGetAlertDashboard.ts
│   │   ├── useGetReportSalesDashboard.ts
│   │   └── ...
│   └── utils/                       # Reusable utility hooks
│       ├── useDebounce.ts
│       ├── useExportCsv.ts
│       ├── useKycVerification.ts
│       ├── useDocumentVerification.ts
│       ├── useDateSelection.ts
│       └── ...
│
├── lib/                             # Core library and utilities
│   ├── api.ts                       # Axios instance with auth interceptors
│   ├── bank-api.ts                  # Bank integration Axios client
│   ├── pay-on-us-api.ts             # Pay-on-us Axios client
│   ├── helper.ts                    # QR code, image, and general utilities
│   ├── cookies-utils.ts             # Cookie read/write helpers
│   ├── phone-utils.ts               # Phone number formatting
│   ├── sidebar-navigation-helper.ts # Sidebar nav config and permission filtering
│   ├── merchant-kyc-helpers.ts      # KYC document helpers
│   ├── types.ts                     # Global TypeScript type definitions
│   ├── utils.ts                     # General utility functions (cn, etc.)
│   ├── schemas/                     # Zod validation schemas
│   │   ├── merchant-schema.ts
│   │   ├── customer-schema.ts
│   │   ├── charity-schema.ts
│   │   ├── deal-schema.ts
│   │   ├── admin-schema.ts
│   │   ├── branch-schema.ts
│   │   └── pos-branch-schema.ts
│   ├── stores/                      # Additional Zustand store utilities
│   └── types/                       # Domain-specific TypeScript types
│       ├── admin.ts
│       ├── customer.ts
│       ├── activity-log.ts
│       └── branch-api.ts
│
├── stores/                          # Global Zustand stores
│   ├── user-auth-store.ts           # Auth state (user info, token management)
│   ├── bank-store.ts                # Bank integration tokens
│   ├── pay-on-us-store.ts           # Pay-on-us tokens
│   └── branch-store.ts              # Branch data and operations
│
├── schema/                          # Additional schema definitions
├── proxy.ts                         # Proxy utility
├── public/assets/                   # Static files (images, icons)
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.mjs                # ESLint configuration
├── commitlint.config.mjs            # Commitlint configuration
└── postcss.config.mjs               # PostCSS / Tailwind configuration
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | >= 24.0.0 |
| pnpm | Latest (yarn and npm are disabled by engine policy) |

> **Note**: This project enforces `pnpm` as the only allowed package manager. Running `npm install` or `yarn install` will intentionally fail.

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd numoni-admin-v2
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then fill in the values (see [Environment Variables](#-environment-variables)).

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file at the project root. Use `.env.example` as a template:

```env
# Backend API base URL
NEXT_PUBLIC_API_URL=https://your-api-url.com

# Google Maps API Key (for location/maps integration)
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Bank Integration
BANK_URL=https://your-bank-api-url.com
NEXT_PUBLIC_BANK_URL=${BANK_URL}
BANK_CLIENT_ID=your_bank_client_id
BANK_SECRET_KEY=your_bank_secret_key
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | Base URL of the Numoni backend REST API |
| `GOOGLE_MAPS_API_KEY` | ✅ Yes | Google Maps API key for maps and places features |
| `BANK_URL` | ✅ Yes | Bank integration service base URL |
| `NEXT_PUBLIC_BANK_URL` | ✅ Yes | Public bank URL (mirrors `BANK_URL`) |
| `BANK_CLIENT_ID` | ✅ Yes | Client ID for bank token generation |
| `BANK_SECRET_KEY` | ✅ Yes | Secret key for bank token generation |

---

## 📦 Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack (hot reload)
pnpm build        # Build for production with Turbopack
pnpm start        # Start production server
pnpm clean        # Remove .turbo, .next, and node_modules

# Code Quality
pnpm lint         # Run ESLint across the entire project
pnpm type-check   # Run TypeScript compiler checks (no emit)
pnpm commitlint   # Lint a commit message (used by Husky)
```

---

## 🏗️ Architecture

### Authentication Flow

```
1. User visits a protected route
2. Next.js Middleware checks for valid auth tokens in cookies
3. If no token → redirect to /auth/sign-in (with ?returnTo= param)
4. User logs in → JWT access token + refresh token stored in cookies
5. Axios interceptor auto-refreshes the access token on 401 responses
6. On refresh failure → user is signed out and redirected to sign-in
7. After sign-in → user is redirected to their originally intended route
```

### State Management

The application uses **Zustand** for global client-side state. Each store is focused and minimal:

| Store | File | Manages |
|---|---|---|
| Auth Store | `stores/user-auth-store.ts` | Authenticated user data and session state |
| Bank Store | `stores/bank-store.ts` | Bank integration API tokens |
| Pay-on-Us Store | `stores/pay-on-us-store.ts` | Pay-on-us payment tokens |
| Branch Store | `stores/branch-store.ts` | Branch data and POS operations |

### Data Fetching Pattern

**TanStack Query** manages all server state. The hooks are organised by type:

- **`hooks/query/`** — 90 data-fetching hooks using `useQuery` (listing, detail, statistics, reports)
- **`hooks/mutation/`** — 48 mutation hooks using `useMutation` (create, update, delete operations)
- **`hooks/utils/`** — 13 reusable utility hooks (pagination, filters, KYC, export, debounce)

All API communication flows through a centralised Axios instance in `lib/api.ts`, which:
- Attaches the Bearer token from cookies to every request
- Intercepts 401 responses and attempts a silent token refresh
- Falls back to sign-out if the refresh fails

### Validation

Forms are handled with **React Hook Form** + **Zod** through `@hookform/resolvers`. All schemas live in `lib/schemas/` and are shared between form validation and API payload typing.

### Component Architecture

```
pages (app/dashboard/*/)
  └── feature components (components/admin/*/...)
        └── common/shared components (components/common/*)
              └── base UI primitives (components/ui/*)
```

---

## 🔒 API Proxy & CORS Resolution

### Problem

When downloading QR code images hosted on AWS S3 buckets, browsers block the request due to CORS restrictions because:
1. S3 buckets lack the required CORS response headers
2. Loading cross-origin images into a `<canvas>` "taints" the canvas, preventing export

### Solution

A **server-side image proxy** at `/api/images/proxy` fetches S3 images server-side (bypassing CORS) and serves them back to the browser with the correct headers.

```
Browser → /api/images/proxy?url=<s3-url> → S3 Bucket
                        ↓
              Image returned with CORS headers
                        ↓
              Canvas loads image (same-origin, no taint)
```

**Whitelisted S3 domains:**
- `cpip-dev-public.s3.eu-west-1.amazonaws.com`
- `numoniimages.s3.amazonaws.com`
- `numoni-prod-uploads.s3.eu-west-1.amazonaws.com`
- `s3.amazonaws.com`

**Key files:**
- `app/api/images/proxy/route.ts` — The proxy API route
- `lib/helper.ts` → `loadImageWithCors()` — Detects S3 URLs and routes through proxy
- `lib/helper.ts` → `downloadQRCodeImageWithLogo()` — QR code downloader

---

## 🤝 Contributing

Please refer to the [**CONTRIBUTING.md**](./CONTRIBUTING.md) file for the full contribution guide, including:
- Development workflow
- Branch naming conventions
- Commit message standards (Conventional Commits)
- Code style and TypeScript rules
- Pull request process

---

## 🆘 Support

For questions, bug reports, or feature requests:

- Open a GitHub issue in the repository
- Contact the core development team directly
- Review the documentation in the `docs/` directory

---

*Built with ❤️ by the Numoni engineering team — powered by Next.js, React, and TypeScript.*
