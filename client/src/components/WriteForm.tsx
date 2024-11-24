import styled from "styled-components";
import { useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import Button from "./common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeetingStore } from "../store/meetingStore";

interface FormInputs {
  title: string;
  content: string;
}

function WriteForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const addMeeting = useMeetingStore((state) => state.addMeeting);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    const finalMeetingData = {
      ...location.state.meetingData,
      title: data.title,
      content: data.content
    };
    addMeeting(finalMeetingData);
    navigate("/");
  };

  return (
    <>
      <WriteFormStyle>
        <ImageUpload />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              {...register("title", {
                required: "모임 이름을 작성해주세요",
              })}
              placeholder="모임 이름 ex)반포 한강러닝"
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div>
            <textarea
              {...register("content", {
                required: "모임에 대해 설명해주세요",
              })}
              placeholder="모임에 대해 설명해주세요"
              rows={5}
            />
            {errors.content && <p>{errors.content.message}</p>}
          </div>
          <Button>모임 등록</Button>
        </form>
      </WriteFormStyle>
    </>
  );
}
const WriteFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;

      input {
        width: 100%;
        height: 50px;
        padding: 0 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;

        &::placeholder {
          color: #999;
        }

        &:focus {
          outline: none;
          border-color: #74d36d;
          box-shadow: 0 0 0 2px rgba(116, 211, 109, 0.2);
        }
      }

      textarea {
        width: 100%;
        min-height: 200px;
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        resize: vertical;

        &::placeholder {
          color: #999;
        }

        &:focus {
          outline: none;
          border-color: #74d36d;
          box-shadow: 0 0 0 2px rgba(116, 211, 109, 0.2);
        }
      }

      p {
        color: #ff4444;
        font-size: 14px;
        margin-top: 4px;
      }
    }
  }
`;
export default WriteForm;
