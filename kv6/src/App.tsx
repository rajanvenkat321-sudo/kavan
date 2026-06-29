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

import { SuperAdminDashboard } from './pages/dashboards/SuperAdminDashboard';
import { TenantAdminDashboard } from './pages/dashboards/TenantAdminDashboard';
import { SecurityDashboard } from './pages/dashboards/SecurityDashboard';
import { DeveloperDashboard } from './pages/dashboards/DeveloperDashboard';
import { EmployeeDashboard } from './pages/dashboards/EmployeeDashboard';
import { PermissionMatrix } from './pages/permissions/PermissionMatrix';

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
    path: '/dashboard',
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      {
        path: 'super-admin',
        element: (
          <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'tenant-admin',
        element: (
          <ProtectedRoute allowedRoles={['TENANT_ADMIN']}>
            <TenantAdminDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'security',
        element: (
          <ProtectedRoute allowedRoles={['SECURITY_ANALYST']}>
            <SecurityDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'developer',
        element: (
          <ProtectedRoute allowedRoles={['DEVELOPER']}>
            <DeveloperDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'employee',
        element: (
          <ProtectedRoute allowedRoles={['EMPLOYEE']}>
            <EmployeeDashboard />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/permissions',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <PermissionMatrix />
      }
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
