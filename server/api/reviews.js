const router = require('express').Router()
const op = require('sequelize').Op

const {Review} = require('../db/models')
const {Business} = require('../db/models')
const {User} = require('../db/models')

module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User
        },
        {
          model: Business
        }
      ]
    })

    res.json(review)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //If user is logged in, post their review.  Otherwise, redirect them to the login page.
    if (req.user) {
      const userId = req.user.id
      const {rating, description, businessId} = req.body
      const review = await Review.create({
        rating,
        description,
        userId,
        businessId
      })
      res.json(review)
    } else {
      throw 'user is not logged in!'
    }
  } catch (error) {
    next(error)
  }
})
