import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/register",
    element: <RegistrationPage/>,
  },
  {
    path: "*",
    element: <NotFoundPage/>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
