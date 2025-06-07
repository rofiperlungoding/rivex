const { DetikNewsAPI } = require('../services/detikNewsService');
const { logger } = require('../utils/logger');
const { createResponse, createErrorResponse } = require('../utils/response');
const { validateDateRange, sanitizeQuery } = require('../utils/validation');

const detikAPI = new DetikNewsAPI();

/**
 * Get latest Indonesian news articles
 */
const getLatestNews = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category } = req.query;
    
    logger.info(`Fetching latest news - Page: ${page}, Limit: ${limit}, Category: ${category || 'all'}`);
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      category: category || undefined
    };
    
    const result = await detikAPI.getLatestNews(options);
    
    logger.info(`Successfully fetched ${result.articles.length} articles`);
    
    res.json(createResponse(result, 'Latest news retrieved successfully'));
  } catch (error) {
    logger.error('Error fetching latest news:', error);
    next(error);
  }
};

/**
 * Get news articles by category
 */
const getNewsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20, dateFrom, dateTo } = req.query;
    
    // Validate date range if provided
    if (dateFrom || dateTo) {
      const dateValidation = validateDateRange(dateFrom, dateTo);
      if (!dateValidation.valid) {
        return res.status(400).json(createErrorResponse(
          dateValidation.error,
          'INVALID_DATE_RANGE'
        ));
      }
    }
    
    logger.info(`Fetching news by category - Category: ${category}, Page: ${page}, Limit: ${limit}`);
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      dateFrom,
      dateTo
    };
    
    const result = await detikAPI.getNewsByCategory(category, options);
    
    logger.info(`Successfully fetched ${result.articles.length} articles for category: ${category}`);
    
    res.json(createResponse(result, `News for category '${category}' retrieved successfully`));
  } catch (error) {
    logger.error(`Error fetching news by category ${req.params.category}:`, error);
    next(error);
  }
};

/**
 * Search Indonesian news articles
 */
const searchNews = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 20, category, sortBy = 'relevance', dateFrom, dateTo } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json(createErrorResponse(
        'Search query must be at least 2 characters long',
        'INVALID_QUERY'
      ));
    }
    
    // Sanitize search query
    const sanitizedQuery = sanitizeQuery(q);
    
    // Validate date range if provided
    if (dateFrom || dateTo) {
      const dateValidation = validateDateRange(dateFrom, dateTo);
      if (!dateValidation.valid) {
        return res.status(400).json(createErrorResponse(
          dateValidation.error,
          'INVALID_DATE_RANGE'
        ));
      }
    }
    
    logger.info(`Searching news - Query: "${sanitizedQuery}", Page: ${page}, Limit: ${limit}`);
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      category,
      sortBy,
      dateFrom,
      dateTo
    };
    
    const result = await detikAPI.searchNews(sanitizedQuery, options);
    
    logger.info(`Search completed - Found ${result.totalResults} articles for query: "${sanitizedQuery}"`);
    
    res.json(createResponse(result, `Search results for "${sanitizedQuery}" retrieved successfully`));
  } catch (error) {
    logger.error(`Error searching news with query "${req.query.q}":`, error);
    next(error);
  }
};

/**
 * Get a specific news article by ID
 */
const getNewsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    logger.info(`Fetching article by ID: ${id}`);
    
    const article = await detikAPI.getArticleById(id);
    
    if (!article) {
      return res.status(404).json(createErrorResponse(
        `Article with ID '${id}' not found`,
        'ARTICLE_NOT_FOUND'
      ));
    }
    
    logger.info(`Successfully fetched article: ${article.title}`);
    
    res.json(createResponse(article, 'Article retrieved successfully'));
  } catch (error) {
    logger.error(`Error fetching article by ID ${req.params.id}:`, error);
    next(error);
  }
};

module.exports = {
  getLatestNews,
  getNewsByCategory,
  searchNews,
  getNewsById
};