import React from 'react'
import {Link} from 'react-router-dom'

export const BusinessListItem = props => {
  const business = props.business
  const index = props.index

  return (
    <div>
      <Link to={`/businesses/${business.id}`}>
        <h2 className="inline-header">{index + 1}. </h2>
        <h4 className="inline-header">{business.name}</h4>
      </Link>
    </div>
  )
}
