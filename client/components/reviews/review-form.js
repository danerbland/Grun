import React from 'react'
import Axios from 'axios'

import './review-form.css'

const initialState = {
  rating: 0,
  description: ''
}

export class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    console.log('in constructor. props: ', props)
    this.state = {
      ...initialState,
      business: props.business
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
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

    console.log('this.props: ', this.props)

    const businessName = this.state.business.name
    const businessScore = this.state.business.compositeRating

    return (
      <div className="review-form-container">
        <form onSubmit={this.onSubmit} className="review-form">
          <h3 className="business-header">
            {businessName} {businessScore}
          </h3>
          <div className="rating-row">
            <h4>Rating: </h4>
          </div>
          <div className="review-row">
            <h4>Review: </h4>
            <input
              type="text"
              name="description"
              autoComplete="off"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" disabled={!isSubmittable}>
            Submit
          </button>
        </form>
        <button onClick={this.props.handleClose} className="close-button">
          close
        </button>
      </div>
    )
  }
}
