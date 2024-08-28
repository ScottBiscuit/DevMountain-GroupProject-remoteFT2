import React from "react";
import { Card, CardGroup, Col, Row, Tabs, Tab } from "react-bootstrap";

export default function HomeReviewsCards({ reviewsRecCr, setReviewsRecCr, reviewsPop, setReviewsPop, reviewsRand, setReviewsRand }) {

  const featuredReviews = reviewsRand.map((review) => (
    <Card className="p-3" key={review.reviewId}>
      <Card.Img
        variant="top"
        src={review.image}
        className="rounded"
        style={{ height: '250px', textAlign: 'center', objectFit: 'fill' }}
        />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{review.city}, {review.country}</small>
      </Card.Footer>
    </Card>
  ));

  const popularReviews = reviewsPop.map((review) => (
    <Card className="p-3" key={review.reviewId}>
      <Card.Img
        variant="top"
        src={review.image}
        className="rounded"
        style={{ height: '250px', textAlign: 'center', objectFit: 'fill' }}
      />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{review.likeCount} likes</small>
      </Card.Footer>
    </Card>
  ));
  
  const newReviews = reviewsRecCr.map((review) => (
    <Card className="p-3" key={review.reviewId}>
      <Card.Img
        variant="top"
        src={review.image}
        className="rounded"
        style={{ height: '250px', textAlign: 'center', objectFit: 'fill' }}
      />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Added on {review.createdAt.slice(0, 10)}</small>
      </Card.Footer>
    </Card>
  ));

  return (

    <Card className="p-3 m-2" >
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
