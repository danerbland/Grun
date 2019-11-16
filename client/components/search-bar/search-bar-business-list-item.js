import React from 'react'

export const SearchBarBusinessListItem = props => {
  let business = props.business

  return (
    <div>
      <span>
        <h3>{business.name}</h3>
      </span>
      <span>
        <h4>
          {business.building} {business.street}
        </h4>
      </span>
    </div>
  )
}
