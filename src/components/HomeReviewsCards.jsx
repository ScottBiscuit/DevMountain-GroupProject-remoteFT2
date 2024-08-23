import React from "react";
import { Card, CardGroup, Col, Row, Tabs, Tab } from "react-bootstrap";

export default function HomeReviewsCards({ reviewsRecCr, setReviewsRecCr, reviewsPop, setReviewsPop }) {

  // function addedWhen(reviewRecCr) {
  //   for (let i = 0; i < reviewRecCr.length; i++) {

  //   }
  //   let today = new Date();
  //   let createdOn = new Date(reviewsRecCr[i].createdAt);
  //   let msInDay = 24 * 60 * 60 * 1000;
    
  //   createdOn.setHours(0,0,0,0);
  //   today.setHours(0,0,0,0)
    
  //   let diff = (+today - +createdOn)/msInDay
  //   console.log(reviewsRecCr[0].createdAt)
  //   console.log(diff)
  //   return diff
  // }

  const featuredReviews = reviewsRecCr.map((review) => (
    // TODO Change to use random rather than featured
    <Card className="p-3" key={review.reviewId}>
      <Card.Img
        variant="top"
        src="../images/hot_air_balloons.jpg"
        className="rounded"
      />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}
          
        </Card.Text>
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
        className="rounded"
      />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {/* TODO change to # of likes */}
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  ));
  
  const newReviews = reviewsRecCr.map((review) => (
    <Card className="p-3" key={review.reviewId}>
      <Card.Img
        variant="top"
        src="../images/hot_air_balloons.jpg"
        className="rounded"
      />
      <Card.Body>
        <Card.Title>{review.locationName}</Card.Title>
        <Card.Text>{review.reviewContent}</Card.Text>
      </Card.Body>
      <Card.Footer>
         {/* TODO change to date added */}
        <small className="text-muted">Added 3 days ago</small>
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
