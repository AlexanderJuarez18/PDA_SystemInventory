import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'supervisor' | 'operator' | 'auditor';

interface User {
  id: string;
  name: string;
  role: UserRole;
  employeeId: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOffline: boolean;
  login: (user: User) => void;
  logout: () => void;
  setOffline: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isOffline: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setOffline: (status) => set({ isOffline: status }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
