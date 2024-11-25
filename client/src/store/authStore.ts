import { create } from "zustand";

export interface User {
  id: number;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  storeLogin: (user: User, token: string) => void;
  storeLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,

  storeLogin: (user, token) => set({ user, isAuthenticated: true, token }),

  storeLogout: () => {
    set({ user: null, isAuthenticated: false, token: null });

    document.cookie =
      "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
}));
