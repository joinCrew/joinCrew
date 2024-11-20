import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import { useState } from "react";

const DateSlider = () => {
  const getTwoWeekDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      dates.push({
        date: format(date, "d"),
        day: format(date, "E", { locale: ko }),
        color:
          date.getDay() === 6 ? "blue" : date.getDay() === 0 ? "red" : "black",
      });
    }

    return dates;
  };

  const dates = getTwoWeekDates();
  // 오늘 날짜를 초기값으로 설정
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return format(today, "d");
  });
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    // 여기에 날짜 선택 시 실행할 로직 추가
  };

  return (
    <DateSliderStyle>
      <Swiper
        modules={[Navigation]}
        slidesPerView={7}
        navigation
        spaceBetween={20}
      >
        {dates.map(({ date, day, color }) => (
          <SwiperSlide key={date}>
            <DateButton
              onClick={() => handleDateClick(date)}
              className={selectedDate === date ? "selected" : ""}
              style={{ color: selectedDate === date ? "white" : color }}
            >
              <div style={{ marginBottom: "5px" }}>{date}</div>
              <div>{day}</div>
            </DateButton>
          </SwiperSlide>
        ))}
      </Swiper>
    </DateSliderStyle>
  );
};

const DateSliderStyle = styled.div`
  width: 70%;
  margin: 40px auto;

  .swiper {
    padding: 0 50px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 40px;
    height: 40px;
    background-color: #bdbdbd;
    border-radius: 50%;
    &::after {
      font-size: 15px;
      color: white;
    }
  }

  .swiper-button-next {
    right: 10px;
  }

  .swiper-button-prev {
    left: 10px;
  }
`;

const DateButton = styled.button`
  border: none;
  background: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 40px;
  font-size: 17px;
  margin: 0 10px;
  width: 130px;
  height: fit-content;

  &:hover {
    background-color: #f0f0f0;
  }

  &.selected {
    background-color: #1a73e8;
    color: white;
  }
`;

export default DateSlider;
