import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  exerciseType: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  gender: string;
  ageRange: string;
}

function RecruitForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit = (data: FormInputs) => {
    console.log(data);
    navigate("/write");
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
          {errors.exerciseType && <p>{errors.exerciseType.message}</p>}
        </div>

        <div>
          <label>날짜</label>
          <input
            type="date"
            {...register("date", { required: "날짜를 선택해주세요" })}
          />
          {errors.date && <p>{errors.date.message}</p>}
        </div>

        <div>
          <label>시간</label>
          <input
            type="time"
            {...register("time", { required: "시간을 입력해주세요" })}
          />
          {errors.time && <p>{errors.time.message}</p>}
        </div>

        <div>
          <label>장소</label>
          <input
            type="text"
            {...register("location", { required: "장소를 입력해주세요" })}
            placeholder="운동 장소를 입력하세요"
          />
          {errors.location && <p>{errors.location.message}</p>}
        </div>

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
          {errors.maxParticipants && <p>{errors.maxParticipants.message}</p>}
        </div>

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
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>

        <div>
          <label>연령대</label>
          <select
            {...register("ageRange", { required: "연령대를 선택해주세요" })}
          >
            <option value="" disabled selected>
              연령대를 선택하세요
            </option>
            <option value="20s">20대</option>
            <option value="30s">30대</option>
            <option value="40s">40대</option>
            <option value="any">연령무관</option>
          </select>
          {errors.ageRange && <p>{errors.ageRange.message}</p>}
        </div>

        <button type="submit">다음</button>
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
    align-items: center;
    padding: 20px;
    width: 100%;
    max-width: 400px;

    div {
      margin-bottom: 15px;  // 간격 줄임
      width: 100%;

      p {
        color: #ff4444;
        font-size: 12px;
        margin-top: 3px;
        text-align: left;
        margin-bottom: 0;
      }
    }

    input,
    select {
      width: 100%;
      height: 40px;
      margin-top: 5px;
      border-radius: 8px;
      border: 2px solid #8c8c8c;

      &:focus {
        border-color: #74D36D;
        outline: none;
      }
    }

    label {
      display: block;
      text-align: left;
      font-weight: bold;
      font-size: 14px;  // 폰트 크기 조정
    }
  }
`;
export default RecruitForm;
