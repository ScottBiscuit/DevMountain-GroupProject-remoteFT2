import React from 'react'
import { Card } from 'react-bootstrap'
import ReviewCarousel from '../components/ReviewCarousel';
import RecentReviewsCards from '../components/RecentReviewsCards';

export default function Home() {
  return (
    <>
      <Card>
        {/* TODO add BG img */}
      <Card.Img src="../images/game_background.jpg" alt="Card image" className='opacity-50'/>
      <Card.ImgOverlay>
        {/* TODO pull top rated reviews into ReviewCarousel */}
        <ReviewCarousel />
        {/* TODO add Most Recent Posts Cards */}
        <RecentReviewsCards />
      </Card.ImgOverlay>
      </Card>
    </>
  )
}
