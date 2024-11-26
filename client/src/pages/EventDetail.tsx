import { styled } from "styled-components";
import { FaLocationDot, FaCalendarCheck } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDetail } from "../api/event.api";
import { useAuthStore } from "../store/authStore"; // zustand 상태 사용
import { checkCrew, detachCrew, joinCrew } from "../api/join.api";

interface Meeting {
  id: number;
  title: string;
  content: string;
  location: string;
  gender: string;
  ages: string;
  event_date: string;
  now_members: number;
  max_members: number;
}

function EventDetail() {
  const { id } = useParams<{ id: string }>();

  // 로그인 상태 확인
  const { token, isAuthenticated } = useAuthStore((state) => state); // 로그인 상태 가져오기

  const [meeting, setMeeting] = useState<Meeting | null>(null); // 상태 정의
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isAlreadyJoined, setIsAlreadyJoined] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventDetail = async () => {
      if (!id) {
        setError("Event ID is missing in the URL.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchDetail(Number(id));
        console.log("Fetched data:", data);
        setMeeting(data[0]);

        if (isAuthenticated && data[0]) {
          const crewCheckData = await checkCrew(data[0].id, token!); // 모임 ID와 토큰을 이용해 참여 여부 확인
          console.log(crewCheckData);
          setIsAlreadyJoined(crewCheckData.hasJoined); // 참여 여부 상태 업데이트
        }
      } catch (err) {
        setError("Failed to fetch event details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id, token]);

  useEffect(() => {
    console.log("Updated isAlreadyJoined:", isAlreadyJoined);
  }, [isAlreadyJoined]); // isAlreadyJoined가 변경될 때마다 실행

  const handleJoinClick = async () => {
    if (!isAuthenticated) {
      setError("로그인 후 참여할 수 있습니다.");
      return;
    }

    if (meeting && !isAlreadyJoined) {
      // 이미 참여한 상태일 때 버튼 클릭 방지
      setIsJoining(true); // 참여 중 상태
      try {
        const isFull = meeting.now_members + 1 >= meeting.max_members;

        if (isFull && !window.confirm("정말 신청하시겠습니까?")) {
          setIsJoining(false); // 취소 시 진행 중 상태를 false로 설정
          return;
        }

        const data = {
          is_full: isFull,
          title: meeting.title,
        };

        await joinCrew(meeting.id, data, token!);

        setMeeting((prevMeeting) => ({
          ...prevMeeting!,
          now_members: prevMeeting!.now_members + 1,
        }));

        if (isFull) {
          setMeeting((prevMeeting) => ({
            ...prevMeeting!,
            is_full: true,
          }));
        }

        setIsAlreadyJoined(true); // 참여 후 상태 업데이트
      } catch (err) {
        setError("모임 참여에 실패했습니다.");
      } finally {
        setIsJoining(false); // 완료 후 상태 초기화
      }
    }
  };

  const handleCancelJoin = async () => {
    if (!isAuthenticated) {
      setError("로그인 후 취소할 수 있습니다.");
      return;
    }

    if (meeting) {
      try {
        // 취소 API 호출
        await detachCrew(meeting.id, token!);

        setMeeting((prevMeeting) => ({
          ...prevMeeting!,
          now_members: prevMeeting!.now_members - 1,
        }));

        setIsAlreadyJoined(false); // 취소 후 참여 여부 상태 변경
      } catch (err) {
        setError("모임 참여 취소에 실패했습니다.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!meeting) {
    return <div>Event not found</div>;
  }

  return (
    <EventDetailStyle>
      <div>
        <img
          src={`http://picsum.photos/id/${meeting.id}/1000/600`} // 일단 이미지 임시
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
              {`${meeting.event_date}`}
            </p>
            <p className="age">
              <IoPeople />
              {meeting.ages === "any" ? "연령무관" : `${meeting.ages} 대`}
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
            <div className="join">
              <StyledButton
                onClick={isAlreadyJoined ? handleCancelJoin : handleJoinClick}
                disabled={
                  meeting.now_members >= meeting.max_members || isJoining // 참여 중일 때만 비활성화
                }
              >
                {isJoining
                  ? "참여 중..."
                  : isAlreadyJoined
                  ? "참여 취소"
                  : meeting.now_members >= meeting.max_members
                  ? "모임이 가득 찼습니다"
                  : "참여하기"}
              </StyledButton>
              <span>
                현재 인원: {meeting.now_members} / {meeting.max_members} 명
              </span>
            </div>
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
    gap: 1rem;
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
