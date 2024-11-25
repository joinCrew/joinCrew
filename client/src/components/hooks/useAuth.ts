import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";
import { useAuthStore } from "../../store/authStore";
import { login, LoginProps, signup } from "../api/auth.api";

export const useAuth = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { storeLogin, storeLogout } = useAuthStore();

  const userLogin = (data: LoginProps) => {
    login(data)
      .then((res) => {
        const { user, token } = res;
        storeLogin(user, token);
        showToast("로그인 성공");
        navigate("/");
      })
      .catch((error) => {
        showToast("로그인 실패");
        console.error("Login error:", error);
      });
  };

  const userLogout = () => {
    storeLogout();
  };

  const userSignup = (data: LoginProps) => {
    signup(data).then((res) => {
      navigate("/login");
    });
  };

  return {
    userLogin,
    userLogout,
    userSignup,
  };
};
