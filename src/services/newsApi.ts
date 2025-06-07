// Use environment variables for API configuration
const API_KEY = import.meta.env.VITE_NEWS_API_KEY || '13f426023f25454ba1d56c132ca2b120';
const BASE_URL = import.meta.env.VITE_NEWS_API_URL || 'https://newsapi.org/v2';

export interface NewsArticle {
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

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
}

export const fetchTopHeadlines = async (category?: string, searchQuery?: string): Promise<NewsResponse> => {
  try {
    let endpoint = `${BASE_URL}/top-headlines`;
    const params = new URLSearchParams({
      apiKey: API_KEY,
      country: 'us',
      pageSize: '20'
    });

    if (category && category !== 'all') {
      params.append('category', category);
    }

    if (searchQuery && searchQuery.trim()) {
      endpoint = `${BASE_URL}/everything`;
      params.set('q', searchQuery.trim());
      params.set('sortBy', 'publishedAt');
      params.set('language', 'en');
      params.delete('country');
    }

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Portfolio-Website/1.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message || 'API returned an error');
    }

    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Return fallback data for production
    if (import.meta.env.PROD) {
      return {
        articles: [],
        totalResults: 0
      };
    }
    
    throw error;
  }
};