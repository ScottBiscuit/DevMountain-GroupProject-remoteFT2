import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import WishlistModal from "./WishlistModal";
useState;
function CreateWishlistItem({ user, wishlist, setWishlist }) {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [entryTitle, setEntryTitle] = useState("");
  const { userId } = user;

  const handleClose = () => {
    setShow(false);
    setCountry("");
    setState("");
    setCity("");
    setEntryTitle("");
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    const newWishlistItem = await axios.post("/api/wishlist", {
      country: country,
      itemName: entryTitle,
      state: state,
      city: city,
      userId: userId,
    });
    console.log(newWishlistItem);

    setWishlist([...wishlist, newWishlistItem.data]);

    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow}>Create a new Wishlist</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add New Wishlist Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WishlistModal
            country={country}
            setCity={setCity}
            setCountry={setCountry}
            setState={setState}
            setEntryTitle={setEntryTitle}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add to Wishlist
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateWishlistItem;
