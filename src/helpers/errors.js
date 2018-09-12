const NoTriggerConfigError = function (msg) {
  return new Error('NoTriggerConfigError ' + msg)
}

const ServiceHashNotValidError = function (msg) {
  return new Error('ServiceHashNotValidError ' + msg)
}

module.exports = {
  NoTriggerConfigError,
  ServiceHashNotValidError
}
