import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

export class SingleBusinessMapContainer extends React.Component {
  render() {
    const business = this.props.businesses[0]
    const {initialCenter} = this.props
    console.log('rendering. initialCenter: ', initialCenter)
    console.log(
      'rendering. lat & lng types: ',
      typeof initialCenter.lat,
      typeof initialCenter.lng
    )
    if (
      initialCenter &&
      !isNaN(initialCenter.lat) &&
      !isNaN(initialCenter.lng)
    ) {
      return (
        <Map google={this.props.google} initialCenter={initialCenter} zoom={14}>
          <Marker
            title={business.name}
            name={business.name}
            position={initialCenter}
          />
        </Map>
      )
    } else {
      return <div>Aieee something went wrong with the coordinates!</div>
    }
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.GOOGLEMAPSAPIKEY
})(SingleBusinessMapContainer)
