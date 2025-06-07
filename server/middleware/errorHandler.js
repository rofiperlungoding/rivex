const { logger } = require('../utils/logger');
const { createErrorResponse } = require('../utils/response');

/**
 * Not found middleware
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

/**
 * Error handling middleware
 */
const errorHandler = (error, req, res, next) => {
  // Log error details
  logger.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  // Determine status code
  let statusCode = error.status || error.statusCode || 500;
  
  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
  } else if (error.name === 'CastError') {
    statusCode = 400;
  } else if (error.code === 'ECONNREFUSED') {
    statusCode = 503;
  } else if (error.code === 'ETIMEDOUT') {
    statusCode = 504;
  }
  
  // Determine error message
  let message = error.message || 'Internal Server Error';
  let code = error.code || 'INTERNAL_ERROR';
  
  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal Server Error';
    code = 'INTERNAL_ERROR';
  }
  
  // Create error response
  const errorResponse = createErrorResponse(message, code, {
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = error.stack;
  }
  
  res.status(statusCode).json(errorResponse);
};

module.exports = {
  notFound,
  errorHandler
};