import { Home, Users, Settings, Shield, Activity, CreditCard, Box, Terminal, FileText, Bell, Map, LayoutDashboard } from 'lucide-react';
import type { Role } from '@/types/auth';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  permissions?: string[];
  roles?: Role[];
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const navigationConfig: NavGroup[] = [
  {
    group: 'Dashboards',
    items: [
      { title: 'Super Admin', href: '/dashboard/super-admin', icon: LayoutDashboard, roles: ['SUPER_ADMIN'] },
      { title: 'Tenant Admin', href: '/dashboard/tenant-admin', icon: LayoutDashboard, roles: ['TENANT_ADMIN'] },
      { title: 'Security', href: '/dashboard/security', icon: Shield, roles: ['SECURITY_ANALYST'] },
      { title: 'Developer', href: '/dashboard/developer', icon: Terminal, roles: ['DEVELOPER'] },
      { title: 'Employee', href: '/dashboard/employee', icon: Home, roles: ['EMPLOYEE'] },
    ]
  },
  {
    group: 'Platform',
    items: [
      { title: 'Tenants', href: '/tenants', icon: Box, roles: ['SUPER_ADMIN'] },
      { title: 'Users', href: '/users', icon: Users, permissions: ['users.read'] },
      { title: 'Products', href: '/products', icon: Box, roles: ['SUPER_ADMIN', 'TENANT_ADMIN'] },
      { title: 'Billing', href: '/billing', icon: CreditCard, permissions: ['billing.manage'] },
      { title: 'Permissions', href: '/permissions', icon: Shield, roles: ['SUPER_ADMIN'] },
    ]
  },
  {
    group: 'Monitoring & Security',
    items: [
      { title: 'Security Center', href: '/security-center', icon: Shield, roles: ['SUPER_ADMIN', 'SECURITY_ANALYST'] },
      { title: 'Audit Logs', href: '/audit-logs', icon: FileText, roles: ['SUPER_ADMIN', 'SECURITY_ANALYST', 'TENANT_ADMIN'] },
      { title: 'Infrastructure', href: '/infrastructure', icon: Activity, roles: ['SUPER_ADMIN', 'DEVELOPER'] },
      { title: 'Threat Map', href: '/threat-map', icon: Map, roles: ['SECURITY_ANALYST'] },
    ]
  },
  {
    group: 'Settings',
    items: [
      { title: 'Global Settings', href: '/settings/global', icon: Settings, roles: ['SUPER_ADMIN'] },
      { title: 'Tenant Settings', href: '/settings/tenant', icon: Settings, roles: ['TENANT_ADMIN'] },
      { title: 'Notifications', href: '/notifications', icon: Bell },
    ]
  }
];
