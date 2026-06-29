import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '@/store/slices/authSlice';
import { 
  User, 
  Lock, 
  Settings, 
  Upload, 
  Check, 
  Languages, 
  SunMoon,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export const ProfileSettings: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'preferences'>('profile');

  // Profile Form State
  const [firstName, setFirstName] = useState(user?.firstName || 'John');
  const [lastName, setLastName] = useState(user?.lastName || 'Doe');
  const [email, setEmail] = useState(user?.email || 'employee@kavan.com');

  // Password Form State
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Preference states
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('English');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile details updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currPass || !newPass || !confirmPass) {
      toast.error('All password fields are required.');
      return;
    }
    if (newPass !== confirmPass) {
      toast.error('Passwords do not match.');
      return;
    }
    toast.success('Your security password has been changed.');
    setCurrPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleAvatarUpload = () => {
    toast.success('Avatar image uploaded successfully.');
  };

  const handleSavePreferences = () => {
    // Theme switching hook logic
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    toast.success(`Preferences updated. Theme: ${theme}, Language: ${lang}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile & Preferences</h1>
        <p className="text-muted-foreground mt-1">Configure your personal credentials, password rules, and client display preferences.</p>
      </div>

      <div className="flex border-b">
        {[
          { id: 'profile', label: 'My Profile', icon: User },
          { id: 'password', label: 'Security Password', icon: Lock },
          { id: 'preferences', label: 'Display Preferences', icon: SunMoon },
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

      {activeTab === 'profile' && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
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
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile Details
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="glass-card md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Avatar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl mb-4 border shadow-sm">
                {firstName?.[0]}{lastName?.[0]}
              </div>
              <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'password' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Keep your account secure by cycling passwords regularly.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div className="space-y-1">
                <Label htmlFor="curr-pass">Current Password</Label>
                <Input 
                  id="curr-pass"
                  type="password"
                  value={currPass} 
                  onChange={e => setCurrPass(e.target.value)} 
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="new-pass">New Password</Label>
                <Input 
                  id="new-pass"
                  type="password"
                  value={newPass} 
                  onChange={e => setNewPass(e.target.value)} 
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="confirm-pass">Confirm New Password</Label>
                <Input 
                  id="confirm-pass"
                  type="password"
                  value={confirmPass} 
                  onChange={e => setConfirmPass(e.target.value)} 
                />
              </div>

              <Button type="submit">
                <Check className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'preferences' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Workspace Themes & Languages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <div className="space-y-1">
              <Label>Theme Setting</Label>
              <select 
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm outline-none"
              >
                <option value="light">Light Theme Mode</option>
                <option value="dark">Dark Theme Mode</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label>Language Selection</Label>
              <select 
                value={lang}
                onChange={e => setLang(e.target.value)}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm outline-none"
              >
                <option value="English">English (US)</option>
                <option value="Spanish">Spanish (ES)</option>
                <option value="French">French (FR)</option>
              </select>
            </div>

            <Button onClick={handleSavePreferences}>
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
