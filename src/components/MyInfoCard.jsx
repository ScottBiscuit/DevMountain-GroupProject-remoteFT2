import React from 'react'

export default function MyInfoCard() {
  // TODO function reviewNum that pulls number of reviews made by user

  return (
    <>
    <div>MyInfo</div>
    <>{userImageSrc}</>
    {/* TODO do we need userImageDesc? the alt text should just show that it's a user profile pic */}
    <>{username}</>
    <>{email}</>
    <>Change password?</>
    <>Number of reviews: {reviewNum}</>

    </>
  )
}
