import styled from "styled-components";
import logo from "../../images/logo.png";
import { IoPersonOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Dropdown from "./Dropdown";
import Logout from "../Logout";

function Header() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleRecruitClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/recruit");
    }
  };

  return (
    <HeaderStyle>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="조인크루" />
        </div>
      </Link>

      <div className="profile">
        <StyledButton onClick={handleRecruitClick}>
          <TiPencil style={{ marginRight: 50 }} />
        </StyledButton>
        <Dropdown toggleButton={<IoPersonOutline/>}>
          <nav className='drop'>
            {isAuthenticated && (
              <ul>
                <li className="my"><Link to="/mypage">마이페이지</Link></li>
                <li><Logout/></li>
              </ul>
            )}
            {!isAuthenticated && (
              <ul>
                <li><Link to={'/login'}>로그인</Link></li>
              </ul>

            )}
            
          </nav>
          
        </Dropdown>
        
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  background-color: #5872a5;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  .drop{
    ul{
      display :flex;
      gap:16px;
      flex-direction : column;
      width : 100px;
      li{
        a, button{
          font-size : 1rem;
          font-weight : 600;
          text-decoration :none;
          dispaly : flex;
          align-item : center;
          line-height : 1;
          background : none;
          border : 0;
          cursor : pointer,
          padding : 20px,
          svg{
            margin-right : 10px;
          }
        }
      }
    }   
  }
  .logo {
    height: 50px;
    display: flex;
    align-items: center;

    img {
      height: 100%;
      width: auto;
      object-fit: contain;
      transform-origin: left center;
      transform: scale(2.5);
    }
  }

  .profile {
    display: flex;
    font-size: 25px;
    color: white;
  }

  .my {
    display : flex;
    font-size : 12px;
    }
`;
const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 25px;
  color: white;
`;
export default Header;