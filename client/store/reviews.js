import axois from 'axois'

export const postReviewThunkCreator = data => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/reviews', data)
    } catch (error) {
      console.error(error)
    }
  }
}
