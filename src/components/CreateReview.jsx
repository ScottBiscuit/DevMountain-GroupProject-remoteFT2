import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LocationSelector from "./LocationSelector";

function CreateReview({ user, reviews, setReviews }) {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userId } = user;

  const handleClose = () => {
    setShow(false);
    setCountry("");
    setState("");
    setCity("");
    setTitle("");
    setContent("");
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
    });
    console.log(newReview);

    setReviews([...reviews, newReview.data]);

    handleClose();
  };
  console.log(reviews);

  console.log(title, content, country, state, city, userId);

  return (
    <>
      <Button onClick={handleShow}>Create a new Review</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LocationSelector
            country={country}
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
    </>
  );
}

export default CreateReview;
