import axios from "axios";
import React, { useState, useEffect } from "react";
import MyReviewsCards from "../components/MyReviewsCards";
import MyWishlist from "../components/MyWishlist";
import MyInfoCard from "../components/MyInfoCard";
import { Card } from "react-bootstrap";
import ImageUploader from "../components/ImageUploader";

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get("/api/auth");
    setUser(res.data.user);
  };

  return (
    user && (
      <Card className="vh-100">
        <Card.Img
          src="../images/bgportrait_beach.jpg"
          alt="World map with location pins"
          className="opacity-50 vh-100"
        />
        <Card.ImgOverlay>
          <MyInfoCard user={user} />
          <MyReviewsCards user={user} />
          <MyWishlist user={user} />
          <ImageUploader />
        </Card.ImgOverlay>
      </Card>
    )
  );
}
