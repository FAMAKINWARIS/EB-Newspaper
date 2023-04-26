import log4js from "log4js";

// configure log4js
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: 'logs/app.log' }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'info' }
  }
});

// create logger object
const logger = log4js.getLogger('app');

export default { logger };
