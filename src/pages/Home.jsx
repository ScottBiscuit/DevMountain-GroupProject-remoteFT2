import React from 'react'
import { Card } from 'react-bootstrap'
import ReviewCarousel from '../components/ReviewCarousel'

export default function Home() {
  return (
    <>
      <Card className="text-center">
        {/* TODO add BG img */}
      <Card.Img src="../images/game_background.jpg" alt="Card image" className='opacity-50'/>
      <Card.ImgOverlay>
        {/* TODO pull top rated reviews into ReviewCarousel */}
        <ReviewCarousel />
        {/* TODO add Most Recent Posts Cards */}
      </Card.ImgOverlay>
      </Card>
    </>
  )
}
