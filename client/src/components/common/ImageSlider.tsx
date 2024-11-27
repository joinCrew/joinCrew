import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay } from "swiper/modules";

// Swiper 스타일 import 추가
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ImageSlider() {
  const images =[
    require('../../images/001.png'),
    require('../../images/002.png'),
    require('../../images/003.png'),
  ]
  return (
    <ImageSliderStyle>
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}  // 무한 반복 설정
      autoplay={{
        delay: 3000, // 3초마다 슬라이드 전환
        disableOnInteraction: false, // 사용자 상호작용 후에도 자동재생 유지
      }}
      speed={1000} // 전환 속도
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img 
            src={image} 
            alt={`slide-${index}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    </ImageSliderStyle>
  );
};

const ImageSliderStyle = styled.div`
  width: 100%;
  height: 330px;

  .swiper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 20px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
      max-width: 100%;
      max-height: 100%;
      width: auto; 
      height: auto; 
      object-fit: contain; 
      border-radius:30px;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    display:none;
  }
`;
export default ImageSlider;