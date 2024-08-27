import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

function ReviewDetailsPage({ review, userId, likes, setLikes, currentUser }) {
  const [show, setShow] = useState(false);
  const [userLike, setUserLike] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    retrieveUser();
    checkLikeState();
  }, []);

  const handleLike = async () => {
    const like = await axios.post(`/api/like/${review.reviewId}`);
    await axios.put(`/api/reviews/${review.reviewId}/like`);
    let likeNum = +likes + 1;
    console.log(likeNum);
    setUserLike(true);
    setLikes(likeNum);
    setLikeId(like.data.likeId);
  };

  const handleUnlike = async () => {
    const unlike = await axios.delete(`/api/like/${likeId}/delete`);
    if (unlike.data.success === true) {
      await axios.put(`/api/reviews/${review.reviewId}/unlike`);
      let likeNum = +likes - 1;
      console.log(likeNum);
      setUserLike(false);
      setLikes(likeNum);
    } else {
      alert("There was an error, please try again later");
    }
  };

  const checkLikeState = async () => {
    if (currentUser) {
      const likeState = await axios.get(`/api/like/${review.reviewId}`);
      console.log(likeState.data.status);
      setUserLike(likeState.data.status);
      setLikeId(likeState.data.likeId);
    }
  };

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
    user &&
    (currentUser ? (
      !userLike ? (
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
                  <Card.Text>Likes: {likes}</Card.Text>
                  <Button onClick={handleLike}>Like</Button>
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
      ) : (
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
                  <Button onClick={handleUnlike}>Unlike</Button>
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
      )
    ) : (
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
    ))
  );
}

export default ReviewDetailsPage;
