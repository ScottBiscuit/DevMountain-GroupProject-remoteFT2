import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import LocationSelector from "./LocationSelector";

function CreateReview() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    // if (!validateForm()) return;
    // axios
    //   .post("/api/party", {
    //     pcId: formState.pcId,
    //     pcImg: formState.pcImg,
    //     pcName: formState.pcName,
    //     pcRace: formState.pcRace,
    //     pcClass: formState.pcClass,
    //     pcLevel: formState.pcLevel,
    //     pcBackstory: formState.pcBackstory,
    //     pcGoals: formState.pcGoals,
    //     pcExtras: formState.pcExtras,
    //   })
    //   .then((res) => {
    //     setParty([res.data, ...party]);
    //     handleClose();
    //   });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow}>Create a new Review</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title your review</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group>
              <Form.Label>What do you want to say about this place?</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group>
              <Form.Label>Where did you go?</Form.Label>
              {/* <Form.Control /> */}
            </Form.Group>
            <LocationSelector />
          </Form>
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
