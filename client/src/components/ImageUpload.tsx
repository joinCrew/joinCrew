import React, { useRef, useState } from "react";
import { PiCamera } from "react-icons/pi";
import styled from "styled-components";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      // FormData 객체 생성
      // const formData = new FormData();
      // formData.append("image", file);

      // try {
      //   const response = await fetch('your-api-endpoint/upload', {
      //     method: 'POST',
      //     body: formData
      //   });
        
      //   if (response.ok) {
      //     const data = await response.json();
      //     console.log('이미지 업로드 성공:', data);
      //   }
      // } catch (error) {
      //   console.error('이미지 업로드 실패:', error);
      // }
    }
  };

  return (
    <ImageUploadStyle>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <div
        className="image-container"
        onClick={() => fileInputRef.current?.click()}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Preview" />
        ) : (
          <>
            <PiCamera />
            <span>사진을 선택해주세요</span>
          </>
        )}
      </div>
    </ImageUploadStyle>
  );
}

const ImageUploadStyle = styled.div`
  .image-container {
    width: 600px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    margin-right:50px;

    &:has(img) {
      border: none;
    }
      
    &:hover {
      border-color: #74d36d;
    }

    svg {
      width: 150px;
      height: 150px;
      color: #666;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
export default ImageUpload;
