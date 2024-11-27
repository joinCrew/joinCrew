import React, { useState } from 'react'
import { styled } from 'styled-components'
import DateSlider from '../components/DateSlider'
import { format } from "date-fns";
import { Link, useNavigate } from 'react-router-dom';
import { useMymeetings } from '../hooks/useMymeeting';
import { detachCrew } from '../api/join.api';
import { useAuthStore } from '../store/authStore';
import { ResponseMeeting } from '../api/meetings.api';

const Mypage = () => {
    const { token, isAuthenticated } = useAuthStore((state) => state);
    const {meetings} = useMymeetings();
    console.log(meetings);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return format(today, "d");
    });
    const filteredAndSortedMeetings = meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.event_date.split(' ')[0]);
      return format(meetingDate, "d") === selectedDate;
    })
    .sort((a, b) => {
        // 시간 문자열을 비교하여 정렬
        return a.event_date.localeCompare(b.event_date);
        });
        
    const navigate = useNavigate();
    const openDetail = (id: number) => {
        navigate(`/detail/${id}`, {
        state: { meetingId: id },
        });
    };
    const onDateSelect = (date:string)=>{
        setSelectedDate(date);
    }
   
    return (
        <>
            <DateSlider selectedDate={selectedDate} 
                        onDateSelect={onDateSelect}/>
            <MypageStyle>
                    <div className="meetings-list">
                        {filteredAndSortedMeetings.map((meeting) => (
                    <div
                        key={meeting.id}
                        className="meeting-card"
                        onClick={() => openDetail(meeting.id)}
                        >
                        <div className="time">{meeting.event_date.split(' ')[1].substring(0,5)}</div>
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
                                {meeting.ages === "any"
                                ? "연령무관"
                                : `${meeting.ages}대`}
                            </span>
                        </div>
                    </div>
                    
                    </div>
                ))}
                </div>

            </MypageStyle>
        </>
    
  )
}
const MypageStyle = styled.div`
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
`
export default Mypage
