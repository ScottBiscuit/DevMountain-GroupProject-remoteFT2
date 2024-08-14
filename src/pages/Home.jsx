import React from 'react'
import { Card, Container } from 'react-bootstrap'
import ReviewCarousel from '../components/ReviewCarousel';
import RecentReviewsCards from '../components/RecentReviewsCards';

export default function Home() {

  return (
  
      <Card className='h-100'>
      <Card.Img src="../images/world_map_pins.jpg" alt="World map with location pins" className='opacity-50 vh-100' />
      <Card.ImgOverlay>
        <ReviewCarousel />
        <RecentReviewsCards />
      </Card.ImgOverlay>
      </Card>
  )
}
