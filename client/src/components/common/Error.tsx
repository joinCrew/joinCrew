import { styled } from 'styled-components';
import { IoSadOutline } from "react-icons/io5";

function Error() {
    return (
        <ErrorStyle>
            <div className="icon"><IoSadOutline /></div>
            <h1>유효하지 않은 주소입니다...</h1>
        </ErrorStyle>
    )
}

const ErrorStyle = styled.div`
    display: flex;
    flex-direction : column;
    justify-content: center;
    align-items: center;
    gap : 12px;
    padding : 120px 0;

    .icon{
        svg{
            font-size: 4rem;
            fill : #000000;
        }
    }`;

export default Error;
