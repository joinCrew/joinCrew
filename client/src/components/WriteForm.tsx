import styled from "styled-components";
import { useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";

interface FormInputs {
  title: string;
  content: string;
}

function WriteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
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
      </form>
      <button type="submit">모임 등록</button>
    </WriteFormStyle>
  );
}
const WriteFormStyle = styled.div`
 display: flex;
 justify-content: center;
 padding: 100px;
 align-items: center;

 form {
  flex-direction: column;
  width: 50%;

  input {
    margin-bottom: 30px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
  }
  
  textarea { 
   width: 100%;
   border-radius: 10px;
  }
 }
`;
export default WriteForm;
