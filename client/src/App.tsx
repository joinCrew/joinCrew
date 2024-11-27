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
import Mypage from "./pages/Mypage";

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
      path: "/detail/:id",
      element: <EventDetail />,
    },
    {
      path: "/mypage",
      element: <Mypage />,
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
