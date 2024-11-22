import { styled } from "styled-components";
import { FaLocationDot , FaCalendarCheck } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";

export type DummyData = {
    img: number;
    eventTitle?: string;
    eventLocation?: string;
    eventTime?: string;
    eventAge?: string;
    eventGender?: string;
    description?: string;
};

export type detailProps = {
    dummyData: DummyData;
};

function EventDetail({ dummyData }: detailProps) {
    return (
        <EventDetailStyle>
            <div>
                <img 
                    src={`http://picsum.photos/id/${dummyData.img}/1000/600`} 
                    alt={dummyData.eventTitle || "Event Image"}     
                />
                <h1>{dummyData.eventTitle}</h1>
                <div className="center">
                    <div className="info">
                        <p className="location">
                            <FaLocationDot />
                            {dummyData.eventLocation}
                        </p>
                        <p className="time">
                            <FaCalendarCheck />
                            {dummyData.eventTime}
                            </p>
                        <p className="age">
                            <IoPeople />
                            {dummyData.eventAge}
                        </p> 
                        <p className="gender">
                            {dummyData.eventGender}
                        </p>
                    </div>
                        <StyledButton>참여하기</StyledButton>
                </div>
                <div className="contents">
                    {dummyData.description}
                </div>
                
            </div>
        </EventDetailStyle>
    );
}

const EventDetailStyle = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 0 auto;
    max-width: 1000px;
    padding: 20px 0;
    font-size: 1rem;

    .img {
        overflow: hidden;
        width: 100%;
        max-width: 100%;
    }

    .center {
        display: flex;
        justify-content: space-between;

        .info {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 1rem;
        font-weight: 600;

            p {
                flex: 0 0 calc(50% - 0.5rem);
                margin: 0;
            }
        }
    }

    .contents {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #0e0d0d;
        max-width: 100%; 
        width: 100%; 
        height: auto;
        overflow: auto;
        word-wrap: break-word;  
    }

`;

const StyledButton = styled.button`
    background-color: #5872a5;
    color: #fff; 
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3; 
    }

    &:active {
        background-color: #003d80; 
    }

    &:disabled {
        background-color: #c0c0c0; 
        cursor: not-allowed;
    }
`;

export default EventDetail;