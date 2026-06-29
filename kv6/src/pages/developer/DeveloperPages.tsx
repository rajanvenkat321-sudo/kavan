import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Key, 
  Link, 
  Server, 
  BarChart3, 
  Plus, 
  Trash2, 
  Copy,
  Code
} from 'lucide-react';
import { toast } from 'sonner';

// 1. API Keys Page
export const ApiKeysPage: React.FC = () => {
  const [apiKeys, setApiKeys] = useState([
    { id: 'k1', name: 'Production Sync Token', token: 'kv_live_a928db103f908e', created: '2026-05-12' },
  ]);
  const [name, setName] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newKey = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      token: `kv_live_${Math.random().toString(36).substr(2, 16)}`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
    setName('');
    toast.success('Developer API Key generated.');
  };

  const handleCopy = (token: string) => {
    navigator.clipboard.writeText(token);
    toast.success('Copied API Key to clipboard.');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
        <p className="text-muted-foreground mt-1">Manage private API credentials for REST integrations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-1">
          <CardHeader><CardTitle>Generate Key</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="key-name">API Key Description</Label>
                <Input id="key-name" value={name} onChange={e => setName(e.target.value)} placeholder="Staging Hook Sync" />
              </div>
              <Button type="submit" className="w-full"><Key className="w-4 h-4 mr-2" /> Generate key</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-2">
          <CardHeader><CardTitle>Active Credentials</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key Identifier</TableHead>
                  <TableHead>Token Hash</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map(k => (
                  <TableRow key={k.id}>
                    <TableCell className="font-semibold">{k.name}</TableCell>
                    <TableCell><code className="bg-muted px-2 py-1 rounded font-mono text-xs">{k.token}</code></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(k.token)}><Copy className="w-4 h-4 text-blue-500" /></Button>
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

// 2. Webhooks Page
export const WebhooksPage: React.FC = () => {
  const [webhooks, setWebhooks] = useState([
    { id: '1', url: 'https://api.acme.com/v1/webhook', events: 'user.create, user.delete', status: 'ACTIVE' }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
        <p className="text-muted-foreground">Manage active workspace event webhook subscriptions.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Target URL</TableHead>
                <TableHead>Subscribed Events</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map(w => (
                <TableRow key={w.id}>
                  <TableCell className="font-semibold">{w.url}</TableCell>
                  <TableCell>{w.events}</TableCell>
                  <TableCell><Badge className="bg-green-500 text-white">{w.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// 3. Deployments Page
export const DeploymentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
        <p className="text-muted-foreground">Monitor platform code deployments and stack revision histories.</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Version ID</TableHead>
                <TableHead>Commit Hash</TableHead>
                <TableHead>Deployment Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">v6.0.4-live</TableCell>
                <TableCell><code>e9f266a</code></TableCell>
                <TableCell>2026-06-29 11:32 PM</TableCell>
                <TableCell><Badge className="bg-green-500 text-white">ACTIVE</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// 4. Monitoring Page
export const MonitoringPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Monitoring</h1>
        <p className="text-muted-foreground">Developer dashboard system performance graphs and API latency logs.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader><CardTitle>API Requests Latency</CardTitle></CardHeader>
          <CardContent><span className="text-3xl font-bold">14 ms avg</span></CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle>Database Pool Connections</CardTitle></CardHeader>
          <CardContent><span className="text-2xl font-bold">12 / 100 active</span></CardContent>
        </Card>
      </div>
    </div>
  );
};
