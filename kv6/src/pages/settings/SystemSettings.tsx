import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Settings, 
  ShieldAlert, 
  Mail, 
  Sliders, 
  Save, 
  Upload,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

export const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'smtp' | 'flags'>('general');
  
  // General Info
  const [companyName, setCompanyName] = useState('Acme Corp');
  const [companyDomain, setCompanyDomain] = useState('acme.com');

  // SMTP Info
  const [smtpHost, setSmtpHost] = useState('smtp.mailtrap.io');
  const [smtpPort, setSmtpPort] = useState('2525');
  const [smtpUser, setSmtpUser] = useState('api-key-user');

  // Feature Flags
  const [flags, setFlags] = useState({
    enableAiAssistant: true,
    enableSelfSignup: false,
    enableBetaReports: true
  });

  const handleLogoUpload = () => {
    toast.success('Logo uploaded successfully. Refreshing site brand elements...');
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('General branding and company settings saved.');
  };

  const handleSaveSmtp = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('SMTP email configurations successfully authenticated.');
  };

  const handleToggleFlag = (key: keyof typeof flags) => {
    const updated = { ...flags, [key]: !flags[key] };
    setFlags(updated);
    toast.success(`Feature Flag "${key}" updated successfully.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1">Configure global application branding,SMTP mail nodes, and toggle feature flags.</p>
      </div>

      <div className="flex border-b">
        {[
          { id: 'general', label: 'Branding & Company', icon: Building2 },
          { id: 'smtp', label: 'SMTP Email Configuration', icon: Mail },
          { id: 'flags', label: 'Feature Flags', icon: Sliders },
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

      {activeTab === 'general' && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card md:col-span-2">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveGeneral} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="company-name">Company Legal Name</Label>
                  <Input 
                    id="company-name"
                    value={companyName} 
                    onChange={e => setCompanyName(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="company-domain">Primary Corporate Domain</Label>
                  <Input 
                    id="company-domain"
                    value={companyDomain} 
                    onChange={e => setCompanyDomain(e.target.value)} 
                  />
                </div>

                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Save Company Configs
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="glass-card md:col-span-1">
            <CardHeader>
              <CardTitle>Branding Assets</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-primary/10 border-2 border-dashed flex flex-col items-center justify-center text-primary mb-4">
                <Building2 className="w-8 h-8 mb-1" />
                <span className="text-[10px] font-bold uppercase">LOGO</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogoUpload}>
                <Upload className="w-4 h-4 mr-2" />
                Upload New Logo
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'smtp' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>SMTP Configurations</CardTitle>
            <CardDescription>Setup the email delivery network node for platform transactional triggers.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSmtp} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1 col-span-2">
                  <Label htmlFor="smtp-host">SMTP Server Host</Label>
                  <Input 
                    id="smtp-host"
                    value={smtpHost} 
                    onChange={e => setSmtpHost(e.target.value)} 
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="smtp-port">Port</Label>
                  <Input 
                    id="smtp-port"
                    value={smtpPort} 
                    onChange={e => setSmtpPort(e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="smtp-user">SMTP Username</Label>
                <Input 
                  id="smtp-user"
                  value={smtpUser} 
                  onChange={e => setSmtpUser(e.target.value)} 
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="smtp-pass">SMTP Password</Label>
                <Input 
                  id="smtp-pass"
                  type="password"
                  defaultValue="••••••••"
                />
              </div>

              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Test & Save SMTP Settings
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'flags' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
            <CardDescription>Enable or disable advanced modules dynamically across the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-semibold text-sm">AI Assistant Panel</p>
                <p className="text-xs text-muted-foreground">Expose AI chatbot sidebar widget to users.</p>
              </div>
              <input 
                type="checkbox" 
                checked={flags.enableAiAssistant} 
                onChange={() => handleToggleFlag('enableAiAssistant')} 
                className="rounded" 
              />
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-semibold text-sm">Self Sign-up Access</p>
                <p className="text-xs text-muted-foreground">Allow domain tenants to auto-register organizations.</p>
              </div>
              <input 
                type="checkbox" 
                checked={flags.enableSelfSignup} 
                onChange={() => handleToggleFlag('enableSelfSignup')} 
                className="rounded" 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Beta Analytics & Custom Chart Report Builder</p>
                <p className="text-xs text-muted-foreground">Include pie-charts and custom reports options.</p>
              </div>
              <input 
                type="checkbox" 
                checked={flags.enableBetaReports} 
                onChange={() => handleToggleFlag('enableBetaReports')} 
                className="rounded" 
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
