import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import ReviewCarousel from "../components/ReviewCarousel";
import HomeReviewsCards from "../components/HomeReviewsCards";
import { useLoaderData } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";

export default function Home() {
  const [reviewsPop, setPeviewsPop] = useState(useLoaderData().reviewsPop);
  const [reviewsRecCr, setReviewsRecCr] = useState(
    useLoaderData().reviewsRecCr
  );

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
          setPeviewsPop={setPeviewsPop} />
        <HomeReviewsCards
          reviewsRecCr={reviewsRecCr}
          setReviewsRecCr={setReviewsRecCr}
          reviewsPop={reviewsPop} 
          setPeviewsPop={setPeviewsPop}
        />
        <ImageUploader />
      </Card.ImgOverlay>
    </Card>
  );
}
