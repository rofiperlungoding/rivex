import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ExternalLink, Filter } from 'lucide-react';
import { useNews, useSearchNews } from '../hooks/useNews';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ThemeToggle from '../components/ThemeToggle';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const { mode } = useTheme();

  // Fetch news based on category
  const categoryForApi = selectedCategory === 'all' ? undefined : selectedCategory;
  const { 
    articles: categoryArticles, 
    loading: categoryLoading, 
    error: categoryError, 
    refetch: refetchCategory 
  } = useNews(categoryForApi);

  // Search news
  const { 
    articles: searchArticles, 
    loading: searchLoading, 
    error: searchError, 
    refetch: refetchSearch 
  } = useSearchNews(searchTerm);

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
  ];

  // Determine which articles to show
  const articles = isSearchMode ? searchArticles : categoryArticles;
  const loading = isSearchMode ? searchLoading : categoryLoading;
  const error = isSearchMode ? searchError : categoryError;
  const refetch = isSearchMode ? refetchSearch : refetchCategory;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsSearchMode(value.trim().length > 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return formatDate(dateString);
  };

  const filteredArticles = useMemo(() => {
    return articles.filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]'
    );
  }, [articles]);

  return (
    <div className={`section-padding ${mode === 'reader' ? 'pt-8' : ''}`}>
      {/* Reader Mode Theme Toggle */}
      {mode === 'reader' && (
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      )}

      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-themed-primary mb-4">Latest News</h1>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            Stay updated with the latest news and developments from around the world.
          </p>
        </div>

        {/* Search and Filter - Hidden in reader mode */}
        {mode !== 'reader' && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-themed-tertiary" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-themed-primary rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-themed-primary text-themed-primary"
                />
              </div>
              
              {!isSearchMode && (
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-themed-tertiary" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-themed-primary rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-themed-primary text-themed-primary"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {isSearchMode && (
              <div className="text-sm text-themed-tertiary mb-4">
                {searchTerm && (
                  <p>
                    Searching for: <span className="font-medium">"{searchTerm}"</span>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-themed-secondary">Loading news articles...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {/* News Articles */}
        {!loading && !error && (
          <div className="max-w-4xl mx-auto">
            {filteredArticles.length > 0 ? (
              <div className="space-y-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className={`card p-6 transition-all duration-300 ${
                      mode === 'reader' 
                        ? 'border-none shadow-none bg-transparent' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div className={`flex flex-col ${mode === 'reader' ? '' : 'lg:flex-row'} gap-6`}>
                      {/* Article Image - Hidden in reader mode */}
                      {article.urlToImage && mode !== 'reader' && (
                        <div className="lg:w-1/3 flex-shrink-0">
                          <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-48 lg:h-32 object-cover rounded-lg"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Article Content */}
                      <div className="flex-1">
                        {/* Meta information - Simplified in reader mode */}
                        {mode !== 'reader' && (
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                                {article.source.name}
                              </span>
                              <div className="flex items-center text-themed-tertiary text-sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(article.publishedAt)}
                              </div>
                            </div>
                            <div className="flex items-center text-themed-tertiary text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              {getTimeAgo(article.publishedAt)}
                            </div>
                          </div>
                        )}

                        {/* Reader mode meta */}
                        {mode === 'reader' && (
                          <div className="mb-4 text-sm text-themed-tertiary">
                            <span className="font-medium">{article.source.name}</span>
                            <span className="mx-2">•</span>
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                        )}
                        
                        <h2 className={`font-semibold text-themed-primary mb-3 ${
                          mode === 'reader' 
                            ? 'text-2xl leading-tight' 
                            : 'text-xl line-clamp-2'
                        }`}>
                          {article.title}
                        </h2>
                        
                        <p className={`text-themed-secondary leading-relaxed mb-4 ${
                          mode === 'reader' 
                            ? 'text-lg' 
                            : 'line-clamp-3'
                        }`}>
                          {article.description}
                        </p>

                        {article.author && mode !== 'reader' && (
                          <p className="text-sm text-themed-tertiary mb-4">
                            By {article.author}
                          </p>
                        )}
                        
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 ${
                            mode === 'reader' ? 'text-lg' : ''
                          }`}
                        >
                          <span>Read full article</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-themed-tertiary text-lg">
                  {isSearchMode 
                    ? 'No articles found matching your search criteria.' 
                    : 'No news articles available at the moment.'
                  }
                </p>
                {isSearchMode && mode !== 'reader' && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setIsSearchMode(false);
                    }}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear search and view all news
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;