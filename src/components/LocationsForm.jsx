import React, { useEffect, useState } from "react";
import { Button, Modal, Card } from "react-bootstrap";
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

  console.log(reviews);

  // useEffect(() => {
  //   allReviews();
  // }, []);

  const handleClose = () => {
    setCountry("");
    setState("");
    setCity("");
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  // const allReviews = async () => {
  //   const allResults = await axios.get("/api/reviews");
  //   setSearchResults(allResults.data.reviews);
  // };

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
    console.log(results);

    setSearchResults(results.data);
    handleClose();
  };
  console.log(searchResults);

  const reviewResults = searchResults.map((review) => (
    <LocationsCards key={review.reviewId} review={review} user={user} />
  ));

  return (
    <>
      <Button onClick={handleShow}>Filter Reviews</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
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
      {reviewResults}
    </>
  );
}
