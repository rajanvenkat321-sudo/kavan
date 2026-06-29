import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentRole } from '@/store/slices/authSlice';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const currentRole = useAppSelector(selectCurrentRole);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="glass-card max-w-lg w-full rounded-2xl p-8 text-center border-destructive/20 shadow-2xl relative animate-in fade-in zoom-in duration-500">
        
        <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 bg-destructive/20 rounded-full animate-ping opacity-75" />
          <ShieldAlert className="w-10 h-10 text-destructive relative z-10" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-foreground">
          403 Forbidden
        </h1>
        <p className="text-muted-foreground mb-6 text-lg">
          You do not have the required permissions to access this area.
        </p>

        <div className="bg-secondary/50 rounded-lg p-4 mb-8 text-sm">
          <span className="text-muted-foreground block mb-1">Your Current Role</span>
          <span className="font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full">
            {currentRole?.replace('_', ' ') || 'GUEST'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button 
            variant="default" 
            size="lg" 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
