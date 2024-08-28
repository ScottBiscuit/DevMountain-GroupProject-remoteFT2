import axios from "axios";
import React, { useState, useEffect } from "react";
import MyReviewsCards from "../components/MyReviewsCards";
import MyWishlist from "../components/MyWishlist";
import MyInfoCard from "../components/MyInfoCard";
import { Button, Card, CardGroup, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get("/api/auth");
    setUser(res.data.user);
  };

  const navigate = useNavigate();
  const handleNav = () => navigate("/login");

  return user ? (
    <Card className="">
      <Card.Img
        src="../images/bgportrait_beach.jpg"
        alt="World map with location pins"
        className="opacity-50"
      />
      <Card.ImgOverlay>
        <Card>
          <Tabs
            defaultActiveKey="myinfo"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="myinfo" title="My Info">
              <CardGroup>
                <MyInfoCard user={user} />
              </CardGroup>
            </Tab>
            <Tab eventKey="myreviews" title="My Reviews">
              <CardGroup>
                <MyReviewsCards user={user} />
              </CardGroup>
            </Tab>
            <Tab eventKey="mywishlists" title="My Wislists">
              <CardGroup>
                <MyWishlist user={user} />
              </CardGroup>
            </Tab>
          </Tabs>
        </Card>
      </Card.ImgOverlay>
    </Card>
  ) : (
    <Card>
      <Card.Title>
        You are not currently logged in. Click the link below to login.
      </Card.Title>
      <Button onClick={handleNav}>Login</Button>
    </Card>
  );
}
