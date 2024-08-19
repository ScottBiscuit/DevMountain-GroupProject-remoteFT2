import axios from "axios";
import React, { useState, useEffect } from "react";
import MyReviewsCards from "../components/MyReviewsCards";
import MyWishlist from "../components/MyWishlist";
import MyInfoCard from "../components/MyInfoCard";
import { Container } from "react-bootstrap";
import CreateReview from "../components/CreateReview";

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
        <CreateReview user={user} />
        <MyInfoCard user={user} />
        <MyReviewsCards user={user} />
        <MyWishlist user={user} />
      </Container>
    )
  );
}
