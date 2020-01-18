import React from 'react'
import {connect} from 'react-redux'

import './search-bar.css'
import {SearchBarBusinessList} from './search-bar-business-list'
import {
  getBusinessesByNameThunkCreator,
  clearBusinessesActionCreator
} from '../../store/search-bar-businesses'

class DisconnectedSearchBar extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({name: event.target.value})
    if (event.target.value.length > 2) {
      this.props.getBusinesses(event.target.value)
    } else {
      this.props.clearBusinesses()
    }
  }

  render() {
    return (
      <div className="search-bar">
        <label>Find A Restaurant</label>
        <div className="search-bar-container">
          <form autoComplete="off" className="search-bar-form">
            <input
              type="text"
              name="name"
              className="search-bar-input"
              placeholder="Restaurant Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </form>
        </div>
        <SearchBarBusinessList businesses={this.props.businesses} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  businesses: state.searchBarBusinesses
})
const mapDispatchToProps = dispatch => ({
  getBusinesses: name => dispatch(getBusinessesByNameThunkCreator(name)),
  clearBusinesses: () => dispatch(clearBusinessesActionCreator())
})

export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSearchBar
)
