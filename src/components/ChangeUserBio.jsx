import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";

function ChangeUserBio({ userBio, setUserBio }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleEditContent = async (e) => {
    const bioContent = e.target.value;
    setUserBio(bioContent);
  };

  const handleSubmit = async () => {
    await axios.put("/api/user/editBio", {
      bio: userBio,
    });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow}>Edit User Info</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Img />
            <Card.Body>
              <Card.Title>My Bio:</Card.Title>
              <Form>
                <Form.Control
                  onChange={handleEditContent}
                  value={userBio}
                  as="textarea"
                  rows={6}
                ></Form.Control>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangeUserBio;
