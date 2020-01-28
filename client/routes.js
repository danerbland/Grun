import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SingleBusinessContainer,
  SearchBar,
  BusinessesContainer
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    let boroCoords = {
      manhattan: {
        lat: 40.7832,
        lng: -73.9712
      },
      brooklyn: {
        lat: 40.6782,
        lng: -73.9442
      },
      queens: {
        lat: 40.7282,
        lng: -73.7949
      },
      statenIsland: {
        lat: 40.5795,
        lng: -74.1502
      },
      bronx: {
        lat: 40.8448,
        lng: -73.8648
      }
    }

    return (
      <div className="router-container">
        <Switch>
          {/* Routes placed here are available to all visitors */}

          <Route
            path="/manhattan"
            render={props => (
              <BusinessesContainer
                {...props}
                boro="manhattan"
                lat={boroCoords.manhattan.lat}
                lng={boroCoords.manhattan.lng}
              />
            )}
          />
          <Route
            path="/brooklyn"
            render={props => (
              <BusinessesContainer
                {...props}
                boro="brooklyn"
                lat={boroCoords.brooklyn.lat}
                lng={boroCoords.brooklyn.lng}
              />
            )}
          />
          <Route
            path="/queens"
            render={props => (
              <BusinessesContainer
                {...props}
                boro="queens"
                lat={boroCoords.queens.lat}
                lng={boroCoords.queens.lng}
              />
            )}
          />
          <Route
            path="/bronx"
            render={props => (
              <BusinessesContainer
                {...props}
                boro="bronx"
                lat={boroCoords.bronx.lat}
                lng={boroCoords.bronx.lng}
              />
            )}
          />
          <Route
            path="/statenIsland"
            render={props => (
              <BusinessesContainer
                {...props}
                boro="statenIsland"
                lat={boroCoords.statenIsland.lat}
                lng={boroCoords.statenIsland.lng}
              />
            )}
          />

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/businesses/:id" component={SingleBusinessContainer} />
          <Route component={SearchBar} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
          )}
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
