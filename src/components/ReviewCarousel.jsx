import {
  Card,
  CardGroup,
  Carousel,
  Image,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ReviewCarousel({ reviewsPop }) {


  const popReviews = reviewsPop.map((review) => (
    <Carousel.Item key={review.reviewId}>
      <Image src={review.image} className="h-100 w-100"/>
      <Carousel.Caption className="bg-secondary opacity-75">
        <div>{review.city}, {review.country} - {review.locationName}</div>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  return (
    <CardGroup className="m-2" height='300px'>
      <Card>
        <Carousel className="w-100 p-3">{popReviews}</Carousel>
      </Card>

      <Card className="p-3">
        <Tabs
          defaultActiveKey="welcome"
          id="welcome-tabs"
          className="mb-3"
        >
          <Tab eventKey="welcome" title="Welcome">
            <Card>
              <Card.Body>
                <Card.Title>Welcome!</Card.Title>
                <Card.Text as='div'>
                  <div className="mb-3">
                    Thank you for visiting our happy travel site. Our mission is to help travelers like you realize their travel dreams!
                  </div>
                  <div>
                    Our community are traveling all over the world and sharing their amazing adventures so you can know before you go!
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="profile" title="Explore">
            <Card>
              <Card.Body>
                <Card.Title>Let's Find Some Inspiration</Card.Title>
                <Card.Text as='div'>
                  <div className="mb-3">
                    Planing a vacation can sometimes be a daunting task. Lucky for you, thousands of other people have already done most of the hard work for you.
                  </div>
                  <div>
                    Click below to search some locations and see what your fellow travelers have done there!
                  </div>
                </Card.Text>
                <Link to="/locations" className="btn btn-primary">Locations</Link>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="contact" title="Join In!">
            <Card>
              <Card.Body>
                <Card.Title>Join the Fun</Card.Title>
                <Card.Text as='div'>
                  <div className="mb-3">
                    Travel smarter, adventure better. Join our community of travelers and get the latest reviews, travel tips and destination inspiration.
                  </div>
                  <div>
                    Ready to join in the Fun? Click below to sign in or register and share your travels with others.
                  </div>
                </Card.Text>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>

      </Card>
    </CardGroup>
  );
}
