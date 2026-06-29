import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { selectCurrentRole } from '../../store/slices/authSlice';
import type { Role } from '../../types/auth';

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  allowedRoles, 
  children, 
  fallback = null 
}) => {
  const currentRole = useAppSelector(selectCurrentRole);

  if (!currentRole || !allowedRoles.includes(currentRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
