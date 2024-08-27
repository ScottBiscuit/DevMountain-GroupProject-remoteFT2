import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import LocationsForm from "../components/LocationsForm";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export default function Locations() {
  const allReviews = useLoaderData();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get("/api/auth");
    setUser(res.data.user);
  };

  console.log(user);

  return (
    <>
      <h2>Locations</h2>
      <Row>
        <LocationsForm reviews={allReviews} user={user} />
      </Row>
    </>
  );
}
