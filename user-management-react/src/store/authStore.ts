import { create } from 'zustand';
import { loginUser, registerUser } from '../api/auth';

interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  role: 'admin' | 'user';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: Credentials) => Promise<boolean>;
  logout: () => void;
  register: (credentials: Credentials) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (credentials) => {
    try {
      const response = await loginUser(credentials);
      set({ isAuthenticated: true, user: { id: response.id, role: 'user' } });
      return true;
    } catch {
      return false;
    }
  },
  register: async (credentials) => {
    try {
      const response = await registerUser(credentials);
      set({ isAuthenticated: true, user: { id: response.id, role: 'user' } });
      return true;
    } catch {
      return false;
    }
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));
