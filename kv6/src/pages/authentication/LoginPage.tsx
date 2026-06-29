import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, Loader2, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data.email);
      if (response.requiresMfa) {
        navigate('/mfa', { state: { email: data.email } });
      }
    } catch (error) {
      toast.error('Invalid credentials. Try using one of the demo accounts.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'super@kavan.com', role: 'Super Admin' },
    { email: 'admin@tenant.com', role: 'Tenant Admin' },
    { email: 'security@kavan.com', role: 'Security' },
    { email: 'dev@kavan.com', role: 'Developer' },
    { email: 'user@tenant.com', role: 'Employee' },
  ];

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
                defaultValue="password123"
              />
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <Button className="w-full h-12 text-lg mt-4 shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign In'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col border-t bg-muted/50 p-6">
        <Button variant="outline" className="w-full" onClick={() => setShowDemo(!showDemo)}>
          <Info className="w-4 h-4 mr-2" />
          {showDemo ? 'Hide Demo Accounts' : 'Show Demo Accounts'}
        </Button>
        
        {showDemo && (
          <div className="mt-4 w-full grid grid-cols-1 gap-2 animate-in slide-in-from-top-2">
            {demoAccounts.map(acc => (
              <Button 
                key={acc.email} 
                variant="secondary" 
                size="sm" 
                className="justify-start h-10"
                onClick={() => {
                  setValue('email', acc.email);
                  setValue('password', 'password123');
                }}
              >
                <span className="font-semibold w-24 text-left">{acc.role}</span>
                <span className="text-muted-foreground ml-2">{acc.email}</span>
              </Button>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
