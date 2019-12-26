import axios from 'axios'

const GET_BUSINESSES = 'GET_BUSINESSES'
const CLEAR_BUSINESSES = 'CLEAR_BUSINESSES'

const getBusinessesActionCreator = businesses => {
  return {
    type: GET_BUSINESSES,
    businesses
  }
}

export const clearBusinessesActionCreator = () => {
  return {
    type: CLEAR_BUSINESSES
  }
}

export const getBusinessesByNameThunkCreator = name => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/businesses/name/${name}`)
      dispatch(getBusinessesActionCreator(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(searchBarBusinesses = [], action) {
  switch (action.type) {
    case GET_BUSINESSES:
      return action.businesses
    case CLEAR_BUSINESSES:
      return []
    default:
      return searchBarBusinesses
  }
}
