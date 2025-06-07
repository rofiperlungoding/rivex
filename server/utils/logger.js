const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Simple logger utility
 */
class Logger {
  constructor() {
    this.logFile = path.join(logsDir, 'app.log');
    this.errorFile = path.join(logsDir, 'error.log');
  }
  
  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaString = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}\n`;
  }
  
  writeToFile(filename, content) {
    try {
      fs.appendFileSync(filename, content);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }
  
  info(message, meta = {}) {
    const formatted = this.formatMessage('info', message, meta);
    console.log(formatted.trim());
    this.writeToFile(this.logFile, formatted);
  }
  
  warn(message, meta = {}) {
    const formatted = this.formatMessage('warn', message, meta);
    console.warn(formatted.trim());
    this.writeToFile(this.logFile, formatted);
  }
  
  error(message, meta = {}) {
    const formatted = this.formatMessage('error', message, meta);
    console.error(formatted.trim());
    this.writeToFile(this.logFile, formatted);
    this.writeToFile(this.errorFile, formatted);
  }
  
  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      const formatted = this.formatMessage('debug', message, meta);
      console.debug(formatted.trim());
      this.writeToFile(this.logFile, formatted);
    }
  }
}

const logger = new Logger();

module.exports = { logger };