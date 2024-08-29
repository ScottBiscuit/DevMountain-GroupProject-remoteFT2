import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "react-bootstrap";
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

  return (
      <Card>
        <Card.Title className="text-center m-2">Locations</Card.Title>
        <LocationsForm reviews={allReviews} user={user} />
      </Card>
  );
}
