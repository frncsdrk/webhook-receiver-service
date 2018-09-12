const config = require('config'),
  express = require('express'),
  { exec } = require('child_process')

const helpers = {
  errors: require('./../helpers/errors'),
  respond: require('./../helpers/respond')
}
const logger = require('./../logger')
const serverConfig = config.get('service.server')
const triggerConfig = config.get('service.triggers')

const router = express.Router()

const validateIdPresent = (req, res, next) => {
  if (!req.query.id) {
    const err = new helpers.errors.NoIdError()
    logger.log({
      level: 'error',
      message: err.message
    })
    return helpers.respond({
      err,
      next,
      res
    })
  }

  if (!triggerConfig[req.query.id]) {
    const err = new helpers.errors.NoTriggerConfigError()
    logger.log({
      level: 'error',
      message: err.message
    })
    return helpers.respond({
      err,
      next,
      res
    })
  }
}

router.post('/', (req, res, next) => {
  // validate hash
  if (serverConfig.hash) {
    const serviceHash = req.query.hash
    if (serviceHash !== serverConfig.hash) {
      const err = new helpers.errors.ServiceHashNotValidError(serviceHash)
      logger.log({
        level: 'error',
        message: err.message
      })
      return helpers.respond({
        err,
        next,
        res
      })
    }
  }

  // id must be present
  // and corresponding trigger config present
  validateIdPresent(req, res, next)

  const triggerId = req.query.id
  const triggerItem = triggerConfig[triggerId]
  exec(triggerItem.shell, (err, stdout, stderr) => {
    if (err) {
      logger.log({
        level: 'error',
        message: err.message
      })
      return helpers.respond({
        err,
        next,
        res
      })
    }
    logger.log({
      level: 'info',
      message: `Successfully executed shell command with id: ${ triggerId }; ${ triggerItem.shell }`
    })
  })

  return helpers.respond({
    data: {
      message: 'OK'
    },
    next,
    res
  })
})

module.exports = router
