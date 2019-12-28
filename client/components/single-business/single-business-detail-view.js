import React from 'react'

import {ReviewListItem} from './review-list-item'

export const SingleBusinessDetailView = props => {
  const business = props.business
  const reviews = business.reviews

  return (
    <div>
      <h2>
        {business.name} {business.compositeRating}
      </h2>
      <button className="review-button" onClick={props.reviewButtonHandler}>
        Leave Reveiw
      </button>
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
