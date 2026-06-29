import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentRole, selectIsAuthenticated } from '@/store/slices/authSlice';
import { Loader2 } from 'lucide-react';

export const RoleResolutionPage: React.FC = () => {
  const navigate = useNavigate();
  const currentRole = useAppSelector(selectCurrentRole);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || !currentRole) {
      navigate('/login', { replace: true });
      return;
    }

    // Simulate network delay for resolving tenant & environment config
    const timer = setTimeout(() => {
      switch (currentRole) {
        case 'SUPER_ADMIN':
          navigate('/dashboard/super-admin', { replace: true });
          break;
        case 'TENANT_ADMIN':
          navigate('/dashboard/tenant-admin', { replace: true });
          break;
        case 'SECURITY_ANALYST':
          navigate('/dashboard/security', { replace: true });
          break;
        case 'DEVELOPER':
          navigate('/dashboard/developer', { replace: true });
          break;
        case 'EMPLOYEE':
          navigate('/dashboard/employee', { replace: true });
          break;
        default:
          navigate('/login', { replace: true });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentRole, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />
      
      <div className="z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-2xl animate-spin-slow" style={{ animationDuration: '3s' }} />
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Resolving Workspace</h2>
        <p className="text-muted-foreground text-lg">Initializing your personalized environment...</p>
      </div>
    </div>
  );
};
