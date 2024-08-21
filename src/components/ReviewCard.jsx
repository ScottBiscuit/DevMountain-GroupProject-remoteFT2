import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Button, Modal } from "react-bootstrap";
import LocationSelector from "./LocationSelector";

function ReviewCard({ review, user }) {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentReview, setCurrentReview] = useState(review);
  const { reviewId } = review;

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

  const handleSubmit = async () => {
    const updatedReview = await axios.put(`/api/reviews/${reviewId}`, {
      country: country || currentReview.country,
      state: state || currentReview.state,
      city: city || currentReview.city,
      locationName: title || currentReview.locationName,
      reviewContent: content || currentReview.reviewContent,
    });
    setCurrentReview(updatedReview.data);
    console.log(updatedReview.data);

    handleClose();
  };

  // console.log(title, content, country, state, city, user.userId);

  return user && user.userId === review.userId ? (
    <Col>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{currentReview.locationName}</Card.Title>
          <Card.Subtitle className="text-muted">
            {currentReview.city}, {currentReview.state} {currentReview.country}
          </Card.Subtitle>
          <Card.Subtitle className="text-muted">
            {currentReview.streetAddress}
          </Card.Subtitle>
          <Card.Text>{currentReview.reviewContent}</Card.Text>
          <Card.Text>{currentReview.likeCount}</Card.Text>
          <Button onClick={handleShow}>Edit Review</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <LocationSelector
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
              {/* {errors && <div className="error">{`Please include: ${errors}`}</div>} */}
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Col>
  ) : (
    <Col>
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
          <Card.Text>{review.likeCount}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ReviewCard;
