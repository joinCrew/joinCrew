import { styled } from "styled-components";
import { FaLocationDot, FaCalendarCheck } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { useMeetingStore } from "../store/meetingStore";
import { useLocation } from "react-router-dom";
import { useState } from "react";

// export type DummyData = {
//   img: number;
//   eventTitle?: string;
//   eventLocation?: string;
//   eventDate?: string;
//   eventTime?: string;
//   eventAge?: string;
//   eventGender?: string;
//   description?: string;
//   now_member: number;
//   max_member: number;
// };

// export type detailProps = {
//   dummyData: DummyData;
// };

function EventDetail() {
  const location = useLocation();
  const meeting_id = location.state.meetingId;
  const meetings = useMeetingStore((state) => state.meetings);
  const updateMeeting = useMeetingStore((state) => state.updateMeeting);
  //id 로 일치하는 모임 찾기
  const meeting = meetings.find((meeting) => meeting.id === meeting_id);
  const [hasjoined, setHasJoined] = useState(false); // 참여 여부 관리(한 번만 참여하기 누르게 하기 위함)

  if (!meeting) {
    return <div>모임을 찾을 수 없습니다.</div>;
  }

  const countParticipants = () => {
    if (!hasjoined && meeting.currentParticipants < meeting.maxParticipants) {
      const updatedMeeting = {
        ...meeting,
        currentParticipants: meeting.currentParticipants + 1,
        isClosed: meeting.currentParticipants + 1 >= meeting.maxParticipants
      };
      updateMeeting(meeting_id, updatedMeeting);
      setHasJoined(true);
    }
  };

  return (
    <EventDetailStyle>
      <div>
        <img
          src={`http://picsum.photos/id/${meeting.id}/1000/600`}
          alt={meeting.title || "Event Image"}
        />
        <h1>{meeting.title}</h1>
        <div className="center">
          <div className="info">
            <p className="location">
              <FaLocationDot />
              {meeting.location}
            </p>
            <p className="time">
              <FaCalendarCheck />
              {`${meeting.date} ${meeting.time}`}
            </p>
            <p className="age">
              <IoPeople />
              {meeting.ageRange === "any"
                ? "연령무관"
                : `${meeting.ageRange}대`}
            </p>
            <p className="gender">
              {meeting.gender === "female"
                ? "여자만"
                : meeting.gender === "male"
                ? "남자만"
                : "성별무관"}
            </p>
          </div>
          <div className="join">
            <StyledButton onClick={() => countParticipants()}
              disabled={hasjoined || meeting.isClosed}>
              참여하기
            </StyledButton>
            <span>
              현재 인원: {meeting.currentParticipants} / {meeting.maxParticipants} 명
            </span>
          </div>
        </div>
        <div className="contents">{meeting.content}</div>
        <div className="map">지도</div>
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
    gap: 1rem; /* 여백 추가로 더 보기 좋게 */
  }

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

  .join {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 600;
    gap: 1rem;
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
  svg {
    margin-right: 10px;
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
  transition: background-color 0.5s ease;

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
