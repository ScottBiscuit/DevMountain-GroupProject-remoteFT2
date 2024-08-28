import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const handleNav = () => navigate("/locations");

  return wishReviews.length !== 0 ? (
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
      {wishlistReviews}
    </Card>
  ) : (
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
      <Button onClick={handleNav}>Find Reviews</Button>
    </Card>
  );
}

export default WishlistCard;
