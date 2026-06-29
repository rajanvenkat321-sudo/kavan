import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  GitBranch, 
  FolderKanban, 
  Calendar, 
  DollarSign,
  CheckCircle,
  XCircle,
  FileDown
} from 'lucide-react';
import { toast } from 'sonner';

// 1. Departments Page
export const DepartmentsPage: React.FC = () => {
  const [depts, setDepts] = useState([
    { id: '1', name: 'Engineering', head: 'John Doe', budget: '$45,000', users: 15 },
    { id: '2', name: 'Sales & Marketing', head: 'Jane Smith', budget: '$32,000', users: 8 },
  ]);
  const [formName, setFormName] = useState('');
  const [formHead, setFormHead] = useState('');
  const [formBudget, setFormBudget] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formHead) {
      toast.error('Fill in required fields.');
      return;
    }
    const newDept = {
      id: Math.random().toString(36).substr(2, 9),
      name: formName,
      head: formHead,
      budget: formBudget || '$0',
      users: 1
    };
    setDepts([...depts, newDept]);
    setFormName('');
    setFormHead('');
    setFormBudget('');
    toast.success('Department created successfully.');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
        <p className="text-muted-foreground mt-1">Manage corporate departments, assigned budget, and department heads.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-1">
          <CardHeader><CardTitle>Create Department</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="dept-name">Department Name</Label>
                <Input id="dept-name" value={formName} onChange={e => setFormName(e.target.value)} placeholder="Engineering" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="dept-head">Department Head</Label>
                <Input id="dept-head" value={formHead} onChange={e => setFormHead(e.target.value)} placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="dept-budget">Monthly Budget</Label>
                <Input id="dept-budget" value={formBudget} onChange={e => setFormBudget(e.target.value)} placeholder="$50,000" />
              </div>
              <Button type="submit" className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Department</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-2">
          <CardHeader><CardTitle>Department Directory</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department Name</TableHead>
                  <TableHead>Manager Head</TableHead>
                  <TableHead>Allocated Budget</TableHead>
                  <TableHead>Employees Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {depts.map(d => (
                  <TableRow key={d.id}>
                    <TableCell className="font-semibold">{d.name}</TableCell>
                    <TableCell>{d.head}</TableCell>
                    <TableCell>{d.budget}</TableCell>
                    <TableCell>{d.users}</TableCell>
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

// 2. Teams Page
export const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState([
    { id: '1', name: 'Frontend Platform Team', lead: 'John Doe', members: 4 },
    { id: '2', name: 'Security Operations Group', lead: 'Sarah Connor', members: 3 },
  ]);

  const handleCreate = () => {
    const newTeam = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Custom Team',
      lead: 'Unassigned',
      members: 1
    };
    setTeams([...teams, newTeam]);
    toast.success('Team initialized successfully.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams Management</h1>
          <p className="text-muted-foreground mt-1">Configure project teams, team leads, and view performance indexes.</p>
        </div>
        <Button onClick={handleCreate} size="sm"><Plus className="w-4 h-4 mr-2" /> Create Team</Button>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Team Lead</TableHead>
                <TableHead>Members Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-semibold">{t.name}</TableCell>
                  <TableCell>{t.lead}</TableCell>
                  <TableCell>{t.members}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// 3. Leaves Page (Tenant Admin / Manager approval view)
export const LeavesPage: React.FC = () => {
  const [leaves, setLeaves] = useState([
    { id: '1', name: 'John Doe', type: 'Annual Leave', dates: 'July 5 - July 10', status: 'PENDING' },
    { id: '2', name: 'Jane Smith', type: 'Sick Leave', dates: 'June 12 - June 13', status: 'APPROVED' },
  ]);

  const handleResolve = (id: string, decision: string) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: decision } : l));
    toast.success(`Leave request ${decision.toLowerCase()} successfully.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaves Workflow</h1>
        <p className="text-muted-foreground">Approve leave allocations and review pending employee schedules.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map(l => (
                <TableRow key={l.id}>
                  <TableCell className="font-semibold">{l.name}</TableCell>
                  <TableCell>{l.type}</TableCell>
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
                  <TableCell className="text-right">
                    {l.status === 'PENDING' ? (
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleResolve(l.id, 'APPROVED')} title="Approve">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleResolve(l.id, 'REJECTED')} title="Reject">
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
  );
};

// 4. Payroll Page
export const PayrollPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
        <p className="text-muted-foreground">Generate salaries, audit tax files, and issue payslips.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pay Period</TableHead>
                <TableHead>Gross Amount</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Disbursement</TableHead>
                <TableHead className="text-right">Payslip Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">June 2026</TableCell>
                <TableCell>$8,500.00</TableCell>
                <TableCell>$1,200.00</TableCell>
                <TableCell className="text-green-500 font-bold">$7,300.00</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => toast.success('Downloading payslip PDF')}>
                    <FileDown className="w-4 h-4 mr-2" /> Payslip
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
