import React from 'react'
import {connect} from 'react-redux'
import {BusinessesDetailView} from './businesses-detail-view'
import {getBusinessesByBoroThunkCreator} from '../../store/businesses'
import MapContainer from '../map-container'

class DisconnectedBusinessesContainer extends React.Component {
  componentDidMount() {
    this.props.getBusinesses(this.props.boro)
  }

  render() {
    let businesses = this.props.businesses
    const initialCenter = {
      lat: this.props.lat,
      lng: this.props.lng
    }
    return (
      <div className="businesses-page">
        <div className="businesses-left-panel">
          <BusinessesDetailView businesses={this.props.businesses} />
        </div>
        <div className="map-panel">
          <MapContainer businesses={businesses} initialCenter={initialCenter} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  businesses: state.businesses
})

const mapDispatchToProps = dispatch => ({
  getBusinesses: boro => dispatch(getBusinessesByBoroThunkCreator(boro))
})

export const BusinessesContainer = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedBusinessesContainer
)
