const Sequelize = require('sequelize')
const db = require('../db')
//const Business = require('./business')

const Review = db.define('review', {
  rating: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['1', '2', '3', '4', '5']]
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Review.afterCreate(async (review, options) => {
  const Business = require('./business')
  const id = review.dataValues.businessId
  const business = await Business.findOne({
    where: {
      id: id
    }
  })
  console.dir(business)
  business.updateCompositeRating()
})

module.exports = Review
