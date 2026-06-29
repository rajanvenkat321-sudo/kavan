import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CreditCard, Activity, Package } from 'lucide-react';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentTenant } from '@/store/slices/authSlice';

export const TenantAdminDashboard: React.FC = () => {
  const tenant = useAppSelector(selectCurrentTenant);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{tenant?.name || 'Your Organization'}</h2>
        <p className="text-muted-foreground mt-1">Manage your team, billing, and assigned products.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Organization Users', value: '42', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { title: 'Active Subscriptions', value: '3', icon: Package, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { title: 'Monthly Cost', value: '$1,299', icon: CreditCard, color: 'text-green-500', bg: 'bg-green-500/10' },
          { title: 'Team Activity', value: '89%', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ].map((stat, i) => (
          <Card key={i} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Team Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-semibold text-sm">
                    U{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium">User {i} updated profile</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-4xl font-extrabold text-primary mb-2">
                  {tenant?.subscriptionPlan || 'PRO'}
                </h3>
                <p className="text-sm text-muted-foreground">Renews on Oct 1st, 2026</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-semibold">
                  Active
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
