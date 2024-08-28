import axios from "axios";
import React, { useState } from "react";
import { Card, Button, Row } from "react-bootstrap";

function WishlistReviewCard({ review, wish }) {
  const [isDeleted, setIsDeleted] = useState(false);

  console.log(wish);

  const handleRemove = async () => {
    const res = await axios.delete(
      `/api/wishlist/reviews/${wish.itemId}/${review.reviewId}/delete`
    );
    if (res.data.success) {
      setIsDeleted(true);
    }
  };

  return (
    !isDeleted && (
      <Card>
        <Card>
          <Card.Img
            variant="top"
            src={review.image}
            style={{ height: "225px", textAlign: "center", objectFit: "cover" }}
          />
        </Card>
        <Card.Body>
          <Card.Title>{review.locationName}</Card.Title>
          <Card.Subtitle className="text-muted">
            {review.city}, {review.state} {review.country}
          </Card.Subtitle>
          <Card.Text>{review.reviewContent}</Card.Text>
          <Card.Text>Likes: {review.likeCount}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleRemove}>Remove Review</Button>
        </Card.Footer>
      </Card>
    )
  );
}

export default WishlistReviewCard;
