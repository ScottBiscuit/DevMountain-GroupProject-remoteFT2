import React from 'react'
import { Card } from 'react-bootstrap'
import ReviewCarousel from '../components/ReviewCarousel'

export default function Home() {
  return (
    <>
      <Card className="text-center">
      <Card.Img src="../images/game_background.jpg" alt="Card image" className='opacity-50'/>
      <Card.ImgOverlay>
        <ReviewCarousel />
      </Card.ImgOverlay>
      </Card>
    </>
  )
}
