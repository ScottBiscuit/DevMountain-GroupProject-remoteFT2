import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function LocationSelector() {
  const [countriesList, setCountriesList] = useState(null);
  const [countriesDropdown, setCountriesDropdown] = useState(null);
  useEffect(() => {
    countrySelector();
  }, []);

  const countrySelector = async () => {
    const countries = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    // setCountriesList(countries.data.data);
    console.log(countries.data.data[0]);

    const dropdownList = countries.data.data.map((country) => {
      return (
        <option key={country.iso2} value={country.country}>
          {country.country}
        </option>
      );
    });
    console.log(dropdownList);
    setCountriesDropdown(dropdownList);
  };

  return (
    // countriesList &&
    <>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Select>
          <option>Choose a Country</option>
          {countriesDropdown}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>State</Form.Label>
        <Form.Select>
          <option>Choose a State</option>
          <option value="State 1">State 1</option>
          <option value="State 2"></option>
          <option value="State 3"></option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Select>
          <option>Choose a City</option>
          <option value="City 1"></option>
          <option value="City 2"></option>
          <option value="City 3"></option>
        </Form.Select>
      </Form.Group>
    </>
  );
}

export default LocationSelector;
