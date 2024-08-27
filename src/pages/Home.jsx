import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import ReviewCarousel from "../components/ReviewCarousel";
import HomeReviewsCards from "../components/HomeReviewsCards";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const [reviewsPop, setPeviewsPop] = useState(useLoaderData().reviewsPop);
  const [reviewsRecCr, setReviewsRecCr] = useState(
    useLoaderData().reviewsRecCr);
  const [reviewsRand, setReviewsRand] = useState(
      useLoaderData().reviewsRand);

  return (
    <Card className="vh-100">
      <Card.Img
        src="../images/bgportrait_beach.jpg"
        alt="beach with sun umbrellas"
        className="opacity-50 vh-100"
      />
      <Card.ImgOverlay>
        <ReviewCarousel 
          reviewsPop={reviewsPop} 
        />
        <HomeReviewsCards
          reviewsRecCr={reviewsRecCr}
          reviewsPop={reviewsPop} 
          reviewsRand={reviewsRand}
        />
      </Card.ImgOverlay>
    </Card>
  );
}
