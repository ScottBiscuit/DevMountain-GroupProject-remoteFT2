import React from 'react'
import { Card, CardGroup, Col, Row} from 'react-bootstrap';

export default function RecentReviewsCards() {
  return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src="../images/hot_air_balloons.jpg" />
        <Card.Body>
          <Card.Title>Have to see the balloons!</Card.Title>
          <Card.Text>
            Watching hundreds of hot air balloons rise against the sunrise was breathtaking. The vibrant colors and tranquil ascent created a magical, dreamlike experience. An unmissable spectacle that delights all senses!
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="../images/calm_lake_boat.jpg" />
        <Card.Body>
          <Card.Title>Amazing boat ride!</Card.Title>
          <Card.Text>
            The boat ride was a serene escape into nature’s embrace. Crystal-clear waters, gentle breezes, and stunning views of lush landscapes made the experience unforgettable. Perfect for relaxation and soaking in natural beauty. Highly recommend for a tranquil getaway!
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="../images/paris_eiffel_tower_2.jpg" />
        <Card.Body>
          <Card.Title>Eiffel Tower, Paris</Card.Title>
          <Card.Text>
            The Eiffel Tower offers breathtaking views of Paris from every angle. Its iron lattice structure is iconic, and the experience of ascending it is unforgettable. A must-see for any traveler!
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>

    // <Row xs={1} md={2} className="g-4">
    //   {Array.from({ length: 4 }).map((_, idx) => (
    //     <Col key={idx}>
    //       <Card>
    //         <Card.Img variant="top" src="holder.js/100px160" />
    //         <Card.Body>
    //           <Card.Title>Card title</Card.Title>
    //           <Card.Text>
    //             This is a longer card with supporting text below as a natural
    //             lead-in to additional content. This content is a little bit
    //             longer.
    //           </Card.Text>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   ))}
    // </Row>
  );
}
