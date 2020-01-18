import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends React.Component {
  render() {
    const businesses = this.props.businesses
    const {initialCenter} = this.props
    if (
      initialCenter &&
      !isNaN(initialCenter.lat) &&
      !isNaN(initialCenter.lng)
    ) {
      return (
        <Map
          containerStyle={{width: '75%', height: '75%'}}
          google={this.props.google}
          initialCenter={initialCenter}
          zoom={12}
        >
          {businesses.map(business => {
            const latlng = {
              lat: business.latitude,
              lng: business.longitude
            }
            return (
              <Marker
                key={business.id}
                title={business.name}
                name={business.name}
                position={latlng}
              />
            )
          })}
        </Map>
      )
    } else {
      return <div>Aieee something went wrong with the coordinates!</div>
    }
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.GOOGLEMAPSAPIKEY
})(MapContainer)
