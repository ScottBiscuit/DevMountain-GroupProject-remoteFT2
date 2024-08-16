import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import ReviewCarousel from "../components/ReviewCarousel";
import RecentReviewsCards from "../components/RecentReviewsCards";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const [reviewsPop, setPeviewsPop] = useState(useLoaderData().reviewsPop);
  const [reviewsRecCr, setReviewsRecCr] = useState(
    useLoaderData().reviewsRecCr
  );

  return (
    <Card className="h-100">
      <Card.Img
        src="../images/world_map_pins.jpg"
        alt="World map with location pins"
        className="opacity-50 vh-100"
      />
      <Card.ImgOverlay>
        <ReviewCarousel reviewsPop={reviewsPop} setPeviewsPop={setPeviewsPop} />
        <RecentReviewsCards
          reviewsRecCr={reviewsRecCr}
          setReviewsRecCr={setReviewsRecCr}
        />
      </Card.ImgOverlay>
    </Card>
  );
}
