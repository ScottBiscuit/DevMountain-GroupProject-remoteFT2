import axios from "axios";
import React, { useState, useEffect } from "react";
import MyReviewsCards from "../components/MyReviewsCards";
import MyWishlist from "../components/MyWishlist";
import MyInfoCard from "../components/MyInfoCard";
import { Container } from "react-bootstrap";

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    if (!user) {
      const res = await axios.get("/api/auth");
      setUser(res.data.user);
    }
  };

  return (
    user && (
      <Container>
        {/* <MyInfoCard /> */}
        <MyReviewsCards user={user} />
        {/* <MyWishlist /> */}
      </Container>
    )
  );
}
