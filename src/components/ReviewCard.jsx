import axios from "axios";
import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import ReviewModal from "./ReviewModal";
import NewWishlistReviewModal from "./NewWishlistReviewModal";
import { Link } from "react-router-dom";

function ReviewCard({ review, user, reviews, setReviews }) {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentReview, setCurrentReview] = useState(review);
  const { reviewId, userId } = review;

  console.log(currentReview);

  const handleClose = () => {
    setShow(false);
    setCountry("");
    setState("");
    setCity("");
    setTitle("");
    setContent("");
  };

  const handleShow = () => {
    setCountry(currentReview.country);
    setState(currentReview.state);
    setCity(currentReview.city);
    setTitle(currentReview.locationName);
    setContent(currentReview.reviewContent);
    setShow(true);
  };

  const handleDelete = async () => {
    const res = await axios.delete(`/api/reviews/${reviewId}`);
    if (res.data.success) {
      const newReviewsListCopy = [...reviews];
      const newReviewsList = newReviewsListCopy.filter((reviewEntry) => {
        return reviewEntry.reviewId !== reviewId;
      });
      console.log(newReviewsList);
      setReviews(newReviewsList);
      handleClose();
    }
  };

  const handleSubmit = async () => {
    const updatedReview = await axios.put(`/api/reviews/${reviewId}`, {
      country: country || currentReview.country,
      state: state || currentReview.state,
      city: city || currentReview.city,
      locationName: title || currentReview.locationName,
      reviewContent: content || currentReview.reviewContent,
      image: image || currentReview.image
    });
    setCurrentReview(updatedReview.data);
    handleClose();
  };

  return user && user.userId === review.userId ? (
    <Card className="p-3">
      <Card.Img variant="top" src={currentReview.image} />
      <Card.Body>
        <Card.Title>{currentReview.locationName}</Card.Title>
        <Card.Subtitle className="text-muted">
          {currentReview.city}, {currentReview.state} {currentReview.country}
        </Card.Subtitle>
        <Card.Subtitle className="text-muted">
          {currentReview.streetAddress}
        </Card.Subtitle>
        <Card.Text>{currentReview.reviewContent.slice(0, 100)}...</Card.Text>
        <Card.Text>{currentReview.likeCount}</Card.Text>
        <Button onClick={handleShow}>Edit Review</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Edit/Delete Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewModal
              country={country}
              city={city}
              state={state}
              title={title}
              content={content}
              setCity={setCity}
              setCountry={setCountry}
              setState={setState}
              setTitle={setTitle}
              setContent={setContent}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} variant="secondary">Cancel</Button>
            <Button onClick={handleDelete} variant="secondary">Delete Review</Button>
            <Button type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  ) : (
    <Card>
      <Card.Img variant="top" src={review.image} />
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
        <NewWishlistReviewModal userId={userId} reviewId={reviewId} />
      </Card.Body>
      {/* <Card.Footer>
        <Link
          to="/reviewDetails"
          className="btn btn-primary"
          state={{ reviewId: reviewId, userId: userId }}
        >
          View Details
        </Link>
      </Card.Footer> */}
    </Card>
  );
}

export default ReviewCard;
