import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function LocationSearchModal({
  country,
  state,
  city,
  setCity,
  setCountry,
  setState,
}) {
  const [countriesDropdown, setCountriesDropdown] = useState(null);
  const [statesDropdown, setStatesDropdown] = useState(null);
  const [citiesDropdown, setCitiesDropdown] = useState(null);

  useEffect(() => {
    countrySelector();
    stateSelector();
    citySelector();
  }, []);

  const countrySelector = async () => {
    const countries = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    const countriesDropdownList = countries.data.data.map((country) => {
      return (
        <option key={country.iso2} value={country.country}>
          {country.country}
        </option>
      );
    });
    setCountriesDropdown(countriesDropdownList);
  };

  const stateSelector = async () => {
    if (country) {
      const states = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          country: country,
        }
      );
      const statesDropdownList = states.data.data.states.map((state) => {
        return (
          <option key={state.state_code} value={state.name}>
            {state.name}
          </option>
        );
      });
      setStatesDropdown(statesDropdownList);
    }
  };

  const citySelector = async () => {
    if (country) {
      if (!state) {
        const cities = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            country: country,
          }
        );

        const citiesDropdownList = cities.data.data.map((city) => {
          return (
            <option key={city} value={city}>
              {city}
            </option>
          );
        });
        setCitiesDropdown(citiesDropdownList);
      } else {
        const cities = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            country: country,
            state: state,
          }
        );

        const citiesDropdownList = cities.data.data.map((city) => {
          return (
            <option key={city} value={city}>
              {city}
            </option>
          );
        });
        setCitiesDropdown(citiesDropdownList);
      }
    }
  };

  const changeCountry = async (e) => {
    setCountry(e.target.value);
    // console.log(e.target.value);
    const states = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        country: e.target.value,
      }
    );
    const statesDropdownList = states.data.data.states.map((state) => {
      return (
        <option key={state.state_code} value={state.name}>
          {state.name}
        </option>
      );
    });
    setStatesDropdown(statesDropdownList);

    const cities = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        country: e.target.value,
      }
    );
    // console.log(cities);

    const citiesDropdownList = cities.data.data.map((city) => {
      return (
        <option key={city} value={city}>
          {city}
        </option>
      );
    });
    setCitiesDropdown(citiesDropdownList);
  };

  const changeState = async (e) => {
    setState(e.target.value);
    const cities = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        country: country,
        state: e.target.value,
      }
    );

    const citiesDropdownList = cities.data.data.map((city) => {
      return (
        <option key={city} value={city}>
          {city}
        </option>
      );
    });
    setCitiesDropdown(citiesDropdownList);
  };

  const changeCity = (e) => setCity(e.target.value);

  return (
    // countriesList &&
    <Form>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Select onChange={changeCountry} value={country}>
          <option value={null}>Choose a Country</option>
          {countriesDropdown}
        </Form.Select>
        <Form.Label>State</Form.Label>
        <Form.Select onChange={changeState} value={state}>
          <option value={null}>Choose a State</option>
          {statesDropdown}
        </Form.Select>
        <Form.Label>City</Form.Label>
        <Form.Select onChange={changeCity} value={city}>
          <option value={null}>Choose a City</option>
          {citiesDropdown}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

export default LocationSearchModal;
