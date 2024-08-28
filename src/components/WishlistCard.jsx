import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import WishlistReviewCard from "./WishlistReviewCard";
import { useNavigate } from "react-router-dom";

function WishlistCard({ wish }) {
  const [wishReviews, setWishReviews] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    generateWishReviews();
  }, []);

  const generateWishReviews = async () => {
    const res = await axios.get(`/api/wishlist/reviews/${wish.itemId}`);
    setWishReviews(res.data);
  };

  const wishlistReviews = wishReviews.map((review) => (
    <WishlistReviewCard key={review.reviewId} review={review} wish={wish} />
  ));

  const navigate = useNavigate();
  const handleNav = () => navigate("/locations");

  const handleDelete = async () => {
    const res = await axios.delete(`/api/wishlist/${wish.itemId}/delete`);
    if (res.data.success) {
      setIsDeleted(true);
    }
  };

  //To Do:
  //delete wishlist button
  //remove review from wishlist button
  //create wishlist review card without add to wishlist button

  return (
    !isDeleted &&
    (wishReviews.length !== 0 ? (
      <Card>
        <Card.Body>
          <Card.Title>{wish.itemName}</Card.Title>
          <Card.Subtitle className="text-muted">
            {wish.city}, {wish.country}
          </Card.Subtitle>
          <Card.Subtitle className="text-muted">
            {wish.streetAddress}
          </Card.Subtitle>
          {wishlistReviews}
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleDelete}>Delete Wishlist</Button>
        </Card.Footer>
      </Card>
    ) : (
      <Card>
        <Card.Body>
          <Card.Title>{wish.itemName}</Card.Title>
          <Card.Subtitle className="text-muted">
            {wish.city}, {wish.country}
          </Card.Subtitle>
          <Card.Subtitle className="text-muted">
            {wish.streetAddress}
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleDelete}>Delete Wishlist</Button>
          <Button onClick={handleNav}>Find Reviews</Button>
        </Card.Footer>
      </Card>
    ))
  );
}

export default WishlistCard;
