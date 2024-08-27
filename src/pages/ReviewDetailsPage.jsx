import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

function ReviewDetailsPage({ review, userId }) {
  const [show, setShow] = useState(false);
  // const [userLike, setUserLike] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    retrieveUser();
    // checkLikeState();
  }, []);

  console.log(user, review);

  // const handleLike = async () => {
  //   await axios.post(`/api/like/${review.reviewId}`);
  //   await axios.put(`/api/reviews/${review.reviewId}/like`);
  // };

  // const checkLikeState = async () => {
  //   const likeState = await axios.get(`/api/like/${review.reviewId}`);
  //   if (!likeState) {
  //     setUserLike(false);
  //   } else {
  //     setUserLike(true);
  //   }
  // };

  const retrieveUser = async () => {
    const userData = await axios.get(`/api/user/${userId}`);
    setUser(userData.data.user);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    user && (
      <>
        <Button onClick={handleShow}>View Details</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Img />
              <Card.Body>
                <Card.Title>{review.locationName}</Card.Title>
                <Card.Subtitle>
                  {review.country} {review.state}, {review.city}
                </Card.Subtitle>
                <Card.Text>{review.reviewContent}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Card.Text>Likes: {review.likeCount}</Card.Text>
                {/* <Button onClick={handleLike}>Like</Button> */}
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Review Author</Card.Title>
                <Card.Subtitle>{user.username}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      // ) : (
      //   <>
      //     <Button onClick={handleShow}>View Details</Button>
      //     <Modal show={show} onHide={handleClose}>
      //       <Modal.Header>
      //         <Modal.Title></Modal.Title>
      //       </Modal.Header>
      //       <Modal.Body>
      //         <Card>
      //           <Card.Img />
      //           <Card.Body>
      //             <Card.Title>{review.locationName}</Card.Title>
      //             <Card.Subtitle>
      //               {review.country} {review.state}, {review.city}
      //             </Card.Subtitle>
      //             <Card.Text>{review.reviewContent}</Card.Text>
      //           </Card.Body>
      //           <Card.Footer>
      //             <Card.Text>Likes: {review.likeCount}</Card.Text>
      //             <Button disabled={true}>Liked</Button>
      //           </Card.Footer>
      //         </Card>
      //         <Card>
      //           <Card.Body>
      //             <Card.Title>Review Author</Card.Title>
      //             <Card.Subtitle>{user.username}</Card.Subtitle>
      //           </Card.Body>
      //         </Card>
      //       </Modal.Body>
      //       <Modal.Footer>
      //         <Button type="submit" onClick={handleClose}>
      //           Close
      //         </Button>
      //       </Modal.Footer>
      //     </Modal>
      //   </>
      // )
    )
  );
}

export default ReviewDetailsPage;
