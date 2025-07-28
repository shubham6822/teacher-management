# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Teacher Management System built with Next.js 15, React 19, TypeScript, and Tailwind CSS. It provides a dashboard for managing teachers, viewing attendance, performance metrics, timetables, and leave requests.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture Overview

### App Structure (Next.js App Router)
- Uses Next.js 15 App Router with TypeScript
- Root layout (`src/app/layout.tsx`) wraps all pages with `AuthProvider`
- Protected routes under `src/app/(apps)/` require authentication via `ProtectedRoute` component
- Public routes: `/login` and root `/` (redirects to login if not authenticated)

### Authentication System
- Mock authentication system using localStorage for session persistence
- Login credentials: any email with password "password123"
- Auth utilities in `src/lib/auth.ts` handle login/logout/session management
- `AuthProvider` context manages global auth state
- `ProtectedRoute` component guards authenticated pages

### Layout & Navigation
- Main layout (`src/components/Layout.tsx`) provides sidebar navigation and content area
- `SidebarNavigation` component handles app navigation between modules
- Responsive design with mobile-friendly navigation

### Data Management
- Uses mock data stored in `src/lib/mock-data.ts` and `src/lib/mock-data-extended.ts`
- TypeScript interfaces defined in `src/types/` for type safety
- No external database - all data is static/mock for demonstration

### UI Components
- Built with shadcn/ui components in `src/components/ui/`
- Custom components for each feature area (teachers, attendance, etc.)
- Styled with Tailwind CSS and class-variance-authority for component variants

### Key Features & Pages
- **Teachers (`/teachers`)**: Teacher listing, cards view, detailed profiles, CRUD operations
- **Attendance (`/attendance`)**: Overview dashboard with attendance statistics
- **Timetable (`/timetable`)**: Grid-based schedule display
- **Performance (`/performance`)**: Teacher performance metrics dashboard
- **Leave Requests (`/leave-requests`)**: Leave management interface
- **Settings (`/settings`)**: Application configuration

### File Structure Patterns
- Pages in `src/app/(apps)/[feature]/page.tsx`
- Feature components in `src/components/[FeatureName].tsx`
- Shared UI components in `src/components/ui/`
- Type definitions in `src/types/[feature].ts`
- Utilities and mock data in `src/lib/`

### Key Dependencies
- Next.js 15 with Turbopack for fast development
- React 19 with TypeScript
- Radix UI primitives for accessible components
- Tailwind CSS for styling
- Lucide React for icons

## Important Notes

- This is a demonstration/prototype application with mock authentication
- All teacher and system data is static - no real backend integration
- Uses client-side localStorage for session management
- Built for modern browsers with ES2017+ support