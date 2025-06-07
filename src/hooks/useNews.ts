import { useState, useEffect } from 'react';
import { fetchTopHeadlines, fetchIndonesianNews, validateNewsApiConfig } from '../services/newsApi';

interface NewsArticle {
  id: string;
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

interface UseNewsReturn {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useNews = (category?: string): UseNewsReturn => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    // Check if API is properly configured
    if (!validateNewsApiConfig()) {
      setError('News API is not properly configured. Please check your API key.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchTopHeadlines(category);
      
      // Create articles with unique IDs
      const articlesWithIds = response.articles.map((article, index) => ({
        ...article,
        id: `global-${article.url}-${index}-${Date.now()}` // More unique ID generation
      }));
      
      setArticles(articlesWithIds);
      
      // Log success for debugging
      console.log(`Successfully fetched ${articlesWithIds.length} global articles for category: ${category || 'all'}`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch global news';
      setError(errorMessage);
      setArticles([]);
      
      // Log error for debugging
      console.error('Global news fetch error:', {
        category,
        error: errorMessage,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const refetch = () => {
    fetchNews();
  };

  return {
    articles,
    loading,
    error,
    refetch,
  };
};

export const useIndonesianNews = (category?: string): UseNewsReturn => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchIndonesianNews(category);
      
      // Create articles with unique IDs
      const articlesWithIds = response.articles.map((article, index) => ({
        ...article,
        id: `id-${article.url}-${index}-${Date.now()}` // More unique ID generation
      }));
      
      setArticles(articlesWithIds);
      
      // Log success for debugging
      console.log(`Successfully fetched ${articlesWithIds.length} Indonesian articles for category: ${category || 'general'}`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch Indonesian news';
      setError(errorMessage);
      setArticles([]);
      
      // Log error for debugging
      console.error('Indonesian news fetch error:', {
        category,
        error: errorMessage,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const refetch = () => {
    fetchNews();
  };

  return {
    articles,
    loading,
    error,
    refetch,
  };
};

export const useSearchNews = (query: string): UseNewsReturn => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchNews = async () => {
    if (!query.trim()) {
      setArticles([]);
      setLoading(false);
      return;
    }

    // Check if API is properly configured
    if (!validateNewsApiConfig()) {
      setError('News API is not properly configured. Please check your API key.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchTopHeadlines(undefined, query);
      
      // Create articles with unique IDs
      const articlesWithIds = response.articles.map((article, index) => ({
        ...article,
        id: `search-${article.url}-${index}-${Date.now()}`
      }));
      
      setArticles(articlesWithIds);
      
      // Log success for debugging
      console.log(`Successfully found ${articlesWithIds.length} articles for query: "${query}"`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search news';
      setError(errorMessage);
      setArticles([]);
      
      // Log error for debugging
      console.error('News search error:', {
        query,
        error: errorMessage,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search requests
    const timeoutId = setTimeout(() => {
      searchNews();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const refetch = () => {
    searchNews();
  };

  return {
    articles,
    loading,
    error,
    refetch,
  };
};

// Hook for getting multiple news categories
const useMultiCategoryNews = (categories: string[]) => {
  const [newsData, setNewsData] = useState<Record<string, NewsArticle[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMultiCategoryNews = async () => {
    if (!validateNewsApiConfig()) {
      setError('News API is not properly configured. Please check your API key.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const promises = categories.map(async (category) => {
        const response = await fetchTopHeadlines(category);
        const articlesWithIds = response.articles.map((article, index) => ({
          ...article,
          id: `${category}-${article.url}-${index}-${Date.now()}`
        }));
        return { category, articles: articlesWithIds };
      });

      const results = await Promise.all(promises);
      const newsMap = results.reduce((acc, { category, articles }) => {
        acc[category] = articles;
        return acc;
      }, {} as Record<string, NewsArticle[]>);

      setNewsData(newsMap);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch multi-category news';
      setError(errorMessage);
      setNewsData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      fetchMultiCategoryNews();
    }
  }, [categories.join(',')]);

  return {
    newsData,
    loading,
    error,
    refetch: fetchMultiCategoryNews,
  };
};