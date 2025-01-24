import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from './pages/registerPage';
import DashBoardPage from './pages/dashboardPage'
import MainPage from './pages/mainPage'
import { Suspense } from "react";
import LoginPage from './pages/loginPage';
import Erro404 from './pages/pageError/404';

const router = createBrowserRouter([
  {
    path: "/confirmacao",
    element: <DashBoardPage></DashBoardPage>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: "/",
    element: <MainPage></MainPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "*",
    element: <Erro404 />, 
   
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
      <Suspense>
      </Suspense>
  </React.StrictMode>
);
