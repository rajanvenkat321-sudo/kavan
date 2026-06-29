import type { Role, User, Tenant } from '@/types/auth';

const mockUsers: Record<string, { user: User, tenant: Tenant | null, permissions: string[], token: string }> = {
  'super@kavan.com': {
    user: { id: 'u1', email: 'super@kavan.com', firstName: 'Super', lastName: 'Admin', role: 'SUPER_ADMIN' },
    tenant: null,
    permissions: ['*'],
    token: 'mock-jwt-super-admin',
  },
  'admin@tenant.com': {
    user: { id: 'u2', email: 'admin@tenant.com', firstName: 'Tenant', lastName: 'Admin', role: 'TENANT_ADMIN' },
    tenant: { id: 't1', name: 'Acme Corp', subscriptionPlan: 'ENTERPRISE', isActive: true },
    permissions: ['users.read', 'users.write', 'billing.manage', 'tenant.settings'],
    token: 'mock-jwt-tenant-admin',
  },
  'security@kavan.com': {
    user: { id: 'u3', email: 'security@kavan.com', firstName: 'Sec', lastName: 'Analyst', role: 'SECURITY_ANALYST' },
    tenant: null,
    permissions: ['security.read', 'security.write', 'audit.logs'],
    token: 'mock-jwt-security',
  },
  'dev@kavan.com': {
    user: { id: 'u4', email: 'dev@kavan.com', firstName: 'Dev', lastName: 'Engineer', role: 'DEVELOPER' },
    tenant: null,
    permissions: ['api.read', 'deployments.manage', 'logs.read'],
    token: 'mock-jwt-dev',
  },
  'user@tenant.com': {
    user: { id: 'u5', email: 'user@tenant.com', firstName: 'John', lastName: 'Doe', role: 'EMPLOYEE' },
    tenant: { id: 't1', name: 'Acme Corp', subscriptionPlan: 'ENTERPRISE', isActive: true },
    permissions: ['dashboard.view', 'profile.edit'],
    token: 'mock-jwt-employee',
  },
};

export const authService = {
  login: async (email: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (mockUsers[email]) {
      return { requiresMfa: true, tempToken: 'temp-123', email };
    }
    throw new Error('Invalid credentials');
  },

  verifyMfa: async (code: string, email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (code === '123456' && mockUsers[email]) {
      return mockUsers[email];
    }
    throw new Error('Invalid MFA code');
  }
};
