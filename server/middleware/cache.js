const NodeCache = require('node-cache');
const { logger } = require('../utils/logger');

// Create cache instance with default TTL of 5 minutes
const cache = new NodeCache({ 
  stdTTL: 300, // 5 minutes
  checkperiod: 60, // Check for expired keys every minute
  useClones: false // Don't clone objects for better performance
});

/**
 * Cache middleware
 */
const cacheMiddleware = (ttl = 300) => {
  return (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Create cache key from URL and query parameters
    const cacheKey = `${req.originalUrl || req.url}`;
    
    try {
      // Check if data exists in cache
      const cachedData = cache.get(cacheKey);
      
      if (cachedData) {
        logger.info(`Cache hit for key: ${cacheKey}`);
        
        // Add cache headers
        res.set({
          'X-Cache': 'HIT',
          'X-Cache-Key': cacheKey,
          'Cache-Control': `public, max-age=${ttl}`
        });
        
        return res.json(cachedData);
      }
      
      logger.info(`Cache miss for key: ${cacheKey}`);
      
      // Store original res.json function
      const originalJson = res.json;
      
      // Override res.json to cache the response
      res.json = function(data) {
        // Only cache successful responses
        if (res.statusCode === 200 && data && data.success !== false) {
          cache.set(cacheKey, data, ttl);
          logger.info(`Cached response for key: ${cacheKey} (TTL: ${ttl}s)`);
        }
        
        // Add cache headers
        res.set({
          'X-Cache': 'MISS',
          'X-Cache-Key': cacheKey,
          'Cache-Control': `public, max-age=${ttl}`
        });
        
        // Call original json function
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      logger.error('Cache middleware error:', error);
      // Continue without caching on error
      next();
    }
  };
};

/**
 * Clear cache by pattern
 */
const clearCache = (pattern) => {
  try {
    const keys = cache.keys();
    const matchingKeys = keys.filter(key => key.includes(pattern));
    
    matchingKeys.forEach(key => {
      cache.del(key);
    });
    
    logger.info(`Cleared ${matchingKeys.length} cache entries matching pattern: ${pattern}`);
    return matchingKeys.length;
  } catch (error) {
    logger.error('Error clearing cache:', error);
    return 0;
  }
};

/**
 * Get cache statistics
 */
const getCacheStats = () => {
  try {
    const stats = cache.getStats();
    return {
      keys: stats.keys,
      hits: stats.hits,
      misses: stats.misses,
      hitRate: stats.hits / (stats.hits + stats.misses) || 0,
      memory: process.memoryUsage()
    };
  } catch (error) {
    logger.error('Error getting cache stats:', error);
    return null;
  }
};

/**
 * Flush all cache
 */
const flushCache = () => {
  try {
    cache.flushAll();
    logger.info('Cache flushed successfully');
    return true;
  } catch (error) {
    logger.error('Error flushing cache:', error);
    return false;
  }
};

module.exports = {
  cacheMiddleware,
  clearCache,
  getCacheStats,
  flushCache,
  cache
};