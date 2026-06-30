export const mockUsers = [
  { id: '1', firstName: 'Admin', lastName: 'User', email: 'admin@kavan.com', role: 'SUPER_ADMIN', status: 'ACTIVE', department: 'IT' },
  { id: '2', firstName: 'Tenant', lastName: 'Admin', email: 'tenant@kavan.com', role: 'TENANT_ADMIN', status: 'ACTIVE', department: 'Management' },
  { id: '3', firstName: 'Dev', lastName: 'Eloper', email: 'dev@kavan.com', role: 'DEVELOPER', status: 'ACTIVE', department: 'Engineering' },
  { id: '4', firstName: 'John', lastName: 'Doe', email: 'john@kavan.com', role: 'EMPLOYEE', status: 'INACTIVE', department: 'Sales' },
];

export const mockOrganizations = [
  { id: '1', name: 'Acme Corp', tenantId: 'tenant-1', plan: 'Enterprise', users: 150, status: 'ACTIVE' },
  { id: '2', name: 'Globex', tenantId: 'tenant-2', plan: 'Pro', users: 45, status: 'ACTIVE' },
];

export const mockAuditLogs = [
  { id: '1', action: 'USER_LOGIN', user: 'admin@kavan.com', ip: '192.168.1.1', timestamp: new Date().toISOString(), status: 'SUCCESS' },
  { id: '2', action: 'DATA_EXPORT', user: 'tenant@kavan.com', ip: '192.168.1.5', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'SUCCESS' },
];

export const mockService = {
  getUsers: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockUsers), 500));
  },
  getOrganizations: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockOrganizations), 500));
  },
  getAuditLogs: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockAuditLogs), 500));
  }
};
