import { useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import ReviewCarousel from '../components/ReviewCarousel';
import RecentReviewsCards from '../components/RecentReviewsCards';
import { useLoaderData } from 'react-router-dom';

export default function Home() {
  const [reviews, setReviews] = useState(useLoaderData().reviews);

  return (
  
      <Card className='h-100'>
      <Card.Img src="../images/world_map_pins.jpg" alt="World map with location pins" className='opacity-50 vh-100' />
      <Card.ImgOverlay>
        <ReviewCarousel 
          reviews={reviews} 
          setReviews={setReviews}
        />
        <RecentReviewsCards />
      </Card.ImgOverlay>
      </Card>
  )
}
