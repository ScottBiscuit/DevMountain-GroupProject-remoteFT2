import axios from "axios";
import React, { useState, useEffect } from "react";
import MyReviewsCards from "../components/MyReviewsCards";
import MyWishlist from "../components/MyWishlist";
import MyInfoCard from "../components/MyInfoCard";
import { Container } from "react-bootstrap";

export default function User() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get("/api/auth");
    setUser(res.data.user);
  };

  return (
    user && (
      <Container>
        <MyInfoCard user={user} />
        <MyReviewsCards user={user} />
        <MyWishlist user={user} />
      </Container>
    )
  );
}
