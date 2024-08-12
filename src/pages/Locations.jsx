import React from 'react';
import { Row } from 'react-bootstrap';
import LocationsForm from '../components/LocationsForm';
import HighlightedCitiesCards from '../components/HighlightedCitiesCards';

export default function Locations() {
  return (
    <>
    {/* TODO decide what happens when you click on search from location form - load below? Does that replace Highlighted cities or bump down? Go to new page? */}
    <h2>Locations</h2>
    <Row>
      <LocationsForm />
    </Row>

    <Row>
      <HighlightedCitiesCards />
    </Row>
    </>
  )
}
