// API Configuration utility
export const getApiConfig = () => {
  const isDev = import.meta.env.DEV;
  
  return {
    news: {
      apiKey: import.meta.env.VITE_NEWS_API_KEY || '13f426023f25454ba1d56c132ca2b120',
      baseUrl: isDev 
        ? '/api/news' 
        : import.meta.env.VITE_NEWS_API_URL || 'https://newsapi.org/v2'
    },
    weather: {
      apiKey: import.meta.env.VITE_WEATHER_API_KEY || '2434caae723b409ca2b10726250706',
      baseUrl: isDev 
        ? '/api/weather' 
        : import.meta.env.VITE_WEATHER_API_URL || 'https://api.weatherapi.com/v1'
    }
  };
};

// Error handling utility
export const handleApiError = (error: any, context: string) => {
  console.error(`${context} error:`, error);
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network connection error. Please check your internet connection.';
  }
  
  if (error.message.includes('401')) {
    return 'API authentication failed. Please check your API keys.';
  }
  
  if (error.message.includes('429')) {
    return 'API rate limit exceeded. Please try again later.';
  }
  
  if (error.message.includes('CORS')) {
    return 'Cross-origin request blocked. API configuration may need updating.';
  }
  
  return error.message || 'An unexpected error occurred.';
};