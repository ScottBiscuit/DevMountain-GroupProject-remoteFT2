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
    <Card className="m-2 p-2 bg-secondary-subtle">
        <ReviewCarousel 
          reviewsPop={reviewsPop} 
        />
        <HomeReviewsCards
          reviewsRecCr={reviewsRecCr}
          reviewsPop={reviewsPop} 
          reviewsRand={reviewsRand}
        />
    </Card>
  );
}
