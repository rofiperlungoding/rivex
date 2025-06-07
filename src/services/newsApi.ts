import { getApiConfig } from '../utils/apiConfig';

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
    const { apiKey, baseUrl } = getApiConfig();
    
    let endpoint = `${baseUrl}/top-headlines`;
    const params = new URLSearchParams({
      apiKey: apiKey,
      country: 'us',
      pageSize: '20'
    });

    if (category && category !== 'all') {
      params.append('category', category);
    }

    if (searchQuery && searchQuery.trim()) {
      endpoint = `${baseUrl}/everything`;
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