import React from "react";
import Header from "./components/common/Header";
import DateSlider from "./components/DateSlider";
import EventDetail from "./components/EventDetail";
import RecruitForm from "./components/RecruitForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ToastContainer from "./components/common/toast/ToastContainer";
import ResetPassword from "./components/ResetPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";

const dummyData = {
  img: 1,
  eventTitle: "하타요가 시작하기",
  eventLocation: "서울 구로구",
  eventDate: "11.23 (토)",
  eventTime: "오전 10:00",
  eventAge: "20대~50대",
  eventGender: "남녀 혼성",
  description:
    "요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기요가 시작하기",
};

const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
];

const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: item.element,
    };
  })
);

function App() {
  return (
    <div>
      <Header />
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
