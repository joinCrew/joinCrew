import React from 'react';
import Home from './components/Home';
import RecruitForm from './components/RecruitForm';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { RouterProvider } from 'react-router';
import WriteForm from './components/WriteForm';
import Header from './components/common/Header';
import DateSlider from './components/DateSlider';
import EventDetail from './components/EventDetail';

// dummyData는 필요한 경우 별도의 파일로 분리하거나 상태관리로 이동
const dummyData = {
  img: 1,
  eventTitle: "하타요가 시작하기",
  eventLocation: "서울 구로구",
  eventDate : "11.23 (토)",
  eventTime: "오전 10:00",
  eventAge: "20대~50대",
  eventGender: "남녀 혼성",
  description: "요가 시작하기요가 시작하기요가 시작하기요가 시작하기"
};

function App() {
  const routeList = [
    {
      path:"/",
      element: <Home />
    },
    {
      path:"/recruit",
      element:<RecruitForm />
    },
    {
      path:"/write",
      element:<WriteForm />
    }
  ];

  const router = createBrowserRouter(
    routeList.map((item) => {
      return {
        ...item,
        element: <Layout>{item.element}</Layout>
      };
    })
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;