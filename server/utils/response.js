/**
 * Create standardized success response
 */
const createResponse = (data, message = 'Success', meta = {}) => {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
    ...meta
  };
};

/**
 * Create standardized error response
 */
const createErrorResponse = (message, code = 'ERROR', details = {}) => {
  return {
    success: false,
    error: {
      message,
      code,
      details
    },
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  createResponse,
  createErrorResponse
};