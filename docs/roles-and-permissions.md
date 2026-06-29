# KAVAN Roles & Permissions

This document outlines the RBAC (Role-Based Access Control) matrix mapped across the KAVAN workspace.

## Roles Matrix

| Role | Navigation Menu Scope | Primary Dashboard |
| --- | --- | --- |
| **SUPER_ADMIN** | Core Control, Billing & Provisioning, Analytics, Global settings | Super Admin Dashboard |
| **TENANT_ADMIN** | Organization management, Departments, Teams, Leaves, Payroll, Tenant reports | Tenant Admin Dashboard |
| **MANAGER** | Team roster, team attendance, approvals queue, delegating tasks, standup sync meetings | Manager Dashboard |
| **SECURITY_ANALYST** | SOC controls, Audit timeline logs, MFA policies config, active session revokes, Compliance downloads | Security Dashboard |
| **DEVELOPER** | API credentials tokens, Webhooks callbacks, revision deployments logs, latency monitors | Developer Dashboard |
| **EMPLOYEE** | Leave requests submit, personal document uploads, assigned task checklists | Employee Dashboard |

## Access Isolation Rules
1. **Scope Unmounting**: When navigating sidebar items, the previous component is completely unmounted.
2. **Dashboard Isolation**: Tenant Admins cannot view Super Admin financial metrics. Employee users cannot access corporate payroll controls or system config settings.
