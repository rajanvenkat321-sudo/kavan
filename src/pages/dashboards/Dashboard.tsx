import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentRole } from '@/store/slices/authSlice';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { TenantAdminDashboard } from './TenantAdminDashboard';
import { SecurityDashboard } from './SecurityDashboard';
import { DeveloperDashboard } from './DeveloperDashboard';
import { EmployeeDashboard } from './EmployeeDashboard';
import { ManagerDashboard } from './ManagerDashboard';

export const Dashboard: React.FC = () => {
  const currentRole = useAppSelector(selectCurrentRole);

  switch (currentRole) {
    case 'SUPER_ADMIN':
      return <SuperAdminDashboard />;
    case 'TENANT_ADMIN':
      return <TenantAdminDashboard />;
    case 'SECURITY_ANALYST':
      return <SecurityDashboard />;
    case 'DEVELOPER':
      return <DeveloperDashboard />;
    case 'MANAGER':
      return <ManagerDashboard />;
    case 'EMPLOYEE':
    default:
      return <EmployeeDashboard />;
  }
};
