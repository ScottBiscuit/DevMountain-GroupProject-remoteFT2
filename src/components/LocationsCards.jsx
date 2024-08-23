import React, { useState } from "react";
import { Card } from "react-bootstrap";
import NewWishlistReviewModal from "./NewWishlistReviewModal";

function LocationsCards({ review, user }) {
  const [show, setShow] = useState(false);
  const { reviewId, userId } = review;

  console.log(review);

  return user ? (
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
        <Card.Text>{review.likeCount}</Card.Text>
        <NewWishlistReviewModal userId={userId} reviewId={reviewId} />
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

export default LocationsCards;
