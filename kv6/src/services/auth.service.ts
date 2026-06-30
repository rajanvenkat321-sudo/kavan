import { api } from './api';
import type { Role, User, Tenant } from '@/types/auth';

export interface VerifyMfaResponse {
  user: User;
  tenant: Tenant | null;
  permissions: string[];
  token: string;
  refreshToken: string;
}

export const authService = {
  login: async (email: string, password?: string) => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      const payload = response.data.data;
      return {
        requiresMfa: payload.requires_mfa,
        tempToken: payload.temp_token,
        email: payload.email,
      };
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Invalid credentials';
      throw new Error(errMsg);
    }
  },

  verifyMfa: async (code: string, email: string): Promise<VerifyMfaResponse> => {
    try {
      const response = await api.post('/auth/mfa/', { code, email });
      const payload = response.data.data;
      return {
        user: payload.user,
        tenant: payload.tenant,
        permissions: payload.permissions,
        token: payload.token || payload.accessToken || payload.access,
        refreshToken: payload.refresh_token || payload.refresh,
      };
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Invalid MFA code';
      throw new Error(errMsg);
    }
  },

  loginWithGoogle: async (token: string): Promise<VerifyMfaResponse> => {
    try {
      const response = await api.post('/auth/google/', { token });
      const payload = response.data.data;
      return {
        user: payload.user,
        tenant: payload.tenant,
        permissions: payload.permissions,
        token: payload.token || payload.accessToken || payload.access,
        refreshToken: payload.refresh_token || payload.refresh,
      };
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Google authentication failed';
      throw new Error(errMsg);
    }
  },

  loginWithMicrosoft: async (token: string): Promise<VerifyMfaResponse> => {
    try {
      const response = await api.post('/auth/microsoft/', { token });
      const payload = response.data.data;
      return {
        user: payload.user,
        tenant: payload.tenant,
        permissions: payload.permissions,
        token: payload.token || payload.accessToken || payload.access,
        refreshToken: payload.refresh_token || payload.refresh,
      };
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Microsoft authentication failed';
      throw new Error(errMsg);
    }
  }
};
