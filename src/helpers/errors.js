const BridgeBodyNotValid = function (msg) {
  return new Error('BridgeBodyNotValid ' + msg)
}

const NoTaskIdError = function (msg) {
  return new Error('NoTaskIdError ' + msg)
}

const NoTriggerConfigError = function (msg) {
  return new Error('NoTriggerConfigError ' + msg)
}

const ServiceHashNotValidError = function (msg) {
  return new Error('ServiceHashNotValidError ' + msg)
}

module.exports = {
  BridgeBodyNotValid,
  NoTaskIdError,
  NoTriggerConfigError,
  ServiceHashNotValidError
}
