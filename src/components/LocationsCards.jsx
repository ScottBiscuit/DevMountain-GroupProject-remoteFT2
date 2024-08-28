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
      <Card.Img variant="top" src={review.image} style={{ height: '250px', textAlign: 'center', objectFit: 'fill'}}/>
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          {review.city}, {review.state} {review.country}
        </Card.Subtitle>
        <Card.Text>{reviewContent.slice(0, 70)}...</Card.Text>
        <Card.Text>Likes: {likes}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <NewWishlistReviewModal 
          userId={userId} 
          reviewId={reviewId} 
        />
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
    <Card className="p-3">
      <Card.Img variant="top" src={review.image}/>
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          {review.city}, {review.state} {review.country}
        </Card.Subtitle>
        <Card.Text>{reviewContent.slice(0, 50)}...</Card.Text>
        <Card.Text>Likes: {likes}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <ReviewDetailsPage
          currentUser={user}
          review={review}
          userId={userId}
          likes={likes}
          setLikes={setLikes}
        />
      </Card.Footer>
    </Card>
  );
}

export default LocationsCards;
