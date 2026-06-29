export type Role = 'SUPER_ADMIN' | 'TENANT_ADMIN' | 'SECURITY_ANALYST' | 'DEVELOPER' | 'EMPLOYEE';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatarUrl?: string;
}

export interface Tenant {
  id: string;
  name: string;
  subscriptionPlan: 'FREE' | 'PRO' | 'ENTERPRISE';
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  permissions: string[];
  role: Role | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
