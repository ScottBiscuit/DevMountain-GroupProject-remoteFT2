import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function NewWishlistReviewModal({ reviewId, userId }) {
  const [show, setShow] = useState(false);
  const [wishlistDropdown, setWishlistDropdown] = useState([]);
  const [wishId, setWishId] = useState([]);

  useEffect(() => {
    generateWishlist();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const generateWishlist = async () => {
    const res = await axios.get(`/api/wishlist`);

    const wishlistDropdown = res.data.map((wish) => {
      return (
        <option key={wish.itemId} value={wish.itemId}>
          {wish.itemName}
        </option>
      );
    });
    setWishlistDropdown(wishlistDropdown);
  };

  const handleSubmit = async () => {
    await axios.post(`/api/wishlist/${reviewId}`, {
      itemId: wishId,
      reviewId: reviewId,
      userId: userId,
    });
    handleClose();
  };

  const changeWishId = (e) => setWishId(e.target.value);

  return (
    <>
      <Button onClick={handleShow}>Add to Wishlist</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Choose the wishlist to connect to:</Form.Label>
              <Form.Select onChange={changeWishId} value={wishId}>
                <option>Choose a Wishlist</option>
                {wishlistDropdown}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Save Wishlist Entry
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewWishlistReviewModal;
