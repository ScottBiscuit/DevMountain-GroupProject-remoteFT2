import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";

function ChangePassword() {
  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userPassword2, setUserPassword2] = useState(null);

  const handleClose = () => {
    setCurrentPassword(null);
    setUserPassword(null);
    setUserPassword2(null);
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  console.log(currentPassword, userPassword, userPassword2);

  const handleCheckPassword = async (e) => {
    const userPassword = e.target.value;
    setCurrentPassword(userPassword);
  };

  const handleEditPassword = async (e) => {
    const userPassword = e.target.value;
    setUserPassword(userPassword);
  };

  const handleEditPassword2 = async (e) => {
    const userPassword = e.target.value;
    setUserPassword2(userPassword);
  };

  const handleSubmit = async () => {
    const res = await axios.put("/api/user/editPassword", {
      password: userPassword,
      password2: userPassword2,
      currentPassword: currentPassword,
    });
    console.log(res);
    if (res.data.success) {
      alert("password updated");
      handleClose();
    } else {
      alert(res.data.error);
    }
  };

  return (
    <>
      <Button onClick={handleShow}>Change my Password</Button>
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
                <Form.Label>Enter your current Password:</Form.Label>
                <Form.Control
                  onChange={handleCheckPassword}
                  type="password"
                ></Form.Control>
                <Form.Label>Enter your new Password:</Form.Label>
                <Form.Control
                  onChange={handleEditPassword}
                  type="password"
                ></Form.Control>
                <Form.Label>Re-enter your new Password:</Form.Label>
                <Form.Control
                  onChange={handleEditPassword2}
                  type="password"
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

export default ChangePassword;
