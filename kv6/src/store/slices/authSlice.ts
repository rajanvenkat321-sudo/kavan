import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, Tenant, Role } from '@/types/auth';

const persistedState = typeof window !== 'undefined' ? localStorage.getItem('kavan_auth') : null;

const initialState: AuthState = persistedState ? JSON.parse(persistedState) : {
  user: null,
  tenant: null,
  permissions: [],
  role: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; tenant: Tenant | null; permissions: string[]; role: Role; accessToken: string; refreshToken: string }>
    ) => {
      state.user = action.payload.user;
      state.tenant = action.payload.tenant;
      state.permissions = action.payload.permissions;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('kavan_auth', JSON.stringify({
        user: action.payload.user,
        tenant: action.payload.tenant,
        permissions: action.payload.permissions,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false
      }));
    },
    logout: (state) => {
      state.user = null;
      state.tenant = null;
      state.permissions = [];
      state.role = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('kavan_auth');
    },
    switchRole: (state, action: PayloadAction<{ role: Role; permissions: string[] }>) => {
      if (state.user) {
        state.role = action.payload.role;
        state.user.role = action.payload.role;
        state.permissions = action.payload.permissions;
        localStorage.setItem('kavan_auth', JSON.stringify({
          user: state.user,
          tenant: state.tenant,
          permissions: action.payload.permissions,
          role: action.payload.role,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isAuthenticated: true,
          isLoading: false
        }));
      }
    },
    updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      const stored = localStorage.getItem('kavan_auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.accessToken = action.payload.accessToken;
        parsed.refreshToken = action.payload.refreshToken;
        localStorage.setItem('kavan_auth', JSON.stringify(parsed));
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
});

export const { setCredentials, logout, switchRole, updateTokens, setLoading } = authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentTenant = (state: { auth: AuthState }) => state.auth.tenant;
export const selectCurrentRole = (state: { auth: AuthState }) => state.auth.role;
export const selectPermissions = (state: { auth: AuthState }) => state.auth.permissions;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

// Helper selector for permission checking
export const selectCanAccess = (permission: string) => (state: { auth: AuthState }) => {
  return state.auth.permissions.includes(permission) || state.auth.role === 'SUPER_ADMIN';
};

export default authSlice.reducer;
