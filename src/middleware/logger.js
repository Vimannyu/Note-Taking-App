const winston = require('winston');
const { format } = require('winston');


const logConfiguration = {
  transports: [
    new winston.transports.Console({
      level: 'info', 
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.simple()
      )
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error', // Logs errors to this file
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
};


const logger = winston.createLogger(logConfiguration);

module.exports = logger;
