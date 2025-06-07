import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ExternalLink, Filter, TrendingUp, Globe, Bookmark } from 'lucide-react';
import { useNews, useSearchNews } from '../hooks/useNews';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ThemeToggle from '../components/ThemeToggle';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
    { value: 'all', label: 'All News', icon: <Globe className="h-4 w-4" />, color: 'bg-gray-100 text-gray-700' },
    { value: 'technology', label: 'Technology', icon: <TrendingUp className="h-4 w-4" />, color: 'bg-blue-100 text-blue-700' },
    { value: 'business', label: 'Business', icon: <Bookmark className="h-4 w-4" />, color: 'bg-green-100 text-green-700' },
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

  const getCurrentCategory = () => {
    return categories.find(cat => cat.value === selectedCategory) || categories[0];
  };

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
          <div className="max-w-6xl mx-auto mb-12">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-themed-tertiary" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-themed-primary rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-themed-primary text-themed-primary text-lg shadow-sm"
              />
            </div>

            {/* Category Filter */}
            {!isSearchMode && (
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                      selectedCategory === category.value
                        ? 'bg-primary-600 text-white shadow-lg'
                        : `${category.color} hover:shadow-md`
                    }`}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Search Results Info */}
            {isSearchMode && (
              <div className="flex items-center justify-between mb-6 p-4 bg-themed-secondary rounded-lg">
                <div className="text-sm text-themed-secondary">
                  {searchTerm && (
                    <p>
                      Searching for: <span className="font-semibold text-primary-600">"{searchTerm}"</span>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setIsSearchMode(false);
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* View Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-themed-secondary rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'text-themed-secondary hover:text-themed-primary'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'text-themed-secondary hover:text-themed-primary'
                  }`}
                >
                  List View
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" />
            <div className="mt-4 text-center">
              <p className="text-themed-secondary text-lg">Loading news articles...</p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
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
          <div className="max-w-6xl mx-auto">
            {filteredArticles.length > 0 ? (
              <>
                {/* Category Header */}
                {!isSearchMode && mode !== 'reader' && (
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getCurrentCategory().color}`}>
                        {getCurrentCategory().icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-themed-primary">
                          {getCurrentCategory().label}
                        </h2>
                        <p className="text-themed-tertiary">
                          {filteredArticles.length} articles found
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Articles Grid/List */}
                <div className={`${
                  viewMode === 'grid' && mode !== 'reader'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-8'
                }`}>
                  {filteredArticles.map((article, index) => (
                    <article
                      key={article.id}
                      className={`group cursor-pointer transition-all duration-300 ${
                        mode === 'reader' 
                          ? 'border-none shadow-none bg-transparent' 
                          : viewMode === 'grid'
                          ? 'bg-themed-primary rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 border border-themed-primary overflow-hidden'
                          : 'bg-themed-primary rounded-xl shadow-sm hover:shadow-lg border border-themed-primary overflow-hidden'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      {/* Grid View Layout */}
                      {viewMode === 'grid' && mode !== 'reader' ? (
                        <>
                          {/* Article Image */}
                          {article.urlToImage && (
                            <div className="relative overflow-hidden h-48">
                              <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              {/* Category Badge */}
                              <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCurrentCategory().color} backdrop-blur-sm`}>
                                  {article.source.name}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="p-6">
                            {/* Meta */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center text-themed-tertiary text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {getTimeAgo(article.publishedAt)}
                              </div>
                              <ExternalLink className="h-4 w-4 text-themed-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                            
                            <h3 className="text-lg font-bold text-themed-primary mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                              {article.title}
                            </h3>
                            
                            <p className="text-themed-secondary text-sm leading-relaxed line-clamp-3 mb-4">
                              {article.description}
                            </p>

                            {article.author && (
                              <p className="text-xs text-themed-tertiary">
                                By {article.author}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        /* List View Layout */
                        <div className={`flex gap-6 p-6 ${mode === 'reader' ? '' : 'hover:bg-themed-secondary'} transition-colors duration-200`}>
                          {/* Article Image */}
                          {article.urlToImage && mode !== 'reader' && (
                            <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden">
                              <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="flex-1">
                            {/* Meta information */}
                            <div className={`flex flex-wrap items-center gap-4 mb-3 ${mode === 'reader' ? 'text-sm' : 'text-xs'}`}>
                              <span className={`px-2 py-1 rounded-full font-medium ${getCurrentCategory().color}`}>
                                {article.source.name}
                              </span>
                              <div className="flex items-center text-themed-tertiary">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(article.publishedAt)}
                              </div>
                              <div className="flex items-center text-themed-tertiary">
                                <Clock className="h-3 w-3 mr-1" />
                                {getTimeAgo(article.publishedAt)}
                              </div>
                            </div>
                            
                            <h3 className={`font-bold text-themed-primary mb-3 group-hover:text-primary-600 transition-colors duration-200 ${
                              mode === 'reader' 
                                ? 'text-2xl leading-tight' 
                                : 'text-xl line-clamp-2'
                            }`}>
                              {article.title}
                            </h3>
                            
                            <p className={`text-themed-secondary leading-relaxed mb-4 ${
                              mode === 'reader' 
                                ? 'text-lg' 
                                : 'line-clamp-2'
                            }`}>
                              {article.description}
                            </p>

                            <div className="flex items-center justify-between">
                              {article.author && mode !== 'reader' && (
                                <p className="text-sm text-themed-tertiary">
                                  By {article.author}
                                </p>
                              )}
                              
                              <div className={`inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 ${
                                mode === 'reader' ? 'text-lg' : 'text-sm'
                              }`}>
                                <span>Read article</span>
                                <ExternalLink className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-themed-secondary rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-themed-tertiary" />
                </div>
                <h3 className="text-xl font-semibold text-themed-primary mb-2">
                  No articles found
                </h3>
                <p className="text-themed-tertiary text-lg mb-6">
                  {isSearchMode 
                    ? 'Try adjusting your search terms or browse by category.' 
                    : 'No news articles available at the moment.'
                  }
                </p>
                {isSearchMode && mode !== 'reader' && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setIsSearchMode(false);
                    }}
                    className="btn-primary"
                  >
                    Browse All News
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