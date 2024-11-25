import React from "react";
import Home from "./pages/Home";
import RecruitForm from "./pages/RecruitForm";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { RouterProvider } from "react-router";
import WriteForm from "./pages/WriteForm";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./components/ResetPassword";
import ToastContainer from "./components/common/toast/ToastContainer";

// dummyData는 필요한 경우 별도의 파일로 분리하거나 상태관리로 이동
// const dummyData = {
//   img: 1,
//   eventTitle: "하타요가 시작하기",
//   eventLocation: "서울 구로구",
//   eventDate: "11.23 (토)",
//   eventTime: "오전 10:00",
//   eventAge: "20대~50대",
//   eventGender: "남녀 혼성",
//   description: "요가 시작하기요가 시작하기요가 시작하기요가 시작하기",
//   now_member: 1,
//   max_member: 6,
// };

function App() {
  const routeList = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/recruit",
      element: <RecruitForm />,
    },
    {
      path: "/write",
      element: <WriteForm />,
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
    {
      path: "/detail",
      element: <EventDetail />,
    },
  ];

  const router = createBrowserRouter(
    routeList.map((item) => {
      return {
        ...item,
        element: <Layout>{item.element}</Layout>,
      };
    })
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
