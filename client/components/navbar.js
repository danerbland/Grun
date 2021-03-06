import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="nav-container">
    <Link to="/">
      <h1 className="nav-header">G R U N</h1>
    </Link>
    <div className="divider" />
    <h3 className="nav-sub-header">Eat. Better.</h3>
    <div className="nav-menu">
      <Link to="/queens">Queens</Link>
      <Link to="/brooklyn">Brooklyn</Link>
      <Link to="/manhattan">Manhattan</Link>
      <Link to="/bronx">Bronx</Link>
      <Link to="/statenIsland">Staten Island</Link>
    </div>

    <nav className="login-nav">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
