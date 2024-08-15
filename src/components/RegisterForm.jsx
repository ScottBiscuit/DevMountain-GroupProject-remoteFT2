import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

export default function RegisterForm({ onSignup }) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordValue2, setPasswordValue2] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailValue(value);

    if (!isEmailValid(value)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        event.preventDefault();
        if (!emailError && passwordValue === passwordValue2) {
          onSignup(e, {
            username: username,
            email: emailValue,
            password: passwordValue,
          });
        } else if (passwordValue !== passwordValue2) {
          alert("Make sure that your password is the same in both fields!");
        } else {
          alert(emailError);
        }
      }}
    >
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            id="emailSignup"
            type="email"
            placeholder="name@example.com"
            onChange={handleEmailChange}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            id="usernameSignup"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            id="passwordSignup"
            type="password"
            placeholder="password"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            required
            id="passwordSignup2"
            type="password"
            placeholder="password"
            onChange={(e) => setPasswordValue2(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3"></Row>
      <Button type="submit" variant="success">
        Sign Up
      </Button>
    </Form>
  );
}
