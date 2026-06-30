import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  DollarSign, 
  Award, 
  Upload, 
  CheckCircle, 
  XCircle,
  FileDown
} from 'lucide-react';
import { toast } from 'sonner';

interface LeaveRequest {
  id: string;
  name: string;
  type: string;
  dates: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export const EmployeeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directory' | 'leave' | 'attendance' | 'payroll'>('directory');
  
  // Attendance State
  const [clockedIn, setClockedIn] = useState(false);
  const [attendanceLogs, setAttendanceLogs] = useState<{ date: string; time: string; action: string }[]>([
    { date: '2026-06-29', time: '09:00 AM', action: 'CLOCK_IN' },
    { date: '2026-06-28', time: '06:05 PM', action: 'CLOCK_OUT' },
    { date: '2026-06-28', time: '09:02 AM', action: 'CLOCK_IN' },
  ]);

  // Leave State
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: '1', name: 'John Doe', type: 'Annual Leave', dates: 'July 5 - July 10', status: 'PENDING' },
    { id: '2', name: 'Jane Smith', type: 'Sick Leave', dates: 'June 12 - June 13', status: 'APPROVED' },
  ]);
  const [newLeaveType, setNewLeaveType] = useState('Annual Leave');
  const [newLeaveDates, setNewLeaveDates] = useState('');

  // Clock action
  const handleClockToggle = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = new Date().toISOString().split('T')[0];
    const action = clockedIn ? 'CLOCK_OUT' : 'CLOCK_IN';
    
    setAttendanceLogs([{ date, time, action }, ...attendanceLogs]);
    setClockedIn(!clockedIn);
    toast.success(clockedIn ? 'Clocked out successfully.' : 'Clocked in successfully.');
  };

  // Leave actions
  const handleRequestLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeaveDates) {
      toast.error('Please enter leave dates.');
      return;
    }
    const newRequest: LeaveRequest = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Logged-in User',
      type: newLeaveType,
      dates: newLeaveDates,
      status: 'PENDING'
    };
    setLeaveRequests([newRequest, ...leaveRequests]);
    setNewLeaveDates('');
    toast.success('Leave request submitted!');
  };

  const handleResolveLeave = (id: string, decision: 'APPROVED' | 'REJECTED') => {
    setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, status: decision } : r));
    toast.success(`Leave request ${decision.toLowerCase()} successfully.`);
  };

  // Upload Doc Simulation
  const handleDocUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        toast.success(`Uploaded ${file.name} to employee profile documents.`);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
        <p className="text-muted-foreground mt-1">Manage directory, payroll, leave requests, and attendance.</p>
      </div>

      {/* Tabs bar */}
      <div className="flex border-b">
        {[
          { id: 'directory', label: 'Directory', icon: Users },
          { id: 'attendance', label: 'Attendance & Shifts', icon: Clock },
          { id: 'leave', label: 'Leave Requests', icon: Calendar },
          { id: 'payroll', label: 'Payroll & Payslips', icon: DollarSign },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Directory Tab */}
      {activeTab === 'directory' && (
        <Card className="glass-card">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Employee Directory</CardTitle>
              <CardDescription>Comprehensive directory of all contracted team members.</CardDescription>
            </div>
            <Button onClick={handleDocUpload} size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Hire Date</TableHead>
                  <TableHead>Lifecycle Stage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: 'John Doe', title: 'Senior Engineer', loc: 'HQ - New York', date: '2023-01-15', stage: 'ACTIVE' },
                  { name: 'Jane Smith', title: 'Product Manager', loc: 'Remote', date: '2024-03-10', stage: 'ONBOARDING' },
                  { name: 'Alice Johnson', title: 'Operations Lead', loc: 'Chicago Hub', date: '2021-11-01', stage: 'ACTIVE' }
                ].map((emp, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-semibold">{emp.name}</TableCell>
                    <TableCell>{emp.title}</TableCell>
                    <TableCell>{emp.loc}</TableCell>
                    <TableCell>{emp.date}</TableCell>
                    <TableCell>
                      <Badge variant={emp.stage === 'ACTIVE' ? 'default' : 'secondary'} className={emp.stage === 'ACTIVE' ? 'bg-green-500 hover:bg-green-600 text-white' : ''}>
                        {emp.stage}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card md:col-span-1">
            <CardHeader>
              <CardTitle>Clock In/Out</CardTitle>
              <CardDescription>Record your daily working shifts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center py-6 bg-muted/30 rounded-xl border border-dashed">
                <span className="text-sm text-muted-foreground mb-1">Status</span>
                <Badge variant={clockedIn ? 'default' : 'secondary'} className={`text-base px-4 py-1 mb-4 ${clockedIn ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}>
                  {clockedIn ? 'CLOCKED IN' : 'CLOCKED OUT'}
                </Badge>
                <Button onClick={handleClockToggle} className="w-40" variant={clockedIn ? 'destructive' : 'default'}>
                  {clockedIn ? 'Clock Out' : 'Clock In'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card md:col-span-2">
            <CardHeader>
              <CardTitle>Shift & Attendance History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceLogs.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={log.action === 'CLOCK_IN' ? 'border-green-500/20 bg-green-500/10 text-green-500' : 'border-red-500/20 bg-red-500/10 text-red-500'}>
                          {log.action.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leave Requests Tab */}
      {activeTab === 'leave' && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card md:col-span-1">
            <CardHeader>
              <CardTitle>Request Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRequestLeave} className="space-y-4">
                <div className="space-y-1">
                  <Label>Leave Type</Label>
                  <select 
                    value={newLeaveType}
                    onChange={e => setNewLeaveType(e.target.value)}
                    className="w-full bg-background border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Maternity/Paternity Leave">Maternity/Paternity Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <Label>Dates / Duration</Label>
                  <Input 
                    placeholder="E.g., Aug 10 - Aug 15"
                    value={newLeaveDates}
                    onChange={e => setNewLeaveDates(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="glass-card md:col-span-2">
            <CardHeader>
              <CardTitle>Active Leave Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map(req => (
                    <TableRow key={req.id}>
                      <TableCell className="font-semibold">{req.name}</TableCell>
                      <TableCell>{req.type}</TableCell>
                      <TableCell>{req.dates}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          req.status === 'APPROVED' ? 'bg-green-500/15 border-green-500/20 text-green-500' :
                          req.status === 'REJECTED' ? 'bg-red-500/15 border-red-500/20 text-red-500' :
                          'bg-orange-500/15 border-orange-500/20 text-orange-500'
                        }>
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {req.status === 'PENDING' ? (
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleResolveLeave(req.id, 'APPROVED')} title="Approve">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleResolveLeave(req.id, 'REJECTED')} title="Reject">
                              <XCircle className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Resolved</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payroll Tab */}
      {activeTab === 'payroll' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Payroll History</CardTitle>
            <CardDescription>View monthly pay details and download generated payslips.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pay Period</TableHead>
                  <TableHead>Gross Pay</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { period: 'June 2026', gross: '$8,500.00', ded: '$1,200.00', net: '$7,300.00', method: 'Direct Deposit' },
                  { period: 'May 2026', gross: '$8,500.00', ded: '$1,200.00', net: '$7,300.00', method: 'Direct Deposit' },
                  { period: 'April 2026', gross: '$8,500.00', ded: '$1,200.00', net: '$7,300.00', method: 'Direct Deposit' }
                ].map((pay, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-semibold">{pay.period}</TableCell>
                    <TableCell>{pay.gross}</TableCell>
                    <TableCell>{pay.ded}</TableCell>
                    <TableCell className="text-green-500 font-bold">{pay.net}</TableCell>
                    <TableCell>{pay.method}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => toast.success(`Downloading payslip for ${pay.period}`)}>
                        <FileDown className="w-4 h-4 mr-2" />
                        Payslip
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
