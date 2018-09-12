const express = require('express')

const helpers = {
  errors: require('./../helpers/errors'),
  respond: require('./../helpers/respond')
}
const logger = require('./../logger')

const router = express.Router()

router.get('/', (req, res, next) => {
  return helpers.respond({
    data: {
      message: 'OK'
    },
    next,
    res
  })
})

module.exports = router
