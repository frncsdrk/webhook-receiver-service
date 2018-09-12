const config = require('config'),
  fs = require('fs')
  winston = require('winston')

const loggerConfig = config.get('service.server.logger')

// ensure logs directory exists
if (!fs.existsSync(loggerConfig.logs_path)) {
  fs.mkdirSync(loggerConfig.logs_path);
}

module.exports = winston.createLogger({
  level: 'info',
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: loggerConfig.logs_path + loggerConfig.error_log_file,
      level: 'error',
      timestamp: true
    }),
    new winston.transports.File({
      filename: loggerConfig.logs_path + loggerConfig.combined_log_file,
      timestamp: true
    })
  ]
})
