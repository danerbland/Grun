const Sequelize = require('sequelize')
const db = require('../db')

const UpVote = db.define('upvote', {})

module.exports = UpVote
