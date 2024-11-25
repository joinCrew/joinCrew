import styled from "styled-components";
import DateSlider from "./DateSlider";
import { useMeetingStore } from "../store/meetingStore";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Home() {
  const meetings = useMeetingStore((state) => state.meetings);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return format(today, "d");
  });

  // 선택된 날짜의 모임을 필터링하고 시간순으로 정렬
  const filteredAndSortedMeetings = meetings
    .filter((meeting) => {
      const meetingDate = new Date(meeting.date);
      return format(meetingDate, "d") === selectedDate;
    })
    .sort((a, b) => {
      // 시간 문자열을 비교하여 정렬
      return a.time.localeCompare(b.time);
    });

  const navigate = useNavigate();
  const openDetail = (id: number) => {
    navigate("/detail", {
      state: { meetingId: id },
    });
  };

  return (
    <>
      <DateSlider selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      <HomeStyle>
        <div className="meetings-list">
          {filteredAndSortedMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="meeting-card"
              onClick={() => openDetail(meeting.id)}
            >
              <div className="time">{meeting.time}</div>
              <div className="title_info">
                <div className="title">{meeting.title}</div>
                <div className="info">
                  <span>
                    {meeting.gender === "female"
                      ? "👩🏻‍🦰 여자만"
                      : meeting.gender === "male"
                      ? "👨🏻 남자만"
                      : "👤 성별무관"}
                  </span>
                  <span>
                    {meeting.ageRange === "any"
                      ? "연령무관"
                      : `${meeting.ageRange}대`}
                  </span>
                </div>
              </div>
              <button className={`button ${meeting.isClosed ? "closed" : ""}`}>
                {meeting.isClosed ? "마감" : "신청가능"}
              </button>
            </div>
          ))}
        </div>
      </HomeStyle>
    </>
  );
}
const HomeStyle = styled.div`
  .meetings-list {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    gap: 16px;
  }

  .meeting-card {
    cursor: pointer;
    display: flex;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #eee;

    .time {
      width: 20%;
      font-size: 25px;
      font-weight: bold;
      margin: 10px 0;
    }

    .title_info {
      width: 70%;
    }

    .title {
      font-size: 22px;
      font-weight: bold;
      margin: 8px 0;
    }

    .info {
      display: flex;
      gap: 12px;
      color: #666;
    }

    .button {
      width: 10%;
      float: right;
      padding: 8px 16px;
      border-radius: 4px;
      background-color: #1e90ff;
      color: white;
      font-size: 17px;
      cursor: pointer;

      &.closed {
        background-color: #888;
      }
    }
  }
`;
export default Home;
