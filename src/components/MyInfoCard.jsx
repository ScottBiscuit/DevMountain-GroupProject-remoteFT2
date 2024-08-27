import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Card,
  CardGroup,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import ChangeUserBio from "./ChangeUserBio";
import ChangePassword from "./ChangePassword";

export default function MyInfoCard({ user }) {
  const [reviews, setReviews] = useState([]);
  const [userBio, setUserBio] = useState(user.bio);

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
      <Card className="m-2">
        <Card.Title className="p-3">My Info</Card.Title>
        <CardGroup>
          <Card className="p-3">
            {/* TODO - change to src={user.userImgSrc} inside Card.Img ? */}
            <Card.Img>{user.userImgSrc}</Card.Img>
            <Card.Body>
              <Card.Title>Welcome back!</Card.Title>

              <ListGroup className="list-group-flush">
                <ListGroup.Item>{user.username}</ListGroup.Item>
                <ListGroup.Item>{user.email}</ListGroup.Item>
                <ListGroup.Item>
                  My Review Total: {reviews.length}
                </ListGroup.Item>
              </ListGroup>
              <ChangePassword />
            </Card.Body>
            <Card.Body>
              <Card.Img src="../images/user_passport.jpg" />
            </Card.Body>
          </Card>
          <Card className="p-3">
            <Card.Body>
              <Card.Subtitle>My Bio: </Card.Subtitle>
              <Card.Text>{userBio}</Card.Text>
              <ChangeUserBio userBio={userBio} setUserBio={setUserBio} />
            </Card.Body>
          </Card>
        </CardGroup>
      </Card>
    )
  );
}
