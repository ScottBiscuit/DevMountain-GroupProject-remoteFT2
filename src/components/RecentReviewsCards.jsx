import React from "react";
import { Card, CardGroup, Col, Row } from "react-bootstrap";

export default function RecentReviewsCards({ reviewsRecCr, setReviewsRecCr }) {
  const newReviews = reviewsRecCr.map((review) => (
    <Card className="p-3" key={review.reviewId}>
      <Card.Img
        variant="top"
        src="../images/hot_air_balloons.jpg"
        class="rounded"
      />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  ));

  return <CardGroup className="p-2">{newReviews}</CardGroup>;
}
