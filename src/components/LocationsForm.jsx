import React from 'react'
import { Button, Form } from 'react-bootstrap';

export default function LocationsForm() {

  return (
    <Form>
    <Form.Label>Browse by:</Form.Label>
    <Form.Select aria-label="Default select example">
      <option>Country</option>
      {/* TODO connect to API and load Countries */}
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>

     <Form.Select aria-label="Default select example">
        {/* TODO Populate from API based on data from above selected Country - deactive until Country has been selected */}
      <option>State/Province</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>

    <Form.Select aria-label="Default select example">
        {/* TODO Populate from API based on data from above selected Country (and more specific if state selected)- deactive until Country has been selected */}
      <option>City</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>

    <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}
