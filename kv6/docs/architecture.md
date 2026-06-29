# KAVAN Architecture Design

This document details the software architecture design of the KAVAN SaaS multi-tenant enterprise portal.

## Client Framework
- **Framework Stack**: React 18, Vite, Tailwind CSS, TypeScript.
- **Routing**: React Router v7 (`createBrowserRouter`) with wildcard fallbacks to ensure clean path loading.
- **State Management**: Redux Toolkit for user auth states and tenant info hydration.
- **Data Persistence**: LocalStorage sync triggers (`kavan_auth`) ensuring session tokens survive page reloads.

## Layout & Navigation Boundary
- **Unified Layout**: `AppLayout` serves as the primary navigation layout rendering a sidebar, header, global command palette (Ctrl+K), and floating AI assistant drawer.
- **Dynamic Accent Sidebar**: Sidebar layout inspects the active user role and highlights links using role-specific accents:
  - Super Admin (Crimson Red)
  - Tenant Admin (Royal Purple)
  - Manager (Green)
  - Developer (Amber)
  - Security Admin (Rose)
  - Employee (Blue)
- **Fault Tolerance**: Every page route is encapsulated in a dedicated React `ErrorBoundary` wrapper. A local Javascript exception in a widget will only affect its isolated section, leaving the main shell intact.
