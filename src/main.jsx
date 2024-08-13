import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import axios from 'axios';
import Home from './pages/Home.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Locations from './pages/Locations.jsx';
import User from './pages/User.jsx'
import MyInfoCard from './components/MyInfoCard.jsx';
import MyReviewsCards from './components/MyReviewsCards.jsx';
import MyWishlist from './components/MyWishlist.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path='/locations' element={<Locations />} />
      <Route path='/user' element={<User />} />
      <Route path='/userInfo' element={<MyInfoCard />} />
      <Route path='/userReviews' element={<MyReviewsCards />} />
      <Route path='/userWishlist' element={<MyWishlist />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
