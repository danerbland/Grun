import React from 'react'
import {Link} from 'react-router-dom'

import {SearchBarBusinessListItem} from './search-bar-business-list-item'

export const SearchBarBusinessList = props => {
  let businesses = props.businesses
  return (
    <div>
      {businesses.map(business => {
        return (
          <Link key={business.id} to={`/businesses/${business.id}`}>
            <SearchBarBusinessListItem business={business} />
          </Link>
        )
      })}
    </div>
  )
}
