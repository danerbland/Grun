import React from 'react'
import {connect} from 'react-redux'
import {SingleBusinessDetailView} from './single-business-detail-view'
import {getSingleBusinessByIdThunkCreator} from '../../store/single-business'
import SingleBusinessMapContainer from './single-business-map-container'

class DisconnectedSingleBusinessContainer extends React.Component {
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
      <div className="single-business-page">
        <div className="single-business-left-panel">
          <SingleBusinessDetailView business={this.props.business} />
        </div>
        <div className="single-business-map-panel">
          <SingleBusinessMapContainer
            businesses={businesses}
            initialCenter={initialCenter}
          />
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
