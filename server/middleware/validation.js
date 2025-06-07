const { createErrorResponse } = require('../utils/response');
const { logger } = require('../utils/logger');

/**
 * Validate query parameters
 */
const validateQuery = (allowedParams = []) => {
  return (req, res, next) => {
    try {
      const { query } = req;
      
      // Validate page parameter
      if (query.page !== undefined) {
        const page = parseInt(query.page);
        if (isNaN(page) || page < 1) {
          return res.status(400).json(createErrorResponse(
            'Page must be a positive integer',
            'INVALID_PAGE'
          ));
        }
        query.page = page;
      }
      
      // Validate limit parameter
      if (query.limit !== undefined) {
        const limit = parseInt(query.limit);
        if (isNaN(limit) || limit < 1 || limit > 50) {
          return res.status(400).json(createErrorResponse(
            'Limit must be between 1 and 50',
            'INVALID_LIMIT'
          ));
        }
        query.limit = limit;
      }
      
      // Validate category parameter
      if (query.category !== undefined) {
        const validCategories = ['news', 'finance', 'sport', 'otomotif', 'properti', 'travel', 'food', 'health', 'wolipop', 'inet', 'edu', 'hot'];
        if (!validCategories.includes(query.category)) {
          return res.status(400).json(createErrorResponse(
            `Invalid category. Valid categories: ${validCategories.join(', ')}`,
            'INVALID_CATEGORY'
          ));
        }
      }
      
      // Validate sortBy parameter
      if (query.sortBy !== undefined) {
        const validSortOptions = ['relevance', 'date', 'popularity'];
        if (!validSortOptions.includes(query.sortBy)) {
          return res.status(400).json(createErrorResponse(
            `Invalid sortBy option. Valid options: ${validSortOptions.join(', ')}`,
            'INVALID_SORT'
          ));
        }
      }
      
      // Validate date parameters
      if (query.dateFrom !== undefined) {
        const dateFrom = new Date(query.dateFrom);
        if (isNaN(dateFrom.getTime())) {
          return res.status(400).json(createErrorResponse(
            'Invalid dateFrom format. Use YYYY-MM-DD',
            'INVALID_DATE_FROM'
          ));
        }
      }
      
      if (query.dateTo !== undefined) {
        const dateTo = new Date(query.dateTo);
        if (isNaN(dateTo.getTime())) {
          return res.status(400).json(createErrorResponse(
            'Invalid dateTo format. Use YYYY-MM-DD',
            'INVALID_DATE_TO'
          ));
        }
      }
      
      // Validate search query
      if (query.q !== undefined) {
        if (typeof query.q !== 'string' || query.q.trim().length < 2) {
          return res.status(400).json(createErrorResponse(
            'Search query must be at least 2 characters long',
            'INVALID_QUERY'
          ));
        }
        query.q = query.q.trim();
      }
      
      next();
    } catch (error) {
      logger.error('Query validation error:', error);
      res.status(400).json(createErrorResponse(
        'Invalid query parameters',
        'VALIDATION_ERROR'
      ));
    }
  };
};

/**
 * Validate path parameters
 */
const validateParams = (requiredParams = []) => {
  return (req, res, next) => {
    try {
      const { params } = req;
      
      // Check required parameters
      for (const param of requiredParams) {
        if (!params[param]) {
          return res.status(400).json(createErrorResponse(
            `Missing required parameter: ${param}`,
            'MISSING_PARAMETER'
          ));
        }
      }
      
      // Validate category parameter
      if (params.category !== undefined) {
        const validCategories = ['news', 'finance', 'sport', 'otomotif', 'properti', 'travel', 'food', 'health', 'wolipop', 'inet', 'edu', 'hot'];
        if (!validCategories.includes(params.category)) {
          return res.status(400).json(createErrorResponse(
            `Invalid category. Valid categories: ${validCategories.join(', ')}`,
            'INVALID_CATEGORY'
          ));
        }
      }
      
      // Validate ID parameter
      if (params.id !== undefined) {
        if (typeof params.id !== 'string' || params.id.trim().length === 0) {
          return res.status(400).json(createErrorResponse(
            'Invalid ID parameter',
            'INVALID_ID'
          ));
        }
        params.id = params.id.trim();
      }
      
      next();
    } catch (error) {
      logger.error('Parameter validation error:', error);
      res.status(400).json(createErrorResponse(
        'Invalid path parameters',
        'VALIDATION_ERROR'
      ));
    }
  };
};

module.exports = {
  validateQuery,
  validateParams
};