import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import ReviewCard from "./ReviewCard";

function WishlistCard({ wish }) {
  const [wishReviews, setWishReviews] = useState([]);

  useEffect(() => {
    generateWishReviews();
  }, []);

  const generateWishReviews = async () => {
    const res = await axios.get(`/api/wishlist/reviews/${wish.itemId}`);
    setWishReviews(res.data);
  };

  const wishlistReviews = wishReviews.map((review) => (
    <ReviewCard key={review.reviewId} review={review} />
  ));

  return (
    <>
      <Col>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>{wish.itemName}</Card.Title>
            <Card.Subtitle className="text-muted">
              {wish.city}, {wish.country}
            </Card.Subtitle>
            <Card.Subtitle className="text-muted">
              {wish.streetAddress}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
      {wishlistReviews}
    </>
  );
}

export default WishlistCard;
