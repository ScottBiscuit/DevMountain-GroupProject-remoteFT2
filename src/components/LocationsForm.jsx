import React, { useEffect, useState } from "react";
import { Button, Modal, Card, CardGroup, Row } from "react-bootstrap";
import LocationSearchModal from "./LocationSearchModal";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import LocationsCards from "./LocationsCards";

export default function LocationsForm({ reviews, user }) {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [searchResults, setSearchResults] = useState(reviews.data.reviews);

  const handleClose = () => {
    setCountry("");
    setState("");
    setCity("");
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClearFilter = () => setSearchResults(reviews.data.reviews);

  const handleSubmit = async () => {
    let results;
    if (!city) {
      if (!state) {
        results = await axios.post("/api/reviews/country", {
          country: country,
        });
      } else {
        results = await axios.post("/api/reviews/state", {
          state: state,
        });
      }
    } else {
      results = await axios.post("/api/reviews/city", {
        city: city,
      });
    }
    setSearchResults(results.data);
    handleClose();
  };

  const reviewResults = searchResults.map((review) => (
    <LocationsCards key={review.reviewId} review={review} user={user} />
  ));

  return (
    <Card className="bg-secondary-subtle">
      <Card.Title className="p-3">Looking for some inspiration?</Card.Title>
      <Card.Body>
        <Button onClick={handleShow} className="m-1">Filter Reviews</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Filter Reviews by Location:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LocationSearchModal
              country={country}
              state={state}
              city={city}
              setCity={setCity}
              setCountry={setCountry}
              setState={setState}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={handleSubmit}>
              Search
            </Button>
          </Modal.Footer>
        </Modal>
        <Button onClick={handleClearFilter}>Reset Filter</Button>
        <Row xs={1} md={2} lg={3} className="g-3 p-3">
          {reviewResults}
        </Row>
      </Card.Body>
    </Card>
  );
}
