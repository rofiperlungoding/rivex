const crypto = require('crypto');

/**
 * Generate unique ID from URL
 */
const generateId = (url) => {
  return crypto.createHash('md5').update(url).digest('hex');
};

/**
 * Format date to ISO string
 */
const formatDate = (date) => {
  if (!date) return new Date().toISOString();
  
  if (typeof date === 'string') {
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
  }
  
  if (date instanceof Date) {
    return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  }
  
  return new Date().toISOString();
};

/**
 * Extract and clean text content
 */
const extractTextContent = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[\r\n\t]/g, ' ') // Remove line breaks and tabs
    .trim()
    .substring(0, 500); // Limit length
};

/**
 * Normalize URL
 */
const normalizeUrl = (url, baseUrl) => {
  if (!url) return null;
  
  try {
    // If URL is already absolute, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If URL starts with //, add protocol
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    
    // If URL is relative, combine with base URL
    if (url.startsWith('/')) {
      return `${baseUrl}${url}`;
    }
    
    // If URL is relative without leading slash
    return `${baseUrl}/${url}`;
  } catch (error) {
    return null;
  }
};

/**
 * Sleep utility for rate limiting
 */
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 */
const retry = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i === maxRetries - 1) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, i);
      await sleep(delay);
    }
  }
  
  throw lastError;
};

/**
 * Truncate text to specified length
 */
const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Remove HTML tags from text
 */
const stripHtml = (html) => {
  if (!html || typeof html !== 'string') return '';
  
  return html.replace(/<[^>]*>/g, '').trim();
};

module.exports = {
  generateId,
  formatDate,
  extractTextContent,
  normalizeUrl,
  sleep,
  retry,
  truncateText,
  stripHtml
};