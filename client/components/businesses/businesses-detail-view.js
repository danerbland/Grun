import React from 'react'

import {BusinessListItem} from './business-list-item'

export const BusinessesDetailView = props => {
  const businesses = props.businesses

  return (
    <div>
      <h3>Top Businesses</h3>
      <div className="businesses-list">
        {businesses.map((business, index) => {
          return (
            <BusinessListItem
              key={business.id}
              business={business}
              index={index}
            />
          )
        })}
      </div>
    </div>
  )
}
