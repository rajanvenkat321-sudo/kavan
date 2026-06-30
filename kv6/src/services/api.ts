import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

// Create API instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    const tenantId = state.auth.tenant?.id;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const stored = localStorage.getItem('kavan_auth');
      const refreshToken = stored ? JSON.parse(stored).refreshToken : null;
      
      if (refreshToken) {
        try {
          const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
          const refreshResponse = await axios.post(`${baseURL}/auth/refresh/`, {
            refresh_token: refreshToken
          });
          
          const payload = refreshResponse.data.data;
          const newAccessToken = payload.accessToken || payload.access || payload.token;
          const newRefreshToken = payload.refresh_token || payload.refresh;
          
          if (newAccessToken && newRefreshToken) {
            // Update store and localStorage
            const { updateTokens } = await import('../store/slices/authSlice');
            store.dispatch(updateTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
            
            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error('Failed to rotate refresh token:', refreshError);
        }
      }
      
      // If no refresh token or refresh failed, log out
      store.dispatch(logout());
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      console.error('Access Denied: You do not have permission for this action.');
    }

    return Promise.reject(error);
  }
);
