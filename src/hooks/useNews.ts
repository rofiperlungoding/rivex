import { useState, useEffect } from 'react';
import { fetchTopHeadlines } from '../services/newsApi';

export interface NewsArticle {
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
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchTopHeadlines(category);
      const articlesWithIds = response.articles.map((article, index) => ({
        ...article,
        id: `${article.url}-${index}` // Create unique ID
      }));
      setArticles(articlesWithIds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      setArticles([]);
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
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchTopHeadlines(undefined, query);
      const articlesWithIds = response.articles.map((article, index) => ({
        ...article,
        id: `${article.url}-${index}` // Create unique ID
      }));
      setArticles(articlesWithIds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search news');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchNews();
    }, 500); // Debounce search

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