import React from "react";
import { Card, Col } from "react-bootstrap";

function ReviewCard({ review }) {
  console.log(review);

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{review.locationName}</Card.Title>
          <Card.Subtitle className="text-muted">
            {review.city}, {review.state} {review.country}
          </Card.Subtitle>
          <Card.Subtitle className="text-muted">
            {review.streetAddress}
          </Card.Subtitle>
          <Card.Text>{review.reviewContent}</Card.Text>
          <Card.Text>{review.likeCount}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ReviewCard;
