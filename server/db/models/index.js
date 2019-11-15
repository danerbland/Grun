const User = require('./user')
const Business = require('./business')
const Review = require('./review')
const UpVote = require('./upvote')
const Badge = require('./badge')

Review.belongsTo(User)
Review.belongsTo(Business)

UpVote.hasOne(User)
UpVote.hasOne(Review)

Badge.belongsToMany(Business, {as: 'businesses', through: 'businessbadges'})
Business.belongsToMany(Badge, {as: 'badges', through: 'businessbadges'})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Business,
  Review,
  UpVote,
  Badge
}
