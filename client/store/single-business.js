import axios from 'axios'

const GET_SINGLE_BUSINESS = 'GET_SINGLE_BUSINESS'

const getSingleBusinessActionCreator = business => {
  return {
    type: GET_SINGLE_BUSINESS,
    business
  }
}

export const getSingleBusinessByIdThunkCreator = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/businesses/${id}`)
      dispatch(getSingleBusinessActionCreator(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(singleBusiness = {reviews: []}, action) {
  switch (action.type) {
    case GET_SINGLE_BUSINESS:
      return action.business
    default:
      return singleBusiness
  }
}
