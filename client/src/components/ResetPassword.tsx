import { styled } from "styled-components";
import { useState } from "react";
import { useToast } from "./hooks/useToast";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showToast } = useToast();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast("비밀번호가 일치하지 않습니다...");
      return;
    }

    // 비밀번호 초기화 요청 처리 로직
    console.log("Password reset attempted with:", { email, password });
    showToast("비밀번호가 성공적으로 변경되었습니다!");
  };

  return (
    <ResetPasswordStyle>
      <form onSubmit={handleReset}>
        <h1>비밀번호 초기화</h1>
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">새로운 비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="새로운 비밀번호를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새로운 비밀번호를 다시 입력하세요"
            required
          />
        </div>
        <button type="submit">비밀번호 초기화</button>
        <div className="links">
          <Link to="/login">로그인 화면으로 돌아가기</Link>
        </div>
      </form>
    </ResetPasswordStyle>
  );
}

const ResetPasswordStyle = styled.div`
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

export default ResetPassword;
