import React from 'react'

import SearchBarBusinessListItem from './search-bar-business-list-item'

export const SearchBarBusinessList = props => {
  let businesses = props.business

  return (
    <div>
      {businesses.map(business => {
        return (
          <SearchBarBusinessListItem key={business.id} business={business} />
        )
      })}
    </div>
  )
}
