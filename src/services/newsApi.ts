const API_KEY = import.meta.env.VITE_NEWS_API_KEY || '13f426023f25454ba1d56c132ca2b120';
const isDevelopment = import.meta.env.DEV;

// Use proxy in development, direct API in production
const getBaseUrl = () => {
  if (isDevelopment) {
    return '/api/news';
  }
  return import.meta.env.VITE_NEWS_API_URL || 'https://newsapi.org/v2';
};

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author: string;
}

interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  status: string;
}

// Helper function to create request headers
const getHeaders = () => {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  // In production, add API key to headers
  if (!isDevelopment) {
    headers['X-API-Key'] = API_KEY;
  }

  return headers;
};

// Helper function to handle API responses
const handleResponse = async (response: Response): Promise<NewsResponse> => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Response Error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    
    switch (response.status) {
      case 401:
        throw new Error('Invalid API key. Please check your News API configuration.');
      case 429:
        throw new Error('API rate limit exceeded. Please try again later.');
      case 426:
        throw new Error('API upgrade required. Please check your News API plan.');
      case 500:
        throw new Error('News API server error. Please try again later.');
      default:
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }
  }

  const data = await response.json();
  
  if (data.status === 'error') {
    throw new Error(data.message || 'API returned an error');
  }

  return data;
};

// Main function to fetch top headlines
export const fetchTopHeadlines = async (category?: string, searchQuery?: string): Promise<NewsResponse> => {
  try {
    const baseUrl = getBaseUrl();
    let endpoint = `${baseUrl}/top-headlines`;
    
    const params = new URLSearchParams({
      pageSize: '20'
    });

    // Add API key to params in development (for proxy)
    if (isDevelopment) {
      params.append('apiKey', API_KEY);
    }

    // Handle category filtering
    if (category && category !== 'all') {
      params.append('category', category);
      params.append('country', 'us'); // Use US for global categories
    } else {
      params.append('country', 'us'); // Default to US for general news
    }

    // Handle search queries
    if (searchQuery && searchQuery.trim()) {
      endpoint = `${baseUrl}/everything`;
      params.set('q', searchQuery.trim());
      params.set('sortBy', 'publishedAt');
      params.set('language', 'en');
      params.delete('country'); // Remove country filter for search
      
      // Limit search results timeframe
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      params.set('from', oneWeekAgo.toISOString().split('T')[0]);
    }

    console.log('Fetching news from:', `${endpoint}?${params.toString()}`);

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      method: 'GET',
      headers: getHeaders(),
      // Add timeout for better error handling
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    const data = await handleResponse(response);
    
    // Filter out removed articles and articles without essential content
    const filteredArticles = data.articles.filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]' &&
      article.url &&
      article.source?.name
    );

    return {
      ...data,
      articles: filteredArticles
    };

  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Handle specific error types
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to news service. Please check your internet connection.');
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout: News service is taking too long to respond.');
    }
    
    // Re-throw the error if it's already a handled API error
    if (error instanceof Error) {
      throw error;
    }
    
    // Fallback error message
    throw new Error('Failed to fetch news. Please try again later.');
  }
};

// Function to fetch Indonesian news specifically
export const fetchIndonesianNews = async (category?: string): Promise<NewsResponse> => {
  try {
    const baseUrl = getBaseUrl();
    const endpoint = `${baseUrl}/top-headlines`;
    
    const params = new URLSearchParams({
      country: 'id', // Indonesia country code
      pageSize: '20'
    });

    // Add API key to params in development (for proxy)
    if (isDevelopment) {
      params.append('apiKey', API_KEY);
    }

    // Add category if specified
    if (category && category !== 'general') {
      params.append('category', category);
    }

    console.log('Fetching Indonesian news from:', `${endpoint}?${params.toString()}`);

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      method: 'GET',
      headers: getHeaders(),
      signal: AbortSignal.timeout(10000)
    });

    const data = await handleResponse(response);
    
    // Filter out removed articles and articles without essential content
    const filteredArticles = data.articles.filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]' &&
      article.url &&
      article.source?.name
    );

    return {
      ...data,
      articles: filteredArticles
    };

  } catch (error) {
    console.error('Error fetching Indonesian news:', error);
    
    // Handle specific error types
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to news service. Please check your internet connection.');
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout: News service is taking too long to respond.');
    }
    
    // Re-throw the error if it's already a handled API error
    if (error instanceof Error) {
      throw error;
    }
    
    // Fallback error message
    throw new Error('Failed to fetch Indonesian news. Please try again later.');
  }
};

// Function to fetch news by specific sources
const fetchNewsBySources = async (sources: string[]): Promise<NewsResponse> => {
  try {
    const baseUrl = getBaseUrl();
    const endpoint = `${baseUrl}/top-headlines`;
    
    const params = new URLSearchParams({
      sources: sources.join(','),
      pageSize: '20'
    });

    if (isDevelopment) {
      params.append('apiKey', API_KEY);
    }

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      method: 'GET',
      headers: getHeaders(),
      signal: AbortSignal.timeout(10000)
    });

    return await handleResponse(response);

  } catch (error) {
    console.error('Error fetching news by sources:', error);
    throw error;
  }
};

// Function to get available news sources
const fetchNewsSources = async (category?: string, country?: string): Promise<any> => {
  try {
    const baseUrl = getBaseUrl();
    const endpoint = `${baseUrl}/sources`;
    
    const params = new URLSearchParams();

    if (isDevelopment) {
      params.append('apiKey', API_KEY);
    }

    if (category) {
      params.append('category', category);
    }

    if (country) {
      params.append('country', country);
    }

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      method: 'GET',
      headers: getHeaders(),
      signal: AbortSignal.timeout(10000)
    });

    return await handleResponse(response);

  } catch (error) {
    console.error('Error fetching news sources:', error);
    throw error;
  }
};

// Utility function to validate API configuration
export const validateNewsApiConfig = (): boolean => {
  if (!API_KEY || API_KEY === 'your_news_api_key_here') {
    console.warn('News API key is not configured properly');
    return false;
  }
  return true;
};

// Export configuration for debugging
const getNewsApiConfig = () => ({
  apiKey: API_KEY ? `${API_KEY.substring(0, 8)}...` : 'Not configured',
  baseUrl: getBaseUrl(),
  isDevelopment,
  isConfigured: validateNewsApiConfig()
});