import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardGroup, Row } from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import CreateReview from "./CreateReview";

export default function MyReviewsCards({ user }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    generateReviews();
  }, []);

  const generateReviews = async () => {
    const res = await axios.get(`/api/reviews/${user.userId}`);
    setReviews(res.data);
  };

  const reviewCards = reviews.map((review) => (
    <ReviewCard
      key={review.reviewId}
      review={review}
      user={user}
      reviews={reviews}
      setReviews={setReviews}
    />
  ));

  return (
    user &&
    reviews && (
      <>
        <Card className="m-2">
          {/* <Card.Title className="p-3">My Reviews</Card.Title> */}
          <Card.Body>
        <CreateReview user={user} reviews={reviews} setReviews={setReviews} className=""/>
          <Row xs={1} md={2} lg={3} className="g-3">
            {reviewCards}
          </Row>
          </Card.Body>
        </Card>
      </>
    )
  );
}
