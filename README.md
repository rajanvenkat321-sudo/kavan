# KAVAN

<p align="center">
  <b>Enterprise Workspace & Workforce Management Platform</b><br>
  Multi-tenant SaaS platform with Role-Based Access Control (RBAC), organization management, employee self-service, analytics, and security administration.
</p>

---

## 📌 Overview

KAVAN is an enterprise workspace management platform designed to streamline organizational operations through a unified dashboard experience.

The platform supports multiple user roles, including:

* Super Admin
* Tenant Admin
* Manager
* Employee
* Developer
* Security Administrator

Each role receives isolated permissions, dashboards, and workflows based on business requirements.

---

## ✨ Core Features

### 🔐 Authentication & Authorization

* Secure login system
* Role-Based Access Control (RBAC)
* Protected routes and permission guards
* Session persistence across refreshes

### 🏢 Organization Management

* Multi-tenant architecture
* Organization onboarding
* Department management
* Team creation and assignment
* User directory management

### 👨💼 Super Admin Dashboard

* Platform-wide analytics
* Tenant management
* Subscription plan administration
* System configuration controls
* Infrastructure monitoring

### 👥 Manager Workspace

* Team performance dashboard
* Leave approvals
* Task assignment workflows
* Meeting scheduling
* Employee tracking

### 🧑💻 Employee Portal

* Leave requests
* Personal task management
* Document access
* Meeting schedules
* Profile management

### ⚙️ Developer Console

* API key generation
* Webhook management
* Integration settings
* Deployment logs

### 🛡️ Security Center

* Security monitoring
* Active session management
* IP access controls
* Compliance reporting
* Incident tracking

---

## 🏗️ Architecture

### Frontend Stack

| Technology    | Purpose                   |
| ------------- | ------------------------- |
| React         | UI Framework              |
| TypeScript    | Type Safety               |
| Vite          | Build Tool                |
| Tailwind CSS  | Styling                   |
| shadcn/ui     | Component Library         |
| Redux Toolkit | State Management          |
| React Router  | Routing                   |
| Recharts      | Analytics & Visualization |
| Lucide React  | Icons                     |

---

## 📂 Project Structure

```text
src/
├── assets/              # Static assets
├── components/
│   ├── navigation/      # Sidebar & navigation
│   ├── permissions/     # RBAC guards
│   └── ui/              # Shared UI components
│
├── config/              # App configurations
├── hooks/               # Custom hooks
├── layouts/             # Layout wrappers
├── lib/                 # Utilities
│
├── pages/
│   ├── authentication/
│   ├── dashboards/
│   ├── super-admin/
│   ├── tenant-admin/
│   ├── manager/
│   ├── employee/
│   ├── developer/
│   ├── security-admin/
│   ├── organizations/
│   ├── users/
│   └── reports/
│
├── services/            # API services & mock data
├── store/               # Redux store
└── types/               # TypeScript interfaces
```

---

## 🎨 Role Themes

| Role           | Theme      |
| -------------- | ---------- |
| Super Admin    | 🔴 Crimson |
| Tenant Admin   | 🟣 Purple  |
| Manager        | 🟢 Green   |
| Employee       | 🔵 Blue    |
| Developer      | 🟠 Amber   |
| Security Admin | 🌹 Rose    |

---

## 🔑 Demo Accounts

| Role           | Email                  | Password       |
| -------------- | ---------------------- | -------------- |
| Super Admin    | `superadmin@kavan.com` | `Admin@123`    |
| Tenant Admin   | `admin@kavan.com`      | `Admin@123`    |
| Manager        | `manager@kavan.com`    | `Manager@123`  |
| Employee       | `employee@kavan.com`   | `Employee@123` |
| Developer      | `dev@kavan.com`        | `Dev@123`      |
| Security Admin | `security@kavan.com`   | `Sec@123`      |

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/rajanvenkat321-sudo/kavan.git
cd kavan
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

---

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview

# Run lint checks
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 🛣️ Roadmap

### Phase 1

* [x] Authentication system
* [x] RBAC implementation
* [x] Dashboard layouts
* [x] Role-based navigation

### Phase 2

* [ ] Backend integration
* [ ] Real database support
* [ ] Notification system
* [ ] Audit logging

### Phase 3

* [ ] API marketplace
* [ ] Mobile application
* [ ] AI assistant integration
* [ ] Enterprise SSO support

---

## 🤝 Contributors

* **V. Rajan**
* **KAVAN Development Team**

---

## 📜 License

This project is developed for educational, portfolio, and enterprise prototype purposes.

© 2026 KAVAN. All rights reserved.
