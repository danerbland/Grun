const Sequelize = require('sequelize')
const db = require('../db')

const Review = require('./review')

const Business = db.define('business', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  boro: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Brooklyn', 'Manhattan', 'Queens', 'Bronx', 'Staten Island']]
    }
  },
  building: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zipcode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 99999
    }
  },
  phone: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      min: 1111111111,
      max: 9999999999
    }
  },
  cuisine: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.DECIMAL(8, 6),
    allowNull: false,
    validate: {
      min: -90,
      max: 90
    }
  },
  longitude: {
    type: Sequelize.DECIMAL(8, 6),
    allowNull: false,
    validate: {
      min: -90,
      max: 90
    }
  },
  website: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  compositeRating: {
    type: Sequelize.DECIMAL(3, 2),
    defaultValue: 0.0
  }
})

Business.prototype.updateCompositeRating = async function() {
  const reviews = await Review.findAll({
    where: {
      businessId: this.id
    }
  })
  const compositeRating =
    reviews.reduce((accumulator, element) => {
      return accumulator + parseInt(element.rating, 10)
    }, 0) / reviews.length
  this.compositeRating = compositeRating
  this.save()
}

module.exports = Business
