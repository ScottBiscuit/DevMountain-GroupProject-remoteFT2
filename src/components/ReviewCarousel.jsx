import { Button, Card, CardGroup, Carousel, Image, Nav } from "react-bootstrap";

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
      <Card className="p-2">
        <Card.Header>
          <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}
