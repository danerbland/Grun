import React from 'react'

export const ReviewListItem = props => {
  const review = props.review
  const user = review.user
  return (
    <div>
      <h4>{user.name}</h4>
      <h5>{review.rating}</h5>
      <h6>{review.description}</h6>
    </div>
  )
}
