import styled from "styled-components";
import logo from "../../images/logo.png";
import { IoPersonOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { Link } from "react-router-dom";

function Header() {
  return (
    <HeaderStyle>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="조인크루" />
        </div>
      </Link>
      <div className="profile">
        <StyledLink to="/recruit">
          <TiPencil style={{ marginRight: 50 }} />
        </StyledLink>
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
   padding: 0 10%;

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
`;
const StyledLink = styled(Link)`
  color: inherit;
  display: flex;
  align-items: center;
`;
export default Header;
