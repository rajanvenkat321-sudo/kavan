# Changelog

All notable changes to the KAVAN project will be documented in this file.

## [6.0.0] - 2026-06-29

### Added
- Enterprise-grade Recharts Super Admin Analytics center with monthly MRR, user registrations, and subscription plan splits.
- Multi-component layout modules for Super Admin: Feature toggles, maintenance mode, system monitor load triages, API keys, and audit timeline.
- Employee Self-Service console for leave requests, document vault uploads, personal task boards, and upcoming meetings calendar.
- Developer keys manager, webhook endpoint subscribers, and platform deploy history.
- SOC compliance documentation downloads (SOC2, HIPAA reports) under Security Admin.

### Fixed
- Fixed critical syntax error where missing `navigationConfig` from `navigation.ts` caused browser white screen crash.
- Recovered Manager RBAC permissions, routes, and sidebar navigation links.
- Consolidated duplicate import declarations in `AppLayout.tsx` and resolved TypeScript compilation errors in `ManagerDashboard.tsx`.
- Integrated global `ErrorBoundary` wrappers around client pages to insulate dashboard widgets from script failures.
