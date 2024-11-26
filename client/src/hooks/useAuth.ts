import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";
import { useAuthStore } from "../store/authStore";
import { login, LoginProps, signup } from "../api/auth.api";

export const useAuth = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { storeLogin, storeLogout } = useAuthStore();

  const userLogin = (data: LoginProps) => {
    login(data)
      .then((res) => {
        const { user, token } = res;
        console.log("Login response:", user, token); // 로그인 응답 확인
        storeLogin(user, token); // 상태 업데이트
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
