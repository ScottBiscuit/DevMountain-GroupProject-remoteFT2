import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Locations from './pages/Locations.jsx';
import User from './pages/User.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path='locations' element={<Locations />} />
      <Route path='user' element={<User />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
