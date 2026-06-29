import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ShieldCheck, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';
import { useAppDispatch } from '@/hooks/redux';
import { setCredentials } from '@/store/slices/authSlice';

export const MfaPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const email = location.state?.email;
  
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) return;
    
    setIsLoading(true);
    try {
      const data = await authService.verifyMfa(code, email);
      dispatch(setCredentials({
        user: data.user,
        tenant: data.tenant,
        permissions: data.permissions,
        role: data.user.role,
        accessToken: data.token,
      }));
      
      toast.success('Authentication successful');
      
      // Navigate to Role Resolution (or directly to dashboard if we want)
      navigate('/role-resolution', { replace: true });
    } catch (error) {
      toast.error('Invalid MFA code. Use 123456 for demo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card border-none shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="space-y-1 pb-6 text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight">Two-Factor Auth</CardTitle>
        <CardDescription className="text-base max-w-xs mx-auto">
          Enter the 6-digit code sent to your authenticator app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2 text-center">
            <Input
              id="mfa"
              type="text"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center text-4xl tracking-[0.5em] h-16 bg-background/50 backdrop-blur-sm font-mono uppercase"
              autoFocus
            />
            <p className="text-xs text-muted-foreground mt-2">Hint: Use 123456</p>
          </div>
          
          <Button className="w-full h-12 text-lg shadow-lg" type="submit" disabled={isLoading || code.length < 6}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Verify Device'}
          </Button>
          
          <div className="text-center">
            <Button variant="link" className="text-sm text-muted-foreground" onClick={() => navigate('/login')}>
              Return to Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
