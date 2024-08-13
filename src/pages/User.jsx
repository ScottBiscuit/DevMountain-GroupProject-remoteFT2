import React from 'react';
import MyReviewsCards from '../components/MyReviewsCards';
import MyWishlist from '../components/MyWishlist';
import MyInfoCard from '../components/MyInfoCard'

export default function User() {
  
  return (
   <>
    <MyInfoCard />
    <MyReviewsCards />
    <MyWishlist />
   </>
  )
}
