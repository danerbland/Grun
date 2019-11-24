const router = require('express').Router()
const Op = require('sequelize').Op

const {Business} = require('../db/models')
const {Review} = require('../db/models')
const {User} = require('../db/models')
module.exports = router

router.get('/brooklyn', async (req, res, next) => {
  try {
    const businesses = await Business.findAll({
      limit: 20,
      where: {
        boro: 'Brooklyn'
      }
    })
    res.json(businesses)
  } catch (error) {
    next(error)
  }
})

router.get('/queens', async (req, res, next) => {
  try {
    const businesses = await Business.findAll({
      limit: 20,
      where: {
        boro: 'Queens'
      }
    })
    res.json(businesses)
  } catch (error) {
    next(error)
  }
})

router.get('/manhattan', async (req, res, next) => {
  try {
    const businesses = await Business.findAll({
      limit: 20,
      where: {
        boro: 'Manhattan'
      }
    })
    res.json(businesses)
  } catch (error) {
    next(error)
  }
})

router.get('/bronx', async (req, res, next) => {
  try {
    const businesses = await Business.findAll({
      limit: 20,
      where: {
        boro: 'Bronx'
      }
    })
    res.json(businesses)
  } catch (error) {
    next(error)
  }
})

router.get('/statenisland', async (req, res, next) => {
  try {
    const businesses = await Business.findAll({
      limit: 20,
      where: {
        boro: 'Staten Island'
      }
    })
    res.json(businesses)
  } catch (error) {
    next(error)
  }
})

//format for this route: api/businesses/latlng?lat=40.34&lng=-74.1&radius=2
router.get('/latlng', async (req, res, next) => {
  try {
    const lat = req.query.lat
    const lng = req.query.lng
    const radius = req.query.radius
    const businesses = await Business.findAll({
      where: {
        latitude: {
          [Op.between]: [+lat - 0.01 * radius, +lat + 0.01 * radius]
        },
        longitude: {
          [Op.between]: [+lng - 0.01 * radius, +lng + 0.01 * radius]
        }
      }
    })
    res.json(businesses)
  } catch (error) {
    next(error)
  }
})

//for use in search bar lookahead
router.get('/name/:name', async (req, res, next) => {
  try {
    let businesses = await Business.findAll({
      attributes: ['id', 'name', 'building', 'street'],
      limit: 10,
      where: {
        name: {
          [Op.iLike]: req.params.name + '%'
        }
      }
    })
    res.json(businesses)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const business = await Business.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Review,
          include: User
        }
      ]
    })
    res.json(business)
  } catch (error) {
    next(error)
  }
})
