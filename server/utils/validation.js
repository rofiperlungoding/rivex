/**
 * Validate date range
 */
const validateDateRange = (dateFrom, dateTo) => {
  try {
    if (!dateFrom && !dateTo) {
      return { valid: true };
    }
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      if (isNaN(fromDate.getTime())) {
        return { valid: false, error: 'Invalid dateFrom format. Use YYYY-MM-DD' };
      }
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      if (isNaN(toDate.getTime())) {
        return { valid: false, error: 'Invalid dateTo format. Use YYYY-MM-DD' };
      }
    }
    
    if (dateFrom && dateTo) {
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      
      if (fromDate > toDate) {
        return { valid: false, error: 'dateFrom cannot be later than dateTo' };
      }
      
      // Check if date range is not too large (e.g., max 1 year)
      const diffTime = Math.abs(toDate - fromDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 365) {
        return { valid: false, error: 'Date range cannot exceed 365 days' };
      }
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: 'Invalid date format' };
  }
};

/**
 * Sanitize search query
 */
const sanitizeQuery = (query) => {
  if (typeof query !== 'string') {
    return '';
  }
  
  return query
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 200); // Limit length
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format
 */
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  validateDateRange,
  sanitizeQuery,
  isValidEmail,
  isValidUrl
};