import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import { useNavigate } from "react-router-dom";

export default function MyReviewsCards({ user }) {
  const [reviews, setReviews] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateReviews();
  }, []);

  const generateReviews = async () => {
    const res = await axios.get(`/api/reviews/${user.userId}`);
    // setIsLoading(false);
    console.log(res.data);

    setReviews(res.data);
  };

  const reviewCards = reviews.map((review) => (
    <ReviewCard key={review.reviewId} review={review} />
  ));

  return (
    user &&
    reviews && (
      // (!isLoading ? (
      <Row xs={1} md={2} className="g-4">
        {reviewCards}
      </Row>
      // ) : (
      //   <Row>...Loading Data</Row>
      // )
    )
  );
}
