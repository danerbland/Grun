import React from 'react'

import {ReviewListItem} from './review-list-item'

export const SingleBusinessDetailView = props => {
  const business = props.business
  const reviews = business.reviews

  return (
    <div>
      <h2>{business.name}</h2>
      <h4>{business.cuisine}</h4>
      <div className="divider" />
      <h3>Reviews</h3>
      <div className="reviews-list">
        {reviews.map(review => {
          return <ReviewListItem key={review.id} review={review} />
        })}
      </div>
    </div>
  )
}
