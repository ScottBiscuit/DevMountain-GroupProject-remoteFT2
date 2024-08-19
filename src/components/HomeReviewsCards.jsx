import React from "react";
import { Card, CardGroup, Col, Row, Tabs, Tab } from "react-bootstrap";

export default function HomeReviewsCards({ reviewsRecCr, setReviewsRecCr, reviewsPop, setReviewsPop }) {

  const featuredReviews = reviewsRecCr.map((review) => (
    <Card className="p-3" key={review.reviewId}>
      <Card.Img
        variant="top"
        src="../images/hot_air_balloons.jpg"
        class="rounded"
      />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  ));

  
  const popularReviews = reviewsPop.map((review) => (
    <Card className="p-3" key={review.reviewId}>
      <Card.Img
        variant="top"
        src="../images/hot_air_balloons.jpg"
        class="rounded"
      />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  ));
  
  const newReviews = reviewsRecCr.map((review) => (
    <Card className="p-3" key={review.reviewId}>
      <Card.Img
        variant="top"
        src="../images/hot_air_balloons.jpg"
        class="rounded"
      />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  ));

  return (

    <Card className="p-3 m-2">
      <Tabs
        defaultActiveKey="featured"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="featured" title="Featured">
          <CardGroup>
            {featuredReviews}
          </CardGroup>
        </Tab>
        <Tab eventKey="popular" title="Popular">
          <CardGroup>
            {popularReviews}
          </CardGroup>
        </Tab>
        <Tab eventKey="newest" title="Newest">
          <CardGroup>
            {newReviews}
          </CardGroup>
        </Tab>
      </Tabs>
    </Card>
  );
}
