import {
  Card,
  CardGroup,
  Carousel,
  Image,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ReviewCarousel({ reviewsPop, setPeviewsPop }) {


  const popReviews = reviewsPop.map((review) => (
    <Carousel.Item key={review.reviewId}>
      <Image src="../images/new_york_times_square.jpg" />
      <Carousel.Caption>
        <h3>{review.locationName}</h3>
        <p>{review.reviewContent}</p>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  return (
    <CardGroup className="m-2">
      <Card>
        <Carousel className="w-100 m-3 h-100">{popReviews}</Carousel>
      </Card>

      <Card className="p-3">
        <Tabs
          defaultActiveKey="welcome"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="welcome" title="Welcome">
            <Card>
              <Card.Body>
                <Card.Title>Welcome!</Card.Title>
                <Card.Text>
                  <div className="mb-3">
                    Thank you for visiting our happy travel site. Our mission is to help travelers like you realize their travel dreams!
                  </div>
                  <div>
                    Our community have traveled all over the world and shared their amazing adventures so you can know before you go!
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="profile" title="Explore">
            <Card>
              <Card.Body>
                <Card.Title>Let's Find Some Inspiration</Card.Title>
                <Card.Text>
                  <div className="mb-3">
                    Planing a vacation can sometimes be a daunting task. Lucky for you, thousands of other people have already done the hard work for you.
                  </div>
                  <div>
                    Click below to search some locations and see what your fellow travels have done there!
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
                <Card.Text>
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
