import type { Role, User, Tenant } from '@/types/auth';

interface MockUserEntry {
  user: User;
  tenant: Tenant | null;
  permissions: string[];
  token: string;
  passwordHash: string; // Plain password for simple mock check
}

const mockUsers: Record<string, MockUserEntry> = {
  'superadmin@kavan.com': {
    user: { id: 'u1', email: 'superadmin@kavan.com', firstName: 'Super', lastName: 'Admin', role: 'SUPER_ADMIN' },
    tenant: null,
    permissions: ['*'],
    token: 'mock-jwt-super-admin',
    passwordHash: 'Admin@123',
  },
  'admin@kavan.com': {
    user: { id: 'u2', email: 'admin@kavan.com', firstName: 'Tenant', lastName: 'Admin', role: 'TENANT_ADMIN' },
    tenant: { id: 't1', name: 'Acme Corp', subscriptionPlan: 'ENTERPRISE', isActive: true },
    permissions: ['users.read', 'users.write', 'billing.manage', 'tenant.settings'],
    token: 'mock-jwt-tenant-admin',
    passwordHash: 'Admin@123',
  },
  'employee@kavan.com': {
    user: { id: 'u5', email: 'employee@kavan.com', firstName: 'John', lastName: 'Doe', role: 'EMPLOYEE' },
    tenant: { id: 't1', name: 'Acme Corp', subscriptionPlan: 'ENTERPRISE', isActive: true },
    permissions: ['dashboard.view', 'profile.edit'],
    token: 'mock-jwt-employee',
    passwordHash: 'Employee@123',
  },
  'manager@kavan.com': {
    user: { id: 'u6', email: 'manager@kavan.com', firstName: 'Sarah', lastName: 'Connor', role: 'MANAGER' },
    tenant: { id: 't1', name: 'Acme Corp', subscriptionPlan: 'ENTERPRISE', isActive: true },
    permissions: ['dashboard.view', 'profile.edit', 'team.manage', 'approvals.write'],
    token: 'mock-jwt-manager',
    passwordHash: 'Manager@123',
  },
  'dev@kavan.com': {
    user: { id: 'u4', email: 'dev@kavan.com', firstName: 'Dev', lastName: 'Engineer', role: 'DEVELOPER' },
    tenant: null,
    permissions: ['api.read', 'deployments.manage', 'logs.read'],
    token: 'mock-jwt-dev',
    passwordHash: 'Dev@123',
  },
  'security@kavan.com': {
    user: { id: 'u3', email: 'security@kavan.com', firstName: 'Sec', lastName: 'Analyst', role: 'SECURITY_ANALYST' },
    tenant: null,
    permissions: ['security.read', 'security.write', 'audit.logs'],
    token: 'mock-jwt-security',
    passwordHash: 'Sec@123',
  },
};

export const authService = {
  login: async (email: string, password?: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const matched = mockUsers[email];
    if (matched && (!password || matched.passwordHash === password)) {
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
