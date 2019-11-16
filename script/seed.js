'use strict'
const axios = require('axios')
if (process.env.NODE_ENV !== 'production') require('../secrets')

const db = require('../server/db')
const {User, Business, Review, UpVote} = require('../server/db/models')

const RESTAURANTDATAURL = `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$$app_token=${
  process.env.DATATOKEN
}&$limit=350000&$where=zipcode IS NOT NULL AND dba IS NOT NULL AND boro IS NOT NULL AND building IS NOT NULL AND street IS NOT NULL AND latitude IS NOT NULL AND longitude IS NOT NULL`

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'cody', email: 'cody@email.com', password: '123'}),
    User.create({name: 'murphy', email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  let moreUsers = await User.bulkCreate(require('./mock_users'))
  console.log(`seeded ${moreUsers.length} more users.`)

  let restaurantApiResponse = await axios.get(RESTAURANTDATAURL)

  const formattedData = []

  restaurantApiResponse.data.forEach(element => {
    if (
      element.zipcode === 'N/A' ||
      !element.dba ||
      !element.boro ||
      !element.building ||
      !element.street ||
      !element.zipcode ||
      !element.latitude ||
      !element.longitude
    ) {
      console.log('skipping business')
      return
    }
    if (!element.zipcode) {
      console.log('no zip code here')
      console.log(element)
    }
    formattedData.push({
      name: element.dba,
      boro: element.boro,
      building: element.building,
      street: element.street,
      zipcode: element.zipcode,
      phone: element.phone,
      cuisine: element.cuisine_description,
      latitude: element.latitude,
      longitude: element.longitude
    })
  })

  console.log(`seeded ${users.length} users`)

  let phoneNumbers = []
  let uniqueRestaurants = formattedData.filter(element => {
    if (phoneNumbers.includes(element.phone)) {
      return false
    } else {
      phoneNumbers.push(element.phone)
      return true
    }
  })

  const businesses = await Business.bulkCreate(uniqueRestaurants)
  console.log(`seeded ${businesses.length} businesses`)

  let reviews = await Review.bulkCreate(require('./mock_reviews'))
  console.log(`seeded ${reviews.length} reviews`)

  let upvotes = await UpVote.bulkCreate(require('./mock_upvotes'))
  console.log(`seeded ${upvotes.length} upvotes`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
