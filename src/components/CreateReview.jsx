import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReviewModal from "./ReviewModal";

function CreateReview({ user, reviews, setReviews }) {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const { userId } = user;

  const handleClose = () => {
    setShow(false);
    setCountry("");
    setState("");
    setCity("");
    setTitle("");
    setContent("");
    setImage("");
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    const newReview = await axios.post("/api/reviews", {
      country: country,
      state: state,
      city: city,
      locationName: title,
      reviewContent: content,
      userId: userId,
      image: image,
    });
    console.log(newReview);

    setReviews([...reviews, newReview.data]);

    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow}>Create a new Review</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReviewModal
            country={country}
            setCity={setCity}
            setCountry={setCountry}
            setState={setState}
            setTitle={setTitle}
            setContent={setContent}
            setImage={setImage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Create Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateReview;
