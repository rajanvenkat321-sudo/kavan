import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { selectCanAccess } from '../../store/slices/authSlice';

interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({ 
  permission, 
  children, 
  fallback = null 
}) => {
  const canAccess = useAppSelector(selectCanAccess(permission));

  if (!canAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
