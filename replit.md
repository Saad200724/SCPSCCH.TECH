# SCPSC Cyber Hub

## Overview

SCPSC Cyber Hub is a technology club website for a student organization focused on competitive programming, web development, AI/ML, video editing, and graphics design. The application is a full-stack web app with a React frontend and Express backend, featuring an admin panel for managing events and projects, and a PostgreSQL database for persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Routing**: React Router DOM for client-side navigation
- **State Management**: TanStack Query (React Query) for server state and caching
- **Styling**: Tailwind CSS with custom cyber-themed design tokens (cyan/violet color scheme)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **File Structure**: Client code lives in `/client/src` with pages, components, hooks, and lib folders

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for development, esbuild for production bundling
- **API Pattern**: RESTful JSON APIs under `/api/*` prefix
- **Authentication**: Simple token-based admin auth with hardcoded password (for admin panel only)
- **Development**: Vite middleware integration for HMR during development

### Data Storage
- **Database**: PostgreSQL via the `pg` package
- **Schema**: Two main tables - `events` and `projects` with auto-initialization on startup
- **Connection**: Uses `DATABASE_URL` environment variable for connection string
- **No ORM**: Direct SQL queries with parameterized statements

### Key Design Patterns
- **Monorepo Structure**: Client, server, and shared code in one repository
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared code
- **API Proxying**: Development server proxies API requests to Express backend
- **Static Serving**: Production serves built frontend from `dist/public`

## External Dependencies

### Database
- **PostgreSQL**: Required for data persistence. Connection via `DATABASE_URL` environment variable.

### Third-Party Services
- **DiceBear API**: Used for avatar generation (preconnected in HTML)
- **Google Fonts**: Electrolize, Rajdhani, and Inconsolata font families

### Key NPM Packages
- **UI Framework**: Radix UI primitives, shadcn/ui components, Lucide icons
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form with Zod resolvers
- **Carousel**: Embla Carousel
- **Date Handling**: date-fns
- **Charts**: Recharts

### Deployment
- **Vercel Configuration**: Includes `vercel.json` for Vite framework deployment with SPA rewrites
- **Build Output**: Frontend builds to `dist/public`, server bundles to `dist/index.js`