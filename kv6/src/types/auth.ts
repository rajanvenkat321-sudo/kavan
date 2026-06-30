export type Role = 'SUPER_ADMIN' | 'TENANT_ADMIN' | 'SECURITY_ANALYST' | 'DEVELOPER' | 'EMPLOYEE' | 'MANAGER';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  DEVELOPER = 'DEVELOPER',
  SECURITY_ADMIN = 'SECURITY_ANALYST'
}

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
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
