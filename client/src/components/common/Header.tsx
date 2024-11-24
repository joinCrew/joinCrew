import styled from "styled-components";
import logo from "../../images/logo.png";
import { IoPersonOutline } from "react-icons/io5";

function Header() {
  return (
    <HeaderStyle>
      <div className="logo">
        <img src={logo} alt="조인크루" />
      </div>
      <div className="profile">
        <IoPersonOutline />
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
  padding: 0 20px;

  .logo {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 15%;

    img {
      height: 100%;
      width: auto;
      object-fit: contain;
      transform-origin: left center;
      transform: scale(2.5);
    }
  }

  .profile {
    font-size: 25px;
    margin-right: 10%;
    color: white;
  }
`;

export default Header;
