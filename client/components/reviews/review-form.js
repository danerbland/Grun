import React from 'react'
import Axios from 'axios'

import {StarRater} from './star-rater'
import './review-form.css'

const initialState = {
  rating: 0,
  description: ''
}

export class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
      business: props.business
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setRating = this.setRating.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  setRating(rating) {
    this.setState({
      rating: rating
    })
  }

  async handleSubmit(event) {
    try {
      const {data} = await Axios.post('/api/reviews', data)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const isSubmittable =
      this.state.rating !== 0 && this.state.description.length !== 0
    const businessName = this.state.business.name
    const businessScore = this.state.business.compositeRating

    return (
      <div className="review-container">
        <div className="review-form-container">
          <form onSubmit={this.onSubmit} className="review-form">
            <h3 className="business-header">
              {businessName} {businessScore}
            </h3>
            <div className="rating-row">
              <h4>Rating: </h4>
              <StarRater
                setRating={this.setRating}
                rating={this.state.rating}
              />
            </div>
            <div className="review-column">
              <h4>Review: </h4>
              <textarea
                type="text"
                name="description"
                autoComplete="off"
                className="description-input"
                value={this.state.description}
                onChange={this.handleChange}
              />
              <button type="submit" disabled={!isSubmittable}>
                Submit
              </button>
            </div>
          </form>
          <button onClick={this.props.handleClose} className="close-button">
            close
          </button>
        </div>
      </div>
    )
  }
}
