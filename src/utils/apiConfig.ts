// API Configuration utility with enhanced error handling
export const getApiConfig = () => {
  const isDev = import.meta.env.DEV;
  
  const newsApiKey = import.meta.env.VITE_NEWS_API_KEY || '13f426023f25454ba1d56c132ca2b120';
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY || '2434caae723b409ca2b10726250706';
  const newsdataApiKey = import.meta.env.VITE_NEWSDATA_API_KEY || 'pub_e8f901ac11944d30814317cf83ae48e7';
  
  return {
    news: {
      apiKey: newsApiKey,
      baseUrl: isDev 
        ? '/api/news' 
        : import.meta.env.VITE_NEWS_API_URL || 'https://newsapi.org/v2',
      isConfigured: newsApiKey && newsApiKey !== 'your_news_api_key_here'
    },
    weather: {
      apiKey: weatherApiKey,
      baseUrl: isDev 
        ? '/api/weather' 
        : import.meta.env.VITE_WEATHER_API_URL || 'https://api.weatherapi.com/v1',
      isConfigured: weatherApiKey && weatherApiKey !== 'your_weather_api_key_here'
    },
    indonesianNews: {
      apiKey: newsdataApiKey,
      baseUrl: isDev 
        ? '/api/indonesian-news' 
        : 'https://newsdata.io/api/1',
      isConfigured: newsdataApiKey && newsdataApiKey !== 'your_newsdata_api_key_here'
    },
    isDev
  };
};

// Enhanced error handling utility
export const handleApiError = (error: any, context: string) => {
  console.error(`${context} error:`, error);
  
  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return 'Network connection error. Please check your internet connection.';
  }
  
  // Timeout errors
  if (error.name === 'AbortError') {
    return 'Request timeout. The service is taking too long to respond.';
  }
  
  // HTTP status errors
  if (error.message.includes('401')) {
    return 'Authentication failed. Please check your API keys in the environment variables.';
  }
  
  if (error.message.includes('403')) {
    return 'Access forbidden. Your API key may not have the required permissions.';
  }
  
  if (error.message.includes('429')) {
    return 'Rate limit exceeded. Please try again later.';
  }
  
  if (error.message.includes('500')) {
    return 'Server error. The API service is temporarily unavailable.';
  }
  
  // CORS errors
  if (error.message.includes('CORS')) {
    return 'Cross-origin request blocked. This may be a configuration issue.';
  }
  
  // API-specific errors
  if (error.message.includes('API key')) {
    return 'Invalid API key. Please check your configuration.';
  }
  
  // Return the original error message or a fallback
  return error.message || 'An unexpected error occurred. Please try again.';
};

// Utility to validate environment configuration
const validateEnvironment = () => {
  const config = getApiConfig();
  const issues: string[] = [];
  
  if (!config.news.isConfigured) {
    issues.push('News API key is not configured or invalid');
  }
  
  if (!config.weather.isConfigured) {
    issues.push('Weather API key is not configured or invalid');
  }
  
  if (!config.indonesianNews.isConfigured) {
    issues.push('Newsdata.io API key is not configured or invalid');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    config: {
      newsConfigured: config.news.isConfigured,
      weatherConfigured: config.weather.isConfigured,
      indonesianNewsConfigured: config.indonesianNews.isConfigured,
      environment: config.isDev ? 'development' : 'production'
    }
  };
};

// Debug utility for API configuration
const debugApiConfig = () => {
  const config = getApiConfig();
  const validation = validateEnvironment();
  
  console.group('🔧 API Configuration Debug');
  console.log('Environment:', config.isDev ? 'Development' : 'Production');
  console.log('News API:', {
    baseUrl: config.news.baseUrl,
    keyConfigured: config.news.isConfigured,
    keyPreview: config.news.apiKey ? `${config.news.apiKey.substring(0, 8)}...` : 'Not set'
  });
  console.log('Weather API:', {
    baseUrl: config.weather.baseUrl,
    keyConfigured: config.weather.isConfigured,
    keyPreview: config.weather.apiKey ? `${config.weather.apiKey.substring(0, 8)}...` : 'Not set'
  });
  console.log('Indonesian News API (Newsdata.io):', {
    baseUrl: config.indonesianNews.baseUrl,
    keyConfigured: config.indonesianNews.isConfigured,
    keyPreview: config.indonesianNews.apiKey ? `${config.indonesianNews.apiKey.substring(0, 8)}...` : 'Not set'
  });
  console.log('Validation:', validation);
  console.groupEnd();
  
  return validation;
};