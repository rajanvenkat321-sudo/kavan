import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  FileText, 
  CheckSquare, 
  Video, 
  Plus, 
  Upload, 
  Clock, 
  ListTodo,
  CheckCircle,
  FileDown
} from 'lucide-react';
import { toast } from 'sonner';

// 1. Employee Leaves Page
export const EmployeeLeavesPage: React.FC = () => {
  const [leaves, setLeaves] = useState([
    { id: '1', type: 'Annual Leave', dates: 'August 10 - August 15', status: 'PENDING' },
    { id: '2', type: 'Sick Leave', dates: 'June 5 - June 6', status: 'APPROVED' }
  ]);
  const [dates, setDates] = useState('');
  const [type, setType] = useState('Annual Leave');

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dates) return;
    const newLeave = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      dates,
      status: 'PENDING'
    };
    setLeaves([newLeave, ...leaves]);
    setDates('');
    toast.success('Leave request submitted successfully.');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Request Leave</h1>
        <p className="text-muted-foreground mt-1">Submit annual, sick, or personal leave requests.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-1">
          <CardHeader><CardTitle>New Leave Request</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleRequest} className="space-y-4">
              <div className="space-y-1">
                <Label>Type</Label>
                <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-background border rounded-md px-3 py-2 text-sm outline-none">
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label>Dates</Label>
                <Input value={dates} onChange={e => setDates(e.target.value)} placeholder="Aug 12 - Aug 15" />
              </div>
              <Button type="submit" className="w-full"><Plus className="w-4 h-4 mr-2" /> Request Leave</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-2">
          <CardHeader><CardTitle>Leave History</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaves.map(l => (
                  <TableRow key={l.id}>
                    <TableCell className="font-semibold">{l.type}</TableCell>
                    <TableCell>{l.dates}</TableCell>
                    <TableCell>
                      <Badge className={
                        l.status === 'APPROVED' ? 'bg-green-500 hover:bg-green-600 text-white' :
                        l.status === 'REJECTED' ? 'bg-red-500 hover:bg-red-600 text-white' :
                        'bg-orange-500 hover:bg-orange-600 text-white'
                      }>
                        {l.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 2. Employee Documents Page
export const EmployeeDocumentsPage: React.FC = () => {
  const [docs, setDocs] = useState([
    { id: '1', name: 'Contract Agreement.pdf', date: '2026-01-05' },
    { id: '2', name: 'W4 Tax withholding.pdf', date: '2026-01-10' }
  ]);

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setDocs([...docs, { id: Math.random().toString(36).substr(2, 9), name: file.name, date: new Date().toISOString().split('T')[0] }]);
        toast.success(`Uploaded ${file.name} to documents.`);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">Upload and access payroll tax files and work contracts.</p>
        </div>
        <Button onClick={handleUpload} size="sm"><Upload className="w-4 h-4 mr-2" /> Upload Document</Button>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document File</TableHead>
                <TableHead>Uploaded Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map(d => (
                <TableRow key={d.id}>
                  <TableCell className="font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> {d.name}
                  </TableCell>
                  <TableCell>{d.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => toast.success(`Downloading ${d.name}`)}><FileDown className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// 3. Employee Tasks Page
export const EmployeeTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete quarter Q2 reports', status: 'PENDING' },
    { id: '2', title: 'Onboarding training tasks', status: 'COMPLETED' },
  ]);

  const handleResolve = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'COMPLETED' } : t));
    toast.success('Task marked completed.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assigned Tasks</h1>
        <p className="text-muted-foreground">Manage and mark completed workspace milestones.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Milestone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-semibold">{t.title}</TableCell>
                  <TableCell>
                    <Badge className={t.status === 'COMPLETED' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {t.status === 'PENDING' && (
                      <Button variant="ghost" size="icon" onClick={() => handleResolve(t.id)}><CheckCircle className="w-4 h-4 text-green-500" /></Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// 4. Employee Meetings Page
export const EmployeeMeetingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upcoming Meetings</h1>
        <p className="text-muted-foreground">Join scheduled project standups and department events.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meeting Agenda</TableHead>
                <TableHead>Schedule Time</TableHead>
                <TableHead className="text-right">Access Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Weekly Team Alignment</TableCell>
                <TableCell>Tomorrow at 10:00 AM</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => toast.success('Joining Video Standup...')}><Video className="w-4 h-4 mr-2" /> Join Video</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
