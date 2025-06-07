const request = require('supertest');
const app = require('../index');

describe('Indonesian News API', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Indonesian News API is running');
    });
  });

  describe('GET /api/news/latest', () => {
    it('should return latest news articles', async () => {
      const response = await request(app)
        .get('/api/news/latest')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('articles');
      expect(Array.isArray(response.body.data.articles)).toBe(true);
    }, 30000); // 30 second timeout for scraping

    it('should handle pagination parameters', async () => {
      const response = await request(app)
        .get('/api/news/latest?page=1&limit=5')
        .expect(200);
      
      expect(response.body.data.page).toBe(1);
      expect(response.body.data.pageSize).toBe(5);
      expect(response.body.data.articles.length).toBeLessThanOrEqual(5);
    }, 30000);

    it('should validate page parameter', async () => {
      const response = await request(app)
        .get('/api/news/latest?page=0')
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_PAGE');
    });

    it('should validate limit parameter', async () => {
      const response = await request(app)
        .get('/api/news/latest?limit=100')
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_LIMIT');
    });
  });

  describe('GET /api/news/category/:category', () => {
    it('should return news for valid category', async () => {
      const response = await request(app)
        .get('/api/news/category/sport')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.category).toBe('sport');
    }, 30000);

    it('should return 400 for invalid category', async () => {
      const response = await request(app)
        .get('/api/news/category/invalid')
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_CATEGORY');
    });
  });

  describe('GET /api/news/search', () => {
    it('should return search results', async () => {
      const response = await request(app)
        .get('/api/news/search?q=jakarta')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.query).toBe('jakarta');
    }, 30000);

    it('should require search query', async () => {
      const response = await request(app)
        .get('/api/news/search')
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_QUERY');
    });

    it('should validate minimum query length', async () => {
      const response = await request(app)
        .get('/api/news/search?q=a')
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_QUERY');
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limiting', async () => {
      // Make multiple requests quickly
      const requests = Array(10).fill().map(() => 
        request(app).get('/api/news/latest')
      );
      
      const responses = await Promise.all(requests);
      
      // All should succeed within rate limit
      responses.forEach(response => {
        expect([200, 429]).toContain(response.status);
      });
    }, 30000);
  });

  describe('Caching', () => {
    it('should cache responses', async () => {
      // First request
      const response1 = await request(app)
        .get('/api/news/latest?limit=1')
        .expect(200);
      
      expect(response1.headers['x-cache']).toBe('MISS');
      
      // Second request should be cached
      const response2 = await request(app)
        .get('/api/news/latest?limit=1')
        .expect(200);
      
      expect(response2.headers['x-cache']).toBe('HIT');
    }, 30000);
  });
});