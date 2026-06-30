import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useMsal } from '@azure/msal-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';
import { useAppDispatch } from '@/hooks/redux';
import { setCredentials } from '@/store/slices/authSlice';
import { loginRequest } from '@/features/auth/microsoftAuth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      fill="#EA4335"
      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.18 2.73 1.22 6.72l4.046 3.045z"
    />
    <path
      fill="#34A853"
      d="M16.04 15.345c-1.127.755-2.545 1.2-4.04 1.2a7.07 7.07 0 0 1-6.733-4.856L1.21 14.73C3.17 18.73 7.27 21.46 12 21.46c2.99 0 5.761-1.027 7.842-2.8l-3.801-3.315z"
    />
    <path
      fill="#4285F4"
      d="M23.49 12.275c0-.827-.074-1.624-.21-2.392H12v4.51h6.46A5.534 5.534 0 0 1 16.04 15.34l3.801 3.32C22.062 16.8 23.49 14.74 23.49 12.275z"
    />
    <path
      fill="#FBBC05"
      d="M5.267 9.765L1.22 6.72C.44 8.31 0 10.1 0 12c0 1.9.44 3.69 1.22 5.28l4.048-3.046a7.031 7.031 0 0 1 0-4.47z"
    />
  </svg>
);

const MicrosoftIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23">
    <path fill="#f35325" d="M0 0h11v11H0z" />
    <path fill="#81bc06" d="M12 0h11v11H12z" />
    <path fill="#05a6f0" d="M0 12h11v11H0z" />
    <path fill="#ffba08" d="M12 12h11v11H12z" />
  </svg>
);

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { instance } = useMsal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data.email, data.password);
      if (response.requiresMfa) {
        navigate('/mfa', { state: { email: data.email } });
      }
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const data = await authService.loginWithGoogle(tokenResponse.access_token);
        dispatch(setCredentials({
          user: data.user,
          tenant: data.tenant,
          permissions: data.permissions,
          role: data.user.role,
          accessToken: data.token,
          refreshToken: data.refreshToken,
        }));
        toast.success('Successfully authenticated with Google');
        navigate('/role-resolution', { replace: true });
      } catch (error: any) {
        toast.error(error.message || 'Google authentication failed');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error('Google login popup was closed or failed.');
    }
  });

  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const accessToken = loginResponse.accessToken;
      
      const data = await authService.loginWithMicrosoft(accessToken);
      dispatch(setCredentials({
        user: data.user,
        tenant: data.tenant,
        permissions: data.permissions,
        role: data.user.role,
        accessToken: data.token,
        refreshToken: data.refreshToken,
      }));
      toast.success('Successfully authenticated with Microsoft');
      navigate('/role-resolution', { replace: true });
    } catch (error: any) {
      if (error.name === 'BrowserAuthError' && error.errorCode === 'user_cancelled') {
        toast.error('Microsoft login was cancelled.');
      } else {
        toast.error(error.message || 'Microsoft authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card border-none shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-purple-500" />
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-base">
          Enter your credentials to access your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10 h-12 bg-background/50 backdrop-blur-sm transition-all focus:bg-background"
                {...register('email')}
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-12 bg-background/50 backdrop-blur-sm transition-all focus:bg-background"
                {...register('password')}
                disabled={isLoading}
              />
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <Button className="w-full h-12 text-lg mt-4 shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign In'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-sm font-semibold transition-all hover:bg-[#4285F4]/10 hover:border-[#4285F4]/30"
            onClick={() => handleGoogleLogin()}
            disabled={isLoading}
          >
            <GoogleIcon />
            Continue with Google
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-sm font-semibold transition-all hover:bg-neutral-800/10 dark:hover:bg-neutral-200/10 hover:border-[#f35325]/30"
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
          >
            <MicrosoftIcon />
            Continue with Microsoft
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
