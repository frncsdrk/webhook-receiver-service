const logger = require('./../logger')

module.exports = (conf) => {
  if (!conf) {
    return false
  }
  const data = conf.data,
    err = conf.err,
    next = conf.next
    res = conf.res,
    status = conf.status

  if (typeof next !== 'function') {
    return false
  }

  if (err) {
    logger.log({
      level: 'error',
      message: err.message
    })
    res.status(status || 400)
    res.send({
      message: err.message
    })
    return next()
  }

  res.status(status || 200)
  res.send(data)
  next()
}
