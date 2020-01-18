import React from 'react'

import './star-rater.css'

const faceArr = [
  '../assets/icons/neutral.png',
  '../assets/icons/angry.png',
  '../assets/icons/annoyed.png',
  '../assets/icons/neutral.png',
  '../assets/icons/smile.png',
  '../assets/icons/delighted.png'
]

export class StarRater extends React.Component {
  constructor(props) {
    super()
    this.state = {
      highlighted: props.rating
    }
    this.mouseOverHandler = this.mouseOverHandler.bind(this)
    this.mouseOutHandler = this.mouseOutHandler.bind(this)
  }

  mouseOverHandler(highlighted) {
    this.setState({
      highlighted: highlighted
    })
  }

  mouseOutHandler() {
    console.log('mouseOutHandler fired')
    this.setState({
      highlighted: this.props.rating
    })
  }

  render() {
    console.log('rendering starRater. Rating: ', this.props.rating)

    let starArr = []
    for (let i = 1; i < 6; i++) {
      const src =
        i <= this.state.highlighted
          ? '../assets/icons/star-xxl.png'
          : '../assets/icons/star-5-xxl.png'
      starArr.push(
        <img
          src={src}
          className="star-icon"
          onMouseOver={() => this.mouseOverHandler(i)}
          onMouseOut={() => this.mouseOutHandler()}
          onClick={() => this.props.setRating(i)}
        />
      )
    }

    return (
      <div className="star-rater">
        {starArr.map(star => star)}
        {<img src={faceArr[this.state.highlighted]} className="face-icon" />}
      </div>
    )
  }
}
