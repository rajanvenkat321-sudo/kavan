import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from '@/components/ui/sonner';

import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';

import { LoginPage } from './pages/authentication/LoginPage';
import { MfaPage } from './pages/authentication/MfaPage';
import { RoleResolutionPage } from './pages/authentication/RoleResolutionPage';
import { UnauthorizedPage } from './pages/authentication/UnauthorizedPage';
import { ProtectedRoute } from './components/permissions/ProtectedRoute';

import { Dashboard } from './pages/dashboards/Dashboard';
import { SuperAdminDashboard } from './pages/dashboards/SuperAdminDashboard';
import { TenantAdminDashboard } from './pages/dashboards/TenantAdminDashboard';
import { SecurityDashboard } from './pages/dashboards/SecurityDashboard';
import { DeveloperDashboard } from './pages/dashboards/DeveloperDashboard';
import { EmployeeDashboard } from './pages/dashboards/EmployeeDashboard';
import { ManagerDashboard } from './pages/dashboards/ManagerDashboard';
import { UserManagement } from './pages/users/UserManagement';
import { OrganizationManagement } from './pages/organizations/OrganizationManagement';
import { ReportsCenter } from './pages/reports/ReportsCenter';
import { SecurityCenter } from './pages/security/SecurityCenter';
import { Integrations } from './pages/integrations/Integrations';
import { Notifications } from './pages/notifications/Notifications';
import { ProfileSettings } from './pages/profile/ProfileSettings';
import { SystemSettings } from './pages/settings/SystemSettings';

import { EmployeeManagement } from './pages/employees/EmployeeManagement';
import { ErrorBoundary } from './components/ErrorBoundary';

// Super Admin Page Imports
import { 
  TenantsPage, 
  RolesPermissionsPage, 
  AnalyticsPage, 
  SystemMonitoringPage, 
  AuditLogsPage, 
  SubscriptionsPage, 
  LicensesPage, 
  GlobalSettingsPage, 
  FeatureTogglesPage, 
  MaintenancePage, 
  DatabaseMonitorPage, 
  AiAssistantPage 
} from './pages/super-admin/SuperAdminPages';

// Tenant Admin Page Imports
import { 
  DepartmentsPage, 
  TeamsPage, 
  LeavesPage, 
  PayrollPage 
} from './pages/tenant-admin/TenantAdminPages';

// Developer Page Imports
import { 
  ApiKeysPage, 
  WebhooksPage, 
  DeploymentsPage, 
  MonitoringPage 
} from './pages/developer/DeveloperPages';

// Security Admin Page Imports
import { 
  SecurityAuditLogsPage, 
  ThreatsPage, 
  MfaPage as SecurityMfaPage, 
  SessionsPage, 
  IpManagementPage, 
  PermissionsPage, 
  CompliancePage 
} from './pages/security-admin/SecurityAdminPages';

// Employee Page Imports
import { 
  EmployeeLeavesPage, 
  EmployeeDocumentsPage, 
  EmployeeTasksPage, 
  EmployeeMeetingsPage 
} from './pages/employee/EmployeePages';

// Manager Page Imports
import {
  ManagerTeamPage,
  ManagerAttendancePage,
  ManagerApprovalsPage,
  ManagerTasksPage,
  ManagerMeetingsPage,
  ManagerReportsPage,
  ManagerNotificationsPage,
  ManagerProfilePage,
  ManagerSettingsPage
} from './pages/manager/ManagerPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/role-resolution" replace />
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'mfa', element: <MfaPage /> },
      { path: 'role-resolution', element: <RoleResolutionPage /> },
    ]
  },
  {
    path: '/',
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { path: 'dashboard', element: <ErrorBoundary><Dashboard /></ErrorBoundary> },
      { path: 'dashboard/super-admin', element: <ErrorBoundary><SuperAdminDashboard /></ErrorBoundary> },
      { path: 'dashboard/tenant-admin', element: <ErrorBoundary><TenantAdminDashboard /></ErrorBoundary> },
      { path: 'dashboard/org-admin', element: <ErrorBoundary><TenantAdminDashboard /></ErrorBoundary> },
      { path: 'dashboard/security', element: <ErrorBoundary><SecurityDashboard /></ErrorBoundary> },
      { path: 'dashboard/developer', element: <ErrorBoundary><DeveloperDashboard /></ErrorBoundary> },
      { path: 'dashboard/employee', element: <ErrorBoundary><EmployeeDashboard /></ErrorBoundary> },
      { path: 'dashboard/manager', element: <ErrorBoundary><ManagerDashboard /></ErrorBoundary> },
      { path: 'manager/dashboard', element: <ErrorBoundary><ManagerDashboard /></ErrorBoundary> },
      
      // Manager Routes
      { path: 'manager/team', element: <ErrorBoundary><ManagerTeamPage /></ErrorBoundary> },
      { path: 'manager/attendance', element: <ErrorBoundary><ManagerAttendancePage /></ErrorBoundary> },
      { path: 'manager/approvals', element: <ErrorBoundary><ManagerApprovalsPage /></ErrorBoundary> },
      { path: 'manager/tasks', element: <ErrorBoundary><ManagerTasksPage /></ErrorBoundary> },
      { path: 'manager/meetings', element: <ErrorBoundary><ManagerMeetingsPage /></ErrorBoundary> },
      { path: 'manager/reports', element: <ErrorBoundary><ManagerReportsPage /></ErrorBoundary> },
      { path: 'manager/notifications', element: <ErrorBoundary><ManagerNotificationsPage /></ErrorBoundary> },
      { path: 'manager/profile', element: <ErrorBoundary><ManagerProfilePage /></ErrorBoundary> },
      { path: 'manager/settings', element: <ErrorBoundary><ManagerSettingsPage /></ErrorBoundary> },
      
      // Super Admin Routes
      { path: 'super-admin/tenants', element: <ErrorBoundary><TenantsPage /></ErrorBoundary> },
      { path: 'super-admin/roles', element: <ErrorBoundary><RolesPermissionsPage /></ErrorBoundary> },
      { path: 'super-admin/analytics', element: <ErrorBoundary><AnalyticsPage /></ErrorBoundary> },
      { path: 'super-admin/system-monitoring', element: <ErrorBoundary><SystemMonitoringPage /></ErrorBoundary> },
      { path: 'super-admin/audit-logs', element: <ErrorBoundary><AuditLogsPage /></ErrorBoundary> },
      { path: 'super-admin/subscriptions', element: <ErrorBoundary><SubscriptionsPage /></ErrorBoundary> },
      { path: 'super-admin/licenses', element: <ErrorBoundary><LicensesPage /></ErrorBoundary> },
      { path: 'super-admin/settings', element: <ErrorBoundary><GlobalSettingsPage /></ErrorBoundary> },
      { path: 'super-admin/feature-toggles', element: <ErrorBoundary><FeatureTogglesPage /></ErrorBoundary> },
      { path: 'super-admin/maintenance', element: <ErrorBoundary><MaintenancePage /></ErrorBoundary> },
      { path: 'super-admin/database-monitor', element: <ErrorBoundary><DatabaseMonitorPage /></ErrorBoundary> },
      { path: 'super-admin/ai-assistant', element: <ErrorBoundary><AiAssistantPage /></ErrorBoundary> },

      // Tenant Admin Routes
      { path: 'tenant/departments', element: <ErrorBoundary><DepartmentsPage /></ErrorBoundary> },
      { path: 'tenant/teams', element: <ErrorBoundary><TeamsPage /></ErrorBoundary> },
      { path: 'tenant/leaves', element: <ErrorBoundary><LeavesPage /></ErrorBoundary> },
      { path: 'tenant/payroll', element: <ErrorBoundary><PayrollPage /></ErrorBoundary> },

      // Employee Routes
      { path: 'employee/leaves', element: <ErrorBoundary><EmployeeLeavesPage /></ErrorBoundary> },
      { path: 'employee/documents', element: <ErrorBoundary><EmployeeDocumentsPage /></ErrorBoundary> },
      { path: 'employee/tasks', element: <ErrorBoundary><EmployeeTasksPage /></ErrorBoundary> },
      { path: 'employee/meetings', element: <ErrorBoundary><EmployeeMeetingsPage /></ErrorBoundary> },

      // Developer Routes
      { path: 'developer/api-keys', element: <ErrorBoundary><ApiKeysPage /></ErrorBoundary> },
      { path: 'developer/webhooks', element: <ErrorBoundary><WebhooksPage /></ErrorBoundary> },
      { path: 'developer/deployments', element: <ErrorBoundary><DeploymentsPage /></ErrorBoundary> },
      { path: 'developer/monitoring', element: <ErrorBoundary><MonitoringPage /></ErrorBoundary> },

      // Security Admin Routes
      { path: 'security/audit-logs', element: <ErrorBoundary><SecurityAuditLogsPage /></ErrorBoundary> },
      { path: 'security/threats', element: <ErrorBoundary><ThreatsPage /></ErrorBoundary> },
      { path: 'security/mfa', element: <ErrorBoundary><SecurityMfaPage /></ErrorBoundary> },
      { path: 'security/sessions', element: <ErrorBoundary><SessionsPage /></ErrorBoundary> },
      { path: 'security/ip-management', element: <ErrorBoundary><IpManagementPage /></ErrorBoundary> },
      { path: 'security/permissions', element: <ErrorBoundary><PermissionsPage /></ErrorBoundary> },
      { path: 'security/compliance', element: <ErrorBoundary><CompliancePage /></ErrorBoundary> },

      { path: 'users', element: <ErrorBoundary><UserManagement /></ErrorBoundary> },
      { path: 'users/roles', element: <ErrorBoundary><UserManagement /></ErrorBoundary> },
      { path: 'organizations', element: <ErrorBoundary><OrganizationManagement /></ErrorBoundary> },
      { path: 'employees', element: <ErrorBoundary><EmployeeManagement /></ErrorBoundary> },
      { path: 'reports', element: <ErrorBoundary><ReportsCenter /></ErrorBoundary> },
      { path: 'security', element: <ErrorBoundary><SecurityCenter /></ErrorBoundary> },
      { path: 'integrations', element: <ErrorBoundary><Integrations /></ErrorBoundary> },
      { path: 'notifications', element: <ErrorBoundary><Notifications /></ErrorBoundary> },
      { path: 'profile', element: <ErrorBoundary><ProfileSettings /></ErrorBoundary> },
      { path: 'settings', element: <ErrorBoundary><SystemSettings /></ErrorBoundary> },
    ]
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </Provider>
  );
};

export default App;
