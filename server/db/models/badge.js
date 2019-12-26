const Sequelize = require('sequelize')
const db = require('../db')

const Badge = db.define('badge', {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,

    validate: {
      notEmpty: true
    }
  }
})

module.exports = Badge
