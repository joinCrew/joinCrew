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
  // token이 존재하면 isAuthenticated를 true로 설정
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") ? true : false,

  user: null,

  storeLogin: (user, token) => {
    localStorage.setItem("token", token); // 로그인 시 토큰을 로컬스토리지에 저장
    set({ user, isAuthenticated: true, token });
    console.log(token);
  },

  storeLogout: () => {
    localStorage.removeItem("token"); // 로그아웃 시 토큰을 로컬스토리지에서 제거
    set({ user: null, isAuthenticated: false, token: null });

    document.cookie =
      "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
}));
