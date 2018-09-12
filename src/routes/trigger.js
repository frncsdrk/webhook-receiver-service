const config = require('config'),
  express = require('express'),
  { exec } = require('child_process')

const helpers = {
  errors: require('./../helpers/errors'),
  respond: require('./../helpers/respond')
}
const logger = require('./../logger')
const bridgeConfig = config.get('service.bridge')
const serverConfig = config.get('service.server')
const triggerConfig = config.get('service.triggers')

const router = express.Router()

const validateBridgeBody = (req, res, next) => {
  if (req.body.id !== bridgeConfig.id || req.body.hash !== bridgeConfig.hash) {
    const err = new helpers.errors.BridgeBodyNotValid()
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

const validateTaskIdPresent = (req, res, next) => {
  if (!req.query.task_id) {
    const err = new helpers.errors.NoTaskIdError()
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

  if (!triggerConfig[req.query.task_id]) {
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
  // validate bridge body
  validateBridgeBody(req, res, next)
  /*
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
  */

  // id must be present
  // and corresponding trigger config present
  validateTaskIdPresent(req, res, next)

  const triggerId = req.query.task_id
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
