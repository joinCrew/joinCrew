import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 navigate 사용
import { httpClient } from "../api/http";
import { useAuthStore } from "../store/authStore";

const Logout = () => {
  const { storeLogout } = useAuthStore(); // zustand store에서 storeLogout 함수 사용
  const navigate = useNavigate(); // 로그아웃 후 페이지 이동을 위해 navigate 사용

  const handleLogout = async () => {
    try {
      // 서버로 로그아웃 API 요청
      await httpClient.post("/users/logout");

      // 쿠키가 삭제되므로 상태 업데이트 (user 정보 및 토큰 초기화)
      storeLogout();

      // 로그아웃 후 로그인 페이지로 리다이렉트
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
