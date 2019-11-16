import axios from 'axios'

const GET_BUSINESSES = 'GET_BUSINESSES'

const getBusinessesActionCreator = businesses => {
  return {
    type: GET_BUSINESSES,
    businesses
  }
}

export const getBusinessesByBoroThunkCreator = boro => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/businesses/${boro}`)
      dispatch(getBusinessesActionCreator(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getBusinessesByLatLngRadiusThunkCreator = (lat, lng, radius) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/businesses/?lat=${lat}&lng=${lng}&radius=${radius}`
      )
      dispatch(getBusinessesActionCreator(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(businesses = [], action) {
  switch (action.type) {
    case GET_BUSINESSES:
      return action.businesses
    default:
      return businesses
  }
}
