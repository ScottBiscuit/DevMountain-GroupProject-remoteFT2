import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";

export default function MyInfoCard({ user }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    generateReviews();
  }, []);

  const generateReviews = async () => {
    const res = await axios.get(`/api/reviews/${user.userId}`);
    setReviews(res.data);
  };

  return (
    reviews &&
    user && (
      <Row>
        <Col>MyInfo</Col>
        <Card>
          <Card.Img>{user.userImgSrc}</Card.Img>
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle>{user.email}</Card.Subtitle>
            <Card.Text>My Review Total: {reviews.length}</Card.Text>
          </Card.Body>
        </Card>
      </Row>
    )
  );
}
