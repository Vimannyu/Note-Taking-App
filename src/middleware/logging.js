// logger.js

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

let logEnabled = true;
let logStream = null;

function setLogEnabled(enabled) {
  logEnabled = enabled;
}

function initLogStream() {
  if (!logEnabled) return;

  logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });
}

function closeLogStream() {
  if (!logEnabled) return;

  logStream.end();
}

function logger() {
  if (!logEnabled) {
    return (req, res, next) => {
      next();
    };
  }

  // Use the 'combined' format or customize it as per your needs
  const morganLogger = morgan('combined', { stream: logStream });

  return morganLogger;
}

module.exports = {
  logger,
  setLogEnabled,
  initLogStream,
  closeLogStream,
};
