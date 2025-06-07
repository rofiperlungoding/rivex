const express = require('express');
const { getLatestNews, getNewsByCategory, searchNews, getNewsById } = require('../controllers/newsController');
const { validateQuery, validateParams } = require('../middleware/validation');
const { cacheMiddleware } = require('../middleware/cache');

const router = express.Router();

/**
 * @swagger
 * /api/news/latest:
 *   get:
 *     summary: Get latest Indonesian news articles
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 20
 *         description: Number of articles per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [news, finance, sport, otomotif, properti, travel, food, health, wolipop, inet, edu, hot]
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: Successfully retrieved latest news
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/latest', 
  validateQuery(['page', 'limit', 'category']),
  cacheMiddleware(300), // 5 minutes cache
  getLatestNews
);

/**
 * @swagger
 * /api/news/category/{category}:
 *   get:
 *     summary: Get news articles by category
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [news, finance, sport, otomotif, properti, travel, food, health, wolipop, inet, edu, hot]
 *         description: News category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 20
 *         description: Number of articles per page
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter articles from this date (YYYY-MM-DD)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter articles to this date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successfully retrieved category news
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/category/:category',
  validateParams(['category']),
  validateQuery(['page', 'limit', 'dateFrom', 'dateTo']),
  cacheMiddleware(300), // 5 minutes cache
  getNewsByCategory
);

/**
 * @swagger
 * /api/news/search:
 *   get:
 *     summary: Search Indonesian news articles
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 20
 *         description: Number of articles per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [news, finance, sport, otomotif, properti, travel, food, health, wolipop, inet, edu, hot]
 *         description: Filter by category
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [relevance, date, popularity]
 *           default: relevance
 *         description: Sort results by
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter articles from this date (YYYY-MM-DD)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter articles to this date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successfully retrieved search results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsResponse'
 *       400:
 *         description: Bad request - missing or invalid query
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search',
  validateQuery(['q', 'page', 'limit', 'category', 'sortBy', 'dateFrom', 'dateTo']),
  cacheMiddleware(600), // 10 minutes cache for search
  searchNews
);

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Get a specific news article by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Successfully retrieved article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/NewsArticle'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Article not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id',
  validateParams(['id']),
  cacheMiddleware(1800), // 30 minutes cache for individual articles
  getNewsById
);

module.exports = router;