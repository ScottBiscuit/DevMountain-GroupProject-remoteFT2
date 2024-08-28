import React, { useState } from "react";
import { Card, CardGroup } from "react-bootstrap";
import NewWishlistReviewModal from "./NewWishlistReviewModal";
import ReviewDetailsPage from "../pages/ReviewDetailsPage";
useState;
function LocationsCards({ review, user }) {
  const { reviewId, userId, reviewContent } = review;
  const [likes, setLikes] = useState(review.likeCount);

  return user ? (
    <Card className="p-3">
      <Card.Img variant="top" src={review.image} className="w-25"/>
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Subtitle className="text-muted">
          {review.city}, {review.state} {review.country}
        </Card.Subtitle>
        <Card.Text>{reviewContent.slice(0, 50)}...</Card.Text>
        <Card.Text>Likes: {likes}</Card.Text>
        <NewWishlistReviewModal userId={userId} reviewId={reviewId} />
      </Card.Body>
      <Card.Footer>
        <ReviewDetailsPage
          currentUser={user}
          review={review}
          userId={userId}
          likes={likes}
          setLikes={setLikes}
        />
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
        <Card.Text>{reviewContent.slice(0, 50)}...</Card.Text>
        <Card.Text>Likes: {likes}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <ReviewDetailsPage
          currentUser={user}
          review={review}
          userId={userId}
          likes={likes}
          setLikes={setLikes}
        />
      </Card.Footer>
    </Card>
    {/* <Card className="">
    </Card> */}
    </CardGroup>
  );
}

export default LocationsCards;
