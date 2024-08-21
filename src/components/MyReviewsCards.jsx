import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import CreateReview from "./CreateReview";

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

  console.log(user);

  return (
    user &&
    reviews && (
      <>
        <CreateReview user={user} reviews={reviews} setReviews={setReviews} />
        <Row xs={1} md={2} className="g-4">
          {reviewCards}
        </Row>
      </>
    )
  );
}
