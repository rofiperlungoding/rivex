const axios = require('axios');
const cheerio = require('cheerio');
const { logger } = require('../utils/logger');
const { generateId, formatDate, extractTextContent, normalizeUrl } = require('../utils/helpers');

class DetikNewsAPI {
  constructor() {
    this.baseUrl = 'https://www.detik.com';
    this.categories = {
      news: 'news',
      finance: 'finance', 
      sport: 'sport',
      otomotif: 'oto',
      properti: 'properti',
      travel: 'travel',
      food: 'food',
      health: 'health',
      wolipop: 'wolipop',
      inet: 'inet',
      edu: 'edu',
      hot: 'hot'
    };
    
    // Configure axios with proper headers and timeout
    this.client = axios.create({
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });
  }

  /**
   * Get latest news articles
   */
  async getLatestNews(options = {}) {
    try {
      const { page = 1, limit = 20, category } = options;
      
      let url = `${this.baseUrl}`;
      if (category && this.categories[category]) {
        url = `${this.baseUrl}/${this.categories[category]}`;
      }
      
      logger.info(`Fetching latest news from: ${url}`);
      
      const response = await this.client.get(url);
      const $ = cheerio.load(response.data);
      
      const articles = [];
      
      // Extract articles from different sections
      const selectors = [
        '.media__link', // Main article links
        '.list-content__item a', // List content items
        '.grid-row article a', // Grid articles
        'article h2 a', // Article headlines
        '.media__title a' // Media titles
      ];
      
      for (const selector of selectors) {
        $(selector).each((index, element) => {
          try {
            const article = this.extractArticleData($, element);
            if (article && this.isValidArticle(article)) {
              articles.push(article);
            }
          } catch (error) {
            logger.warn(`Error extracting article data: ${error.message}`);
          }
        });
      }
      
      // Remove duplicates and sort by date
      const uniqueArticles = this.removeDuplicates(articles);
      const sortedArticles = uniqueArticles.sort((a, b) => 
        new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      
      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedArticles = sortedArticles.slice(startIndex, endIndex);
      
      return {
        articles: paginatedArticles,
        totalResults: sortedArticles.length,
        page: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(sortedArticles.length / limit)
      };
    } catch (error) {
      logger.error('Error fetching latest news:', error);
      throw new Error(`Failed to fetch latest news: ${error.message}`);
    }
  }

  /**
   * Get news articles by category
   */
  async getNewsByCategory(category, options = {}) {
    try {
      if (!this.categories[category]) {
        throw new Error(`Invalid category: ${category}. Valid categories: ${Object.keys(this.categories).join(', ')}`);
      }
      
      const { page = 1, limit = 20, dateFrom, dateTo } = options;
      
      const url = `${this.baseUrl}/${this.categories[category]}`;
      logger.info(`Fetching news by category from: ${url}`);
      
      const response = await this.client.get(url);
      const $ = cheerio.load(response.data);
      
      const articles = [];
      
      // Category-specific selectors
      const selectors = this.getCategorySelectors(category);
      
      for (const selector of selectors) {
        $(selector).each((index, element) => {
          try {
            const article = this.extractArticleData($, element);
            if (article && this.isValidArticle(article)) {
              // Apply date filtering if specified
              if (this.isWithinDateRange(article.publishedAt, dateFrom, dateTo)) {
                article.category = category;
                articles.push(article);
              }
            }
          } catch (error) {
            logger.warn(`Error extracting article data: ${error.message}`);
          }
        });
      }
      
      // Remove duplicates and sort
      const uniqueArticles = this.removeDuplicates(articles);
      const sortedArticles = uniqueArticles.sort((a, b) => 
        new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      
      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedArticles = sortedArticles.slice(startIndex, endIndex);
      
      return {
        articles: paginatedArticles,
        totalResults: sortedArticles.length,
        page: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(sortedArticles.length / limit),
        category
      };
    } catch (error) {
      logger.error(`Error fetching news by category ${category}:`, error);
      throw new Error(`Failed to fetch news for category ${category}: ${error.message}`);
    }
  }

  /**
   * Search news articles
   */
  async searchNews(query, options = {}) {
    try {
      const { page = 1, limit = 20, category, sortBy = 'relevance', dateFrom, dateTo } = options;
      
      // Use Detik's search functionality
      const searchUrl = `${this.baseUrl}/search/?query=${encodeURIComponent(query)}`;
      logger.info(`Searching news with query: "${query}" from: ${searchUrl}`);
      
      const response = await this.client.get(searchUrl);
      const $ = cheerio.load(response.data);
      
      const articles = [];
      
      // Search result selectors
      const selectors = [
        '.list-content__item a',
        '.media__link',
        'article h2 a',
        '.search-result a'
      ];
      
      for (const selector of selectors) {
        $(selector).each((index, element) => {
          try {
            const article = this.extractArticleData($, element);
            if (article && this.isValidArticle(article)) {
              // Calculate relevance score
              article.relevanceScore = this.calculateRelevanceScore(article, query);
              
              // Apply category filter if specified
              if (!category || article.category === category) {
                // Apply date filtering if specified
                if (this.isWithinDateRange(article.publishedAt, dateFrom, dateTo)) {
                  articles.push(article);
                }
              }
            }
          } catch (error) {
            logger.warn(`Error extracting search result: ${error.message}`);
          }
        });
      }
      
      // Remove duplicates
      const uniqueArticles = this.removeDuplicates(articles);
      
      // Sort based on sortBy parameter
      let sortedArticles;
      switch (sortBy) {
        case 'date':
          sortedArticles = uniqueArticles.sort((a, b) => 
            new Date(b.publishedAt) - new Date(a.publishedAt)
          );
          break;
        case 'popularity':
          sortedArticles = uniqueArticles.sort((a, b) => 
            (b.popularity || 0) - (a.popularity || 0)
          );
          break;
        case 'relevance':
        default:
          sortedArticles = uniqueArticles.sort((a, b) => 
            (b.relevanceScore || 0) - (a.relevanceScore || 0)
          );
          break;
      }
      
      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedArticles = sortedArticles.slice(startIndex, endIndex);
      
      return {
        articles: paginatedArticles,
        totalResults: sortedArticles.length,
        page: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(sortedArticles.length / limit),
        query,
        sortBy
      };
    } catch (error) {
      logger.error(`Error searching news with query "${query}":`, error);
      throw new Error(`Failed to search news: ${error.message}`);
    }
  }

  /**
   * Get a specific article by ID
   */
  async getArticleById(id) {
    try {
      // In a real implementation, you might store article URLs in a database
      // For now, we'll try to reconstruct the URL or search for it
      logger.info(`Fetching article by ID: ${id}`);
      
      // This is a simplified implementation
      // In practice, you'd need a way to map IDs to URLs
      throw new Error('Article by ID functionality requires URL mapping implementation');
    } catch (error) {
      logger.error(`Error fetching article by ID ${id}:`, error);
      throw new Error(`Failed to fetch article: ${error.message}`);
    }
  }

  /**
   * Extract article data from DOM element
   */
  extractArticleData($, element) {
    const $element = $(element);
    const $parent = $element.closest('article, .media, .list-content__item');
    
    // Extract URL
    const url = normalizeUrl($element.attr('href'), this.baseUrl);
    if (!url) return null;
    
    // Extract title
    const title = extractTextContent($element.text() || $element.find('h1, h2, h3, h4').first().text());
    if (!title) return null;
    
    // Extract description
    const description = extractTextContent(
      $parent.find('.media__desc, .list-content__desc, p').first().text()
    );
    
    // Extract image
    const imageUrl = this.extractImageUrl($, $parent);
    
    // Extract date
    const publishedAt = this.extractPublishDate($, $parent);
    
    // Extract author
    const author = extractTextContent(
      $parent.find('.media__author, .author, .byline').first().text()
    );
    
    // Extract category from URL or content
    const category = this.extractCategory(url, $parent);
    
    // Generate unique ID
    const id = generateId(url);
    
    return {
      id,
      title,
      description: description || title,
      url,
      imageUrl,
      publishedAt,
      author,
      category,
      source: {
        name: 'Detik.com',
        url: this.baseUrl
      },
      tags: this.extractTags($, $parent)
    };
  }

  /**
   * Extract image URL from article element
   */
  extractImageUrl($, $parent) {
    const imgSelectors = [
      'img[src]',
      '[data-src]',
      '[style*="background-image"]'
    ];
    
    for (const selector of imgSelectors) {
      const $img = $parent.find(selector).first();
      if ($img.length) {
        const src = $img.attr('src') || $img.attr('data-src');
        if (src) {
          return normalizeUrl(src, this.baseUrl);
        }
      }
    }
    
    return null;
  }

  /**
   * Extract publish date from article element
   */
  extractPublishDate($, $parent) {
    const dateSelectors = [
      '.media__date',
      '.date',
      '.timestamp',
      '[datetime]',
      'time'
    ];
    
    for (const selector of dateSelectors) {
      const $date = $parent.find(selector).first();
      if ($date.length) {
        const dateText = $date.attr('datetime') || $date.text();
        const parsedDate = new Date(dateText);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate.toISOString();
        }
      }
    }
    
    // Default to current time if no date found
    return new Date().toISOString();
  }

  /**
   * Extract category from URL or content
   */
  extractCategory(url, $parent) {
    // Extract from URL path
    const urlParts = url.split('/');
    for (const [key, value] of Object.entries(this.categories)) {
      if (urlParts.includes(value)) {
        return key;
      }
    }
    
    // Extract from content classes or attributes
    const categoryClasses = $parent.attr('class') || '';
    for (const [key, value] of Object.entries(this.categories)) {
      if (categoryClasses.includes(value)) {
        return key;
      }
    }
    
    return 'news'; // Default category
  }

  /**
   * Extract tags from article element
   */
  extractTags($, $parent) {
    const tags = [];
    
    $parent.find('.tag, .label, .category').each((index, element) => {
      const tag = extractTextContent($(element).text());
      if (tag) {
        tags.push(tag);
      }
    });
    
    return tags;
  }

  /**
   * Get category-specific selectors
   */
  getCategorySelectors(category) {
    const baseSelectors = [
      '.media__link',
      '.list-content__item a',
      'article h2 a',
      '.media__title a'
    ];
    
    // Add category-specific selectors if needed
    switch (category) {
      case 'sport':
        return [...baseSelectors, '.sport-item a', '.match-item a'];
      case 'finance':
        return [...baseSelectors, '.finance-item a', '.stock-item a'];
      default:
        return baseSelectors;
    }
  }

  /**
   * Calculate relevance score for search results
   */
  calculateRelevanceScore(article, query) {
    const queryTerms = query.toLowerCase().split(' ');
    let score = 0;
    
    const title = article.title.toLowerCase();
    const description = (article.description || '').toLowerCase();
    
    queryTerms.forEach(term => {
      // Title matches are worth more
      if (title.includes(term)) {
        score += 10;
      }
      
      // Description matches
      if (description.includes(term)) {
        score += 5;
      }
      
      // Exact phrase matches in title
      if (title.includes(query.toLowerCase())) {
        score += 20;
      }
    });
    
    return score;
  }

  /**
   * Check if article is within date range
   */
  isWithinDateRange(publishedAt, dateFrom, dateTo) {
    if (!dateFrom && !dateTo) return true;
    
    const articleDate = new Date(publishedAt);
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      if (articleDate < fromDate) return false;
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      if (articleDate > toDate) return false;
    }
    
    return true;
  }

  /**
   * Validate article data
   */
  isValidArticle(article) {
    return article && 
           article.title && 
           article.url && 
           article.title.length > 10 &&
           !article.title.toLowerCase().includes('advertisement') &&
           !article.url.includes('/ads/');
  }

  /**
   * Remove duplicate articles
   */
  removeDuplicates(articles) {
    const seen = new Set();
    return articles.filter(article => {
      const key = article.url || article.title;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}

module.exports = { DetikNewsAPI };