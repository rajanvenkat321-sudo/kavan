import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, Cpu, HardDrive, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockService } from '@/services/mockData';

export const SuperAdminDashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching chart data
    const fetchChartData = async () => {
      // In a real app, this would call mockService.getRevenueData()
      const chartData = [
        { name: 'Jan', revenue: 4000, tenants: 24 },
        { name: 'Feb', revenue: 3000, tenants: 13 },
        { name: 'Mar', revenue: 2000, tenants: 98 },
        { name: 'Apr', revenue: 2780, tenants: 39 },
        { name: 'May', revenue: 1890, tenants: 48 },
        { name: 'Jun', revenue: 2390, tenants: 38 },
        { name: 'Jul', revenue: 3490, tenants: 43 },
      ];
      setData(chartData);
    };
    fetchChartData();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Super Admin Overview</h2>
          <p className="text-muted-foreground mt-1">Platform-wide metrics and infrastructure status.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Total Tenants', value: '1,248', icon: Building, trend: '+12%', color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { title: 'Active Users', value: '34,291', icon: Users, trend: '+4.5%', color: 'text-green-500', bg: 'bg-green-500/10' },
          { title: 'System CPU', value: '42%', icon: Cpu, trend: 'Stable', color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { title: 'Security Events', value: '3', icon: AlertTriangle, trend: '-2', color: 'text-destructive', bg: 'bg-destructive/10' },
        ].map((stat, i) => (
          <Card key={i} className="glass-card hover:scale-[1.02] transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 glass-card">
          <CardHeader>
            <CardTitle>Platform Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 glass-card">
          <CardHeader>
            <CardTitle>New Tenants</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="tenants" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
