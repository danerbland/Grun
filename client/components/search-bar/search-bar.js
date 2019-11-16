import React from 'react'
import {connect} from 'react-redux'

import getBusinessesByNameThunkCreator from '../store/search-bar-businesses'

class DisconnectedSearchBar extends React.Component {}

mapStateToProps = state => ({
  businesses: state.searchBarBusinesses
})
mapDispatchToProps = dispatch => ({
  getBusinesses: name => dispatch(getBusinessesByNameThunkCreator(name))
})

export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSearchBar
)
