import React from 'react';
import Home from './components/Home';
import RecruitForm from './components/RecruitForm';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { RouterProvider } from 'react-router';
import WriteForm from './components/WriteForm';
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
