import { User } from "../../store/authStore";
import { httpClient } from "./http";

export interface LoginProps {
  email: string;
  password: string;
}
interface LoginResponse {
  user: User;
  token: string;
}

export const login = async (data: LoginProps) => {
  const response = await httpClient.post<LoginResponse>("users/login", data);
  return response.data;
};

export const signup = async (data: LoginProps) => {
  const response = await httpClient.post<LoginResponse>("users/join", data);
  return response.data;
};
