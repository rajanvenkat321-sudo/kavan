import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { selectIsAuthenticated, selectCanAccess, selectCurrentRole } from '@/store/slices/authSlice';
import type { Role } from '@/types/auth';
import { UnauthorizedPage } from '@/pages/authentication/UnauthorizedPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: string;
  allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  permission,
  allowedRoles 
}) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentRole = useAppSelector(selectCurrentRole);
  
  // Need to call selector hook explicitly for permission if provided
  // We can't use a hook conditionally, so we get the state directly here
  const canAccess = useAppSelector(state => 
    permission ? selectCanAccess(permission)(state) : true
  );

  if (!isAuthenticated) {
    // Redirect to login if not authenticated, save the location they tried to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role restriction if provided
  if (allowedRoles && currentRole && !allowedRoles.includes(currentRole)) {
    return <UnauthorizedPage />;
  }

  // Check permission restriction if provided
  if (permission && !canAccess) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
};
