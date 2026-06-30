import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  Clock, 
  Terminal, 
  Unlock, 
  Trash2, 
  Globe, 
  Save, 
  ShieldAlert, 
  Download,
  KeyRound,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

interface AuditLog {
  id: string;
  user: string;
  action: string;
  ip: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED' | 'WARNING';
}

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  current: boolean;
}

export const SecurityCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'sessions' | 'policies'>('audit');
  
  // IP Whitelisting state
  const [whitelistIP, setWhitelistIP] = useState('192.168.1.1, 10.0.0.12');

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: '1', user: 'superadmin@kavan.com', action: 'ROLE_SWITCH', ip: '192.168.1.1', timestamp: '2026-06-29 10:22 PM', status: 'SUCCESS' },
    { id: '2', user: 'admin@kavan.com', action: 'USER_CREATE', ip: '192.168.1.23', timestamp: '2026-06-29 09:14 PM', status: 'SUCCESS' },
    { id: '3', user: 'unknown@hacker.com', action: 'FAILED_LOGIN', ip: '198.51.100.4', timestamp: '2026-06-29 06:40 PM', status: 'FAILED' }
  ]);

  const [sessions, setSessions] = useState<ActiveSession[]>([
    { id: 's1', device: 'Chrome on Windows', location: 'New York, US', ip: '192.168.1.1', current: true },
    { id: 's2', device: 'Safari on iPhone', location: 'California, US', ip: '172.56.21.99', current: false },
  ]);

  const handleSaveWhitelist = () => {
    toast.success('IP Whitelist configurations saved successfully.');
  };

  const handleRevokeSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
    toast.success('Session revoked successfully.');
  };

  const handleBackup = () => {
    toast.success('Initiating global database snapshot backup...');
    setTimeout(() => {
      toast.success('Backup completed successfully. Download links available in settings.');
    }, 1500);
  };

  const handleMfaToggle = (policyName: string) => {
    toast.success(`MFA security policy "${policyName}" toggled successfully.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
          <p className="text-muted-foreground mt-1">Audit active logins, configure authentication criteria, and whitelist networks.</p>
        </div>
        <Button onClick={handleBackup} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Backup Database
        </Button>
      </div>

      <div className="flex border-b">
        {[
          { id: 'audit', label: 'Audit Trail', icon: Terminal },
          { id: 'sessions', label: 'Active Sessions', icon: Clock },
          { id: 'policies', label: 'Security Policies', icon: Shield },
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

      {activeTab === 'audit' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Audit Logs</CardTitle>
            <CardDescription>Platform activity log for identity compliance verification.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Event Action</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="font-semibold">{log.user}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{log.action}</code>
                    </TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className={
                        log.status === 'SUCCESS' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                        log.status === 'FAILED' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                        'bg-orange-500/10 border-orange-500/20 text-orange-500'
                      }>
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'sessions' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Active User Sessions</CardTitle>
            <CardDescription>Monitor and terminate current platform login states.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device / Browser</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-semibold">{s.device}</TableCell>
                    <TableCell>{s.location}</TableCell>
                    <TableCell>{s.ip}</TableCell>
                    <TableCell>
                      {s.current ? (
                        <Badge className="bg-primary">This Device</Badge>
                      ) : (
                        <Badge variant="secondary">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!s.current && (
                        <Button variant="ghost" size="icon" onClick={() => handleRevokeSession(s.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'policies' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>MFA & Security Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-semibold text-sm">Force MFA for Administrators</p>
                  <p className="text-xs text-muted-foreground">Tenant Admins must register MFA devices.</p>
                </div>
                <input type="checkbox" defaultChecked onChange={() => handleMfaToggle('Force MFA Admin')} className="rounded" />
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-semibold text-sm">Strict Session Timeout</p>
                  <p className="text-xs text-muted-foreground">Terminate session after 15 minutes of inactivity.</p>
                </div>
                <input type="checkbox" onChange={() => handleMfaToggle('Session Timeout')} className="rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Restrict Concurrent Logins</p>
                  <p className="text-xs text-muted-foreground">Prevent multiple concurrent logins with same user.</p>
                </div>
                <input type="checkbox" onChange={() => handleMfaToggle('Restrict Logins')} className="rounded" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>IP Whitelisting & Threat Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="whitelist-ips">Allowed IP Ranges (Comma separated)</Label>
                <div className="flex gap-2">
                  <Input 
                    id="whitelist-ips"
                    value={whitelistIP} 
                    onChange={e => setWhitelistIP(e.target.value)} 
                  />
                  <Button onClick={handleSaveWhitelist}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-orange-600 dark:text-orange-400">Threat Detection Activated</p>
                  <p className="text-xs text-muted-foreground">Brute force and anomaly behavior audits are operating globally.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
