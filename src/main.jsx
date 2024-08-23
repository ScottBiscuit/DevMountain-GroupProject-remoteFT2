import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Locations from "./pages/Locations.jsx";
import User from "./pages/User.jsx";
import MyInfoCard from "./components/MyInfoCard.jsx";
import MyReviewsCards from "./components/MyReviewsCards.jsx";
import MyWishlist from "./components/MyWishlist.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} 
        loader={async () => {
        const res = await axios.get(`/api/reviews/popular/3`)
        const res2 = await axios.get(`/api/reviews/recentCreated/3`)
        const res3 = await axios.get(`/api/reviews/random/3`)
        return {reviewsPop: res.data.reviewsPop, reviewsRecCr: res2.data.reviewsRecCr, reviewsRand: res3.data.reviewsRand}
        }}
      />
      <Route path="/locations" element={<Locations />} />
      <Route path="/user" element={<User />} />
      <Route path="/userInfo" element={<MyInfoCard />} />
      <Route path="/userReviews" element={<MyReviewsCards />} />
      <Route path="/userWishlist" element={<MyWishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
