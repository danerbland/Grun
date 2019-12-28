import React from 'react'
import {connect} from 'react-redux'
import Popup from 'reactjs-popup'

import './single-business-container.css'
import {ReviewForm} from '../reviews/review-form'
import {SingleBusinessDetailView} from './single-business-detail-view'
import {getSingleBusinessByIdThunkCreator} from '../../store/single-business'
import MapContainer from '../map-container'

class DisconnectedSingleBusinessContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      popup: false
    }
    this.getPageClassName = this.getPageClassName.bind(this)
    this.togglePopup = this.togglePopup.bind(this)
  }

  togglePopup = function() {
    this.setState(prevState => ({
      popup: !prevState.popup
    }))
  }

  getPageClassName = function() {
    return this.state.popup
      ? 'single-business-page-with-scrim'
      : 'single-business-page'
  }

  componentDidMount() {
    this.props.getBusiness(this.props.match.params.id)
  }

  render() {
    let businesses = [this.props.business]
    const initialCenter = {
      lat: +this.props.business.latitude,
      lng: +this.props.business.longitude
    }
    return (
      <div>
        {this.state.popup ? (
          <ReviewForm
            business={this.props.business}
            className="review"
            handleClose={this.togglePopup}
          />
        ) : null}
        <div className={this.getPageClassName()} data-scrim-top="5">
          <div className="single-business-left-panel">
            <SingleBusinessDetailView
              business={this.props.business}
              reviewButtonHandler={this.togglePopup}
            />
          </div>
          <div className="single-business-map-panel">
            <MapContainer
              businesses={businesses}
              initialCenter={initialCenter}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  business: state.singleBusiness
})

const mapDispatchToProps = dispatch => ({
  getBusiness: id => dispatch(getSingleBusinessByIdThunkCreator(id))
})

export const SingleBusinessContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedSingleBusinessContainer)
