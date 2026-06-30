import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Clock, 
  CheckSquare, 
  Calendar, 
  ListTodo, 
  FileText, 
  Bell, 
  User, 
  Settings,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { toast } from 'sonner';
import { KavanLogo } from '@/components/ui/KavanLogo';

// 1. Team Page
export const ManagerTeamPage: React.FC = () => {
  const [team, setTeam] = useState([
    { id: '1', name: 'John Doe', email: 'john@kavan.com', role: 'Developer', department: 'Engineering' },
    { id: '2', name: 'Alice Smith', email: 'alice@kavan.com', role: 'QA Tester', department: 'Engineering' },
  ]);
  const [search, setSearch] = useState('');

  const filtered = team.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Team</h1>
        <p className="text-muted-foreground mt-1">Manage tasks and schedules for your assigned group.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-4 flex gap-4">
          <Input 
            placeholder="Search team members..." 
            value={search}
            onChange={e => setSearch(e.target.value)} 
          />
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-semibold">{t.name}</TableCell>
                  <TableCell>{t.email}</TableCell>
                  <TableCell><Badge variant="outline">{t.role}</Badge></TableCell>
                  <TableCell>{t.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// 2. Attendance Page
export const ManagerAttendancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Attendance</h1>
        <p className="text-muted-foreground">Clock logs and corrections for your team members.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time In</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">John Doe</TableCell>
                <TableCell>2026-06-29</TableCell>
                <TableCell>09:02 AM</TableCell>
                <TableCell><Badge className="bg-green-500 text-white">ON TIME</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Alice Smith</TableCell>
                <TableCell>2026-06-29</TableCell>
                <TableCell>09:45 AM</TableCell>
                <TableCell><Badge className="bg-orange-500 text-white">LATE</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// 3. Approvals Page
export const ManagerApprovalsPage: React.FC = () => {
  const [requests, setRequests] = useState([
    { id: '1', requester: 'John Doe', type: 'Annual Leave Request', details: 'July 10 - July 15', status: 'PENDING' },
    { id: '2', requester: 'Alice Smith', type: 'Expense Report Reimbursement', details: '$120 - Client Dinner', status: 'PENDING' },
  ]);

  const handleAction = (id: string, action: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: action } : r));
    toast.success(`Request ${action.toLowerCase()} successfully.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pending Team Approvals</h1>
        <p className="text-muted-foreground">Approve leave, expense reimbursements, and document declarations.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requester</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-semibold">{r.requester}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell>{r.details}</TableCell>
                  <TableCell>
                    <Badge className={
                      r.status === 'APPROVED' ? 'bg-green-500 text-white' :
                      r.status === 'REJECTED' ? 'bg-red-500 text-white' :
                      'bg-orange-500 text-white'
                    }>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {r.status === 'PENDING' ? (
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleAction(r.id, 'APPROVED')} title="Approve">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleAction(r.id, 'REJECTED')} title="Reject">
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

// 4. Tasks Page
export const ManagerTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete Frontend QA reviews', assignee: 'Alice Smith', priority: 'HIGH', deadline: '2026-07-02' },
  ]);
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('John Doe');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      assignee,
      priority: 'MEDIUM',
      deadline: '2026-07-10'
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    toast.success('Task successfully allocated.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Tasks</h1>
        <p className="text-muted-foreground">Create and delegate project milestones to employees.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-1">
          <CardHeader><CardTitle>Delegate Task</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <Label>Task Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="E.g., Review API metrics" />
              </div>
              <div className="space-y-1">
                <Label>Assignee</Label>
                <select value={assignee} onChange={e => setAssignee(e.target.value)} className="w-full bg-background border rounded-md px-3 py-2 text-sm">
                  <option value="John Doe">John Doe</option>
                  <option value="Alice Smith">Alice Smith</option>
                </select>
              </div>
              <Button type="submit" className="w-full">Create Task</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-2">
          <CardHeader><CardTitle>Sprint Task List</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Milestone</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="font-semibold">{t.title}</TableCell>
                    <TableCell>{t.assignee}</TableCell>
                    <TableCell><Badge variant="outline">{t.priority}</Badge></TableCell>
                    <TableCell>{t.deadline}</TableCell>
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

// 5. Meetings Page
export const ManagerMeetingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Meetings</h1>
        <p className="text-muted-foreground">Schedule scrum events and client demo standups.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-6 text-center text-muted-foreground">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="font-medium text-foreground">Scrum Meetings Calendar is running.</p>
          <Button className="mt-4" onClick={() => toast.success('Calendar meeting scheduled')}>Schedule Team Sync</Button>
        </CardContent>
      </Card>
    </div>
  );
};

// 6. Reports Page
export const ManagerReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Reports</h1>
        <p className="text-muted-foreground">Review performance statistics, leave summaries, and attendance trends.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader><CardTitle>Task Completion Index</CardTitle></CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => toast.success('Exporting Task Completion reports...')}><FileText className="w-4 h-4 mr-2" /> Download PDF</Button>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle>Team Attendance Summary</CardTitle></CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => toast.success('Exporting Attendance Logs...')}><FileText className="w-4 h-4 mr-2" /> Download CSV</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 7. Notifications Page
export const ManagerNotificationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Recent alerts and approvals notifications.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <p className="font-semibold">Alice Smith submitted a leave request</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 8. Profile Page
export const ManagerProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Connor');
  const [email, setEmail] = useState('manager@kavan.com');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-1">Configure your personal credentials and display preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Profile details saved.'); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="prof-first">First Name</Label>
                  <Input 
                    id="prof-first"
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)} 
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="prof-last">Last Name</Label>
                  <Input 
                    id="prof-last"
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="prof-email">Email Address</Label>
                <Input 
                  id="prof-email"
                  type="email"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>

              <Button type="submit">
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-1 overflow-hidden relative border-primary/20">
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-[#ef4444]/10 rounded-full blur-2xl" />
          
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">KAVAN Enterprise Profile Card</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center relative z-10 pt-4">
            <div className="relative mb-4 group cursor-pointer" onClick={() => toast.success('Avatar image uploaded.')}>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ef4444] to-[#b91c1c] rounded-full animate-pulse opacity-50 blur-sm group-hover:opacity-75 transition-opacity" />
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#ef4444] to-[#b91c1c] relative z-10">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-foreground font-bold text-3xl border border-background shadow-inner">
                  {firstName?.[0]}{lastName?.[0]}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 mb-1 mt-2">
              <KavanLogo size={16} />
              <span className="font-extrabold text-lg tracking-tight">{firstName} {lastName}</span>
            </div>
            
            <p className="text-xs font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wider mb-4">
              MANAGER
            </p>
            
            <p className="text-[10px] text-muted-foreground text-center mb-6 max-w-[180px]">
              Authorized Manager on the KAVAN Enterprise Ecosystem.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 9. Settings Page
export const ManagerSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure client workspace preferences.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="space-y-4 pt-6 max-w-lg">
          <div className="space-y-1">
            <Label>Language Mode</Label>
            <Input defaultValue="English" />
          </div>
          <Button onClick={() => toast.success('Workspace preferences updated.')}>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
};
