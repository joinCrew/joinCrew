import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

interface FormInputs {
  exerciseType: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  gender: string;
  ages: string;
}

function RecruitForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  
  const onSubmit = (data: FormInputs) => {
    const event_date = `${data.date} ${data.time}:00`;
    const meetingData = {
      title: "",  // Write 페이지에서 입력 예정
      descript: "", // Write 페이지에서 입력 예정
      max_members: data.maxParticipants,
      gender: data.gender,
      location: data.location,
      ages: data.ages,
      event_date: event_date
    };

    navigate("/write", {
      state: { meetingData },
    });
  };

  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);

  // 날짜를 YYYY-MM-DD 형식의 문자열로 변환하는 함수
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <RecruitFormStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>운동 종류</label>
          <input
            type="text"
            {...register("exerciseType", {
              required: "운동 종류를 입력해주세요",
            })}
            placeholder="운동 종류를 입력하세요"
          />
        </div>
        {errors.exerciseType && <p>{errors.exerciseType.message}</p>}

        <div>
          <label>날짜</label>
          <input
            type="date"
            min={formatDate(today)}
            max={formatDate(twoWeeksLater)}
            {...register("date", {
              required: "날짜를 선택해주세요",
              validate: (value) => {
                const selectedDate = new Date(value);
                return (
                  (selectedDate >= today && selectedDate <= twoWeeksLater) ||
                  "2주 이내의 날짜만 선택 가능합니다"
                );
              },
            })}
          />
        </div>
        {errors.date && <p>{errors.date.message}</p>}

        <div>
          <label>시간</label>
          <input
            type="time"
            {...register("time", { required: "시간을 입력해주세요" })}
          />
        </div>
        {errors.time && <p>{errors.time.message}</p>}

        <div>
          <label>장소</label>
          <input
            type="text"
            {...register("location", { required: "장소를 입력해주세요" })}
            placeholder="운동 장소를 입력하세요"
          />
        </div>
        {errors.location && <p>{errors.location.message}</p>}

        <div>
          <label>최대 인원</label>
          <input
            type="number"
            {...register("maxParticipants", {
              required: "인원을 입력해주세요",
              min: { value: 2, message: "최소 2명 이상이어야 합니다" },
            })}
            min="2"
          />
        </div>
        {errors.maxParticipants && <p>{errors.maxParticipants.message}</p>}

        <div>
          <label>성별</label>
          <select {...register("gender", { required: "성별을 선택해주세요" })}>
            <option value="" disabled selected>
              성별을 선택하세요
            </option>
            <option value="female">여성</option>
            <option value="male">남성</option>
            <option value="any">성별무관</option>
          </select>
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}

        <div>
          <label>연령대</label>
          <select
            {...register("ages", { required: "연령대를 선택해주세요" })}
          >
            <option value="" disabled selected>
              연령대를 선택하세요
            </option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
            <option value="any">연령무관</option>
          </select>
        </div>
        {errors.ages && <p>{errors.ages.message}</p>}
        <Button>다음</Button>
      </form>
    </RecruitFormStyle>
  );
}

const RecruitFormStyle = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    padding: 40px;
    width: 100%;
    max-width: 800px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: white;

    div {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      width: 100%;
      position: relative;

      label {
        width: 120px;
        font-weight: 600;
        font-size: 20px;
        color: #333;
        text-align: left;
        padding-right: 20px;
      }

      input,
      select {
        flex: 1;
        height: 48px;
        padding: 0 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 15px;
        color: #333;
        background-color: #fff;
        transition: all 0.2s ease;

        &:focus {
          border-color: #74d36d;
          box-shadow: 0 0 0 2px rgba(116, 211, 109, 0.2);
          outline: none;
        }

        &::placeholder {
          color: #999;
        }
      }

      select {
        cursor: pointer;
        padding-right: 40px;
      }
    }

    p {
      color: #ff4444;
      font-size: 13px;
      margin-top: -16px;
      margin-bottom: 16px;
      margin-left: 120px;
      text-align: left;
    }
  }
`;
export default RecruitForm;