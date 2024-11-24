import { styled } from "styled-components";
import { useState } from "react";
import { useToast } from "./hooks/useToast";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 요청 처리 로직
    console.log("Login attempted with:", { email, password });
    showToast("환영합니다!");
  };

  return (
    <LoginStyle>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-group">
          <label htmlFor="email">아이디</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <button type="submit">로그인</button>
        <div className="links">
          <Link to="/signup">회원가입</Link>
          <Link to="/reset">비밀번호 초기화</Link>
        </div>
      </form>
    </LoginStyle>
  );
}

const LoginStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;

  form {
    background: #fff;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 500px;
    text-align: center;

    h1 {
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .input-group {
      margin-bottom: 1.5rem;
      text-align: left;

      label {
        display: block;
        margin-bottom: 0.8rem;
        font-size: 1rem;
        font-weight: bold;
      }

      input {
        width: 100%;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 1.1rem;
        transition: all 0.3s ease;
      }

      input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
      }
    }

    button {
      display: inline-block;
      width: 100%;
      padding: 1rem;
      font-size: 1.2rem;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }

    .links {
      display: flex;
      justify-content: flex-start;
      margin-top: 1rem;

      a {
        font-size: 0.9rem;
        color: #007bff;
        text-decoration: none;
        margin-right: 1rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Login;
