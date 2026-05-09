import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      set({ user, token: access_token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.msg || 'Login failed', 
        isLoading: false 
      });
      return false;
    }
  },

  register: async (name, email, password, role = 'student') => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/auth/register', { name, email, password, role });
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.msg || 'Registration failed', 
        isLoading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/auth/me');
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  }
}));

export default useAuthStore;
