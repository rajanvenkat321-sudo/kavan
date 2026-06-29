# KAVAN Workspace — Enterprise SaaS Management Platform

KAVAN is a multi-tenant enterprise management platform offering granular Role-Based Access Control (RBAC), multi-tenant department directories, time-off scheduling workflows, SOC compliance analytics, and developer APIs. 

Built as a production-ready alternative to HR and Security suites like Workday, Zoho People, and SAP SuccessFactors.

---

## 🚀 Key Modules & Capabilities

### 1. Super Admin Control Suite
- **Interactive Analytics Center**: Advanced telemetry utilizing `recharts` for 24-month MRR curves, region breakdowns, network request rates, and daily active user trajectories.
- **Infrastructure load triage**: Active gauge meters measuring hardware allocations (CPU, memory, disk, and API gateway response times).
- **Tenant management**: Provision new company directories, adjust plans (Starter, Pro, Enterprise), and suspend/activate tenants.
- **Global system configurations**: Toggle beta feature releases, enforce global maintenance modes, configure SMTP, and monitor database performance.

### 2. Manager Operations Console
- **Dashboard telemetry**: 8 KPI cards tracking team performance indexes, approvals pending, upcoming standups, and open tasks.
- **Leave approvals**: Review and resolve leave or expense requests with Approve, Reject, or Request Changes controls.
- **Task delegations**: Direct project milestones assignment with deadline target tracking.
- **Scrum meetings**: Schedule team standup syncs and join video links directly.

### 3. Tenant Admin Management
- **Department CRUD**: Manage department allocations, manager heads, and monthly budget logs.
- **Teams workspace**: Configure team leads, assign members, and audit team performances.
- **Leaves & Payroll**: Review leave history logs and download employee salary payslips.

### 4. Employee Self-Service
- **Request leave**: Apply for annual/sick leaves and track resolution status.
- **Document vault**: Securely upload and access tax reports (W4) or contract agreements.
- **Task board**: Interactive personal milestone checklists.
- **Meetings calendar**: View team scrum sessions and join standups.

### 5. Developer Console
- **API key manager**: Securely generate, hash, and copy REST synchronization credentials.
- **Webhook logs**: Monitor event subscription payloads.
- **Deployments & monitoring**: Audit code revision histories and database connections.

### 6. Security Admin SOC Center
- **Threat monitoring**:SOC incident triggers, firewall logs, and active threat resolutions.
- **Sessions & IP control**: Terminate suspicious active browser sessions and whitelist IP blocks.
- **Compliance reports**: Access downloadable SOC2, HIPAA, and GDPR audit documentation.

---

## 🛡️ Architecture & Design Principles

- **Zero-Crash Layouts**: Every client module is insulated by a robust React `ErrorBoundary` wrapper. Critical script exceptions in one panel will never trigger a white screen or crash the wider portal shell.
- **Role-Based Styling**: Custom sidebars dynamically render links and apply themed border/active accents depending on the authenticated role:
  - Super Admin (Crimson Red)
  - Tenant Admin (Royal Purple)
  - Manager (Green)
  - Developer (Amber)
  - Security Admin (Rose)
  - Employee (Blue)
- **Session Hydration**: Auth states are hydrated from local encrypted buffers, maintaining dashboard states across hard page refreshes.

---

## 🔑 Demo Access Credentials

To log in and experience each isolated role workflow, use the following credentials:

| Identity | Email | Password |
| --- | --- | --- |
| **Super Admin** | `superadmin@kavan.com` | `Admin@123` |
| **Tenant Admin** | `admin@kavan.com` | `Admin@123` |
| **Manager** | `manager@kavan.com` | `Manager@123` |
| **Employee** | `employee@kavan.com` | `Employee@123` |
| **Developer** | `dev@kavan.com` | `Dev@123` |
| **Security Admin** | `security@kavan.com` | `Sec@123` |

---

## 💻 Local Development Setup

### 1. Installation
Clone the repository, enter the workspace directory, and install dependencies:
```bash
npm install
```

### 2. Run Local Dev Server
Launch Vite's hot-reload server:
```bash
npm run dev
```

### 3. Type Checking & Audits
Run TypeScript compiler and ESLint checks to verify file integrity:
```bash
npx tsc --noEmit
npm run lint
```
