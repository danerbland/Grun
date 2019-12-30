import React from 'react'

import './search-bar-business-list-item.css'

export const SearchBarBusinessListItem = props => {
  let business = props.business

  return (
    <div className="business-list-item">
      <span>
        <h3 className="business-list-name">{business.name}</h3>
      </span>
      <span>
        <h4 className="business-list-address">
          {business.building} {business.street}
        </h4>
      </span>
    </div>
  )
}
