import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function RegisterForm({ onSignup }) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <Form 
      onSubmit={(e) => {
        onSignup(e, {
          email: emailValue,
          password: passwordValue,
        })
      }}
      >
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control 
          required 
          id='emailSignup'
          type="email" 
          placeholder="name@example.com" 
          onChange={(e) => setEmailValue(e.target.value)}
          />
        </Form.Group>
    </Row>
    <Row>
        <Form.Group as={Col}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            id='passwordSignup'
            type="password"
            placeholder="password"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </Form.Group>
    </Row>
      <Row className="mb-3">
      </Row>
      <Button type="submit" variant="success" >Sign Up</Button>
    </Form>
  );
}
