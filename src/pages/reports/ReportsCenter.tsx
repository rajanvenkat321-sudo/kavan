import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3, 
  Settings2,
  Clock,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

interface GeneratedReport {
  id: string;
  name: string;
  type: string;
  format: string;
  created: string;
}

export const ReportsCenter: React.FC = () => {
  const [reportType, setReportType] = useState('Financial');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [dateRange, setDateRange] = useState('2026-06-01 to 2026-06-30');
  const [orgFilter, setOrgFilter] = useState('All');
  
  // Modals state
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [schedFreq, setSchedFreq] = useState('Weekly');
  const [schedEmail, setSchedEmail] = useState('');

  const [history, setHistory] = useState<GeneratedReport[]>([
    { id: '1', name: 'Q2 Financial Summary', type: 'Financial', format: 'PDF', created: '2026-06-15' },
    { id: '2', name: 'June Audit History log', type: 'Audit', format: 'CSV', created: '2026-06-28' },
  ]);

  // Chart Data Mock
  const chartData = [
    { name: 'Week 1', value: 4200, users: 120, events: 450 },
    { name: 'Week 2', value: 5100, users: 135, events: 380 },
    { name: 'Week 3', value: 3800, users: 110, events: 620 },
    { name: 'Week 4', value: 6200, users: 160, events: 510 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const handleGenerate = () => {
    const newReport: GeneratedReport = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${reportType} Report - Custom Date`,
      type: reportType,
      format: 'PDF',
      created: new Date().toISOString().split('T')[0]
    };
    setHistory([newReport, ...history]);
    toast.success(`${reportType} report generated successfully!`);
  };

  const handleExport = (format: string) => {
    toast.success(`Exported report in ${format} format successfully!`);
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedEmail) {
      toast.error('Please enter a notification email.');
      return;
    }
    toast.success(`Report scheduling set to ${schedFreq} for ${schedEmail}`);
    setIsScheduleOpen(false);
    setSchedEmail('');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Report Generator</h1>
          <p className="text-muted-foreground mt-1">Design, export, and schedule customized platform intelligence reports.</p>
        </div>
        <Button onClick={() => setIsScheduleOpen(true)} variant="outline" size="sm">
          <Clock className="w-4 h-4 mr-2" />
          Schedule Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Report Builder Form */}
        <Card className="glass-card md:col-span-1">
          <CardHeader>
            <CardTitle>Report Builder</CardTitle>
            <CardDescription>Configure report parameters and criteria.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Report Type</Label>
              <select 
                value={reportType}
                onChange={e => setReportType(e.target.value)}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Financial">Financial Reports</option>
                <option value="Employee">Employee Reports</option>
                <option value="Audit">Audit Reports</option>
                <option value="Custom">Custom Builder</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label>Date Range</Label>
              <Input 
                value={dateRange}
                onChange={e => setDateRange(e.target.value)}
                placeholder="YYYY-MM-DD to YYYY-MM-DD"
              />
            </div>

            <div className="space-y-1">
              <Label>Organization Scope</Label>
              <select 
                value={orgFilter}
                onChange={e => setOrgFilter(e.target.value)}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="All">All Tenants</option>
                <option value="Acme">Acme Corp Only</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label>Visualization Layout</Label>
              <select 
                value={chartType}
                onChange={e => setChartType(e.target.value as any)}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Button onClick={handleGenerate} className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Visualization
              </Button>
              
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport('PDF')}>PDF</Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('EXCEL')}>Excel</Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('CSV')}>CSV</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Visualization Screen */}
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>{reportType} Analytics Summary</CardTitle>
            <CardDescription>Live render of generated visualization metrics.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : chartType === 'line' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              ) : (
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* History table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Reports History</CardTitle>
          <CardDescription>Recently generated and exported intelligence logs.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Export Format</TableHead>
                <TableHead>Generation Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-semibold">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>
                  <TableCell>{item.format}</TableCell>
                  <TableCell>{item.created}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleExport(item.format)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Scheduling Modal */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Automatic Reports</DialogTitle>
            <DialogDescription>Deliver reports directly to stakeholder emails on a custom cron cycle.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveSchedule} className="space-y-4">
            <div className="space-y-1">
              <Label>Frequency</Label>
              <select 
                value={schedFreq}
                onChange={e => setSchedFreq(e.target.value)}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm outline-none"
              >
                <option value="Daily">Daily Summary</option>
                <option value="Weekly">Weekly Digest</option>
                <option value="Monthly">Monthly Financial audit</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <Label>Notification Email</Label>
              <Input 
                id="sched-email"
                type="email"
                placeholder="manager@kavan.com"
                value={schedEmail}
                onChange={e => setSchedEmail(e.target.value)}
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsScheduleOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Set Schedule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
