import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import NewWishlistReviewModal from "./NewWishlistReviewModal";
import ReviewDetailsPage from "../pages/ReviewDetailsPage";

function LocationsCards({ review, user }) {
  const { reviewId, userId } = review;

  return user ? (
    <Card className="p-3">
      <Card.Img variant="top" src={review.image} className="w-25"/>
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Subtitle className="text-muted">
          {review.city}, {review.state} {review.country}
        </Card.Subtitle>
        <Card.Text>{review.reviewContent.slice(0, 50)}</Card.Text>
        <Card.Text>{review.likeCount}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <ReviewDetailsPage review={review} userId={userId} />
        <NewWishlistReviewModal userId={userId} reviewId={reviewId} />
      </Card.Footer>
    </Card>
  ) : (
    <CardGroup>
      <Card>
      <Card.Img variant="top" src={review.image} className="w-25"/>
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Subtitle className="text-muted">
          {review.city}, {review.state} {review.country}
        </Card.Subtitle>
        <Card.Text>{review.reviewContent.slice(0, 50)}...</Card.Text>
        <Card.Text>Likes: {review.likeCount}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <ReviewDetailsPage review={review} userId={userId} />
      </Card.Footer>
    </Card>
    {/* <Card className="">
    </Card> */}
    </CardGroup>
  );
}

export default LocationsCards;
