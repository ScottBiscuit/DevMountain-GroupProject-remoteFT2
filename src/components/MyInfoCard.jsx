import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Card, CardGroup, ListGroup } from "react-bootstrap";

export default function MyInfoCard({ user }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    generateReviews();
  }, []);

  const generateReviews = async () => {
    const res = await axios.get(`/api/reviews/${user.userId}`);
    console.log(res.data);

    setReviews(res.data);
  };

  return (
    reviews &&
    user && (
        <Card className="m-2">
          <Card.Title className="p-3">My Info</Card.Title>
        <CardGroup>
          <Card className="p-3">
          {/* TODO - change to src={user.userImgSrc} inside Card.Img ? */}
          <Card.Img>{user.userImgSrc}</Card.Img>
          <Card.Body>
            <Card.Title>Welcome back!</Card.Title>
            <Card.Subtitle> </Card.Subtitle>
            <Card.Text></Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{user.username}</ListGroup.Item>
              <ListGroup.Item>{user.email}</ListGroup.Item>
              <ListGroup.Item>My Review Total: {reviews.length}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Body>
            <Card.Link href="#">Edit User Info</Card.Link>
            <Card.Link href="#">Change Password</Card.Link>
          </Card.Body>
          </Card>
          <Card className="p-3">
            <Card.Img src="../images/user_passport.jpg" />
          </Card>
        </CardGroup>
        </Card>
    )
  );
}
