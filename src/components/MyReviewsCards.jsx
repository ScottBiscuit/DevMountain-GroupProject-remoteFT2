import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardGroup, Row } from "react-bootstrap";
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
    setReviews(res.data);
  };

  const reviewCards = reviews.map((review) => (
    <ReviewCard key={review.reviewId} review={review} user={user} />
  ));

  return (
    user &&
    reviews && (
      // (!isLoading ? (
      <Card className="m-2">
        <Card.Title className="p-3">My Reviews</Card.Title>
      <CardGroup >
        
      {/* <Row xs={1} md={2} className="g-4"> */}
        {reviewCards}
      {/* </Row> */}
      </CardGroup>
      </Card>
      // ) : (
      //   <Row>...Loading Data</Row>
      // )
    )
  );
}
