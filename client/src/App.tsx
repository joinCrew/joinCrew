import React from 'react';
import Header from './components/common/Header';
import DateSlider from './components/DateSlider';
import EventDetail from './components/EventDetail';
import AddEvent from './components/AddEvent';

const dummyData = {
  img: 1,
  eventTitle: "하타요가 시작하기",
  eventLocation: "서울 구로구",
  eventTime: "11.23 (토) 오전 10:00",
  eventAge: "20대~50대",
  eventGender: "남녀 혼성",
  description: "요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기"
};

function App() {
  return (
    <div>
      <Header />
      <DateSlider />
      <EventDetail dummyData={dummyData}/>
      {/* <AddEvent /> */}
    </div>
  );
}

export default App;
