import React from "react";
import { Card, Col, Button } from "react-bootstrap";

function ReviewCard({ review, user }) {
  console.log(review);

  return user && user.userId === review.userId ? (

      <Card className="p-3">
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
          <Card.Text>Likes: {review.likeCount}</Card.Text>
          <Button>Edit Review</Button>
        </Card.Body>
      </Card>

  ) : (

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
          <Card.Text>Likes: {review.likeCount}</Card.Text>
        </Card.Body>
      </Card>
  );
}

export default ReviewCard;
