import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Clock, 
  CheckSquare, 
  Calendar, 
  Bell, 
  TrendingUp, 
  Activity, 
  BarChart3,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { toast } from 'sonner';

export const ManagerDashboard: React.FC = () => {
  // Chart Mock Data
  const productivityData = [
    { name: 'Mon', completed: 4, open: 2 },
    { name: 'Tue', completed: 6, open: 1 },
    { name: 'Wed', completed: 5, open: 3 },
    { name: 'Thu', completed: 8, open: 1 },
    { name: 'Fri', completed: 7, open: 2 },
  ];

  const attendanceTrends = [
    { date: '06/25', rate: 98 },
    { date: '06/26', rate: 95 },
    { date: '06/27', rate: 100 },
    { date: '06/28', rate: 97 },
    { date: '06/29', rate: 100 },
  ];

  const taskCompletion = [
    { name: 'Done', value: 34 },
    { name: 'In Progress', value: 12 },
    { name: 'Blocked', value: 4 },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

  const monthlyPerformance = [
    { month: 'Mar', score: 82 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 89 },
    { month: 'Jun', score: 94 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-green-600 dark:text-green-400">Manager Dashboard</h2>
        <p className="text-muted-foreground mt-1">Real-time team analytics, tasks tracking, and workspace approvals hub.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Team Members', value: '4 Employees', desc: 'Active assigned', icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
          { title: 'Attendance Rate', value: '98.4%', desc: 'Current week avg', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { title: 'Pending Approvals', value: '3 Requests', desc: 'Needs resolution', icon: CheckSquare, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { title: 'Open Tasks', value: '8 Milestones', desc: 'Assigned to team', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { title: 'Upcoming Meetings', value: '2 Scheduled', desc: 'Standups today', icon: Calendar, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
          { title: 'Team Performance', value: 'A+ (94%)', desc: 'Monthly score target', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { title: 'Leave Requests', value: '2 Pending', desc: 'Next 30 days', icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { title: 'Unread Notifications', value: '5 Alerts', desc: 'Action required', icon: Bell, color: 'text-red-500', bg: 'bg-red-500/10' },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-green-500/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bg}`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Team Productivity Bar Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Team Productivity</CardTitle>
            <CardDescription>Daily completed vs open task ratios.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} name="Completed" />
                <Bar dataKey="open" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Open" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Trends Line Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Daily team attendance percentage log.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} name="Rate (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Completion Pie Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Task Status Allocation</CardTitle>
            <CardDescription>Distribution of active sprint tasks.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskCompletion}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskCompletion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Performance Curve */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Monthly Team Performance Index</CardTitle>
            <CardDescription>Consolidated quarterly output score trajectory.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} name="Score" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default ManagerDashboard;
