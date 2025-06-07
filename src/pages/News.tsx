import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ExternalLink, Filter, TrendingUp, Globe, Bookmark, Users, Gamepad2, Heart, Cpu, MapPin } from 'lucide-react';
import { useNews, useIndonesianNews, useSearchNews } from '../hooks/useNews';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ThemeToggle from '../components/ThemeToggle';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGlobalCategory, setSelectedGlobalCategory] = useState('general');
  const [selectedIndonesianCategory, setSelectedIndonesianCategory] = useState('general');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'global' | 'indonesian'>('global');
  const { mode } = useTheme();

  // Global news categories
  const globalCategories = [
    { value: 'general', label: 'General', icon: <Globe className="h-4 w-4" />, color: 'bg-gray-100 text-gray-700' },
    { value: 'business', label: 'Business', icon: <TrendingUp className="h-4 w-4" />, color: 'bg-blue-100 text-blue-700' },
    { value: 'entertainment', label: 'Entertainment', icon: <Gamepad2 className="h-4 w-4" />, color: 'bg-purple-100 text-purple-700' },
    { value: 'health', label: 'Health', icon: <Heart className="h-4 w-4" />, color: 'bg-red-100 text-red-700' },
    { value: 'science', label: 'Science', icon: <Cpu className="h-4 w-4" />, color: 'bg-indigo-100 text-indigo-700' },
    { value: 'sports', label: 'Sports', icon: <TrendingUp className="h-4 w-4" />, color: 'bg-orange-100 text-orange-700' },
    { value: 'technology', label: 'Technology', icon: <Cpu className="h-4 w-4" />, color: 'bg-green-100 text-green-700' },
  ];

  // Indonesian news categories
  const indonesianCategories = [
    { value: 'general', label: 'General', icon: <Globe className="h-4 w-4" />, color: 'bg-gray-100 text-gray-700' },
    { value: 'business', label: 'Business', icon: <TrendingUp className="h-4 w-4" />, color: 'bg-blue-100 text-blue-700' },
    { value: 'entertainment', label: 'Entertainment', icon: <Gamepad2 className="h-4 w-4" />, color: 'bg-purple-100 text-purple-700' },
    { value: 'health', label: 'Health', icon: <Heart className="h-4 w-4" />, color: 'bg-red-100 text-red-700' },
    { value: 'science', label: 'Science', icon: <Cpu className="h-4 w-4" />, color: 'bg-indigo-100 text-indigo-700' },
    { value: 'sports', label: 'Sports', icon: <TrendingUp className="h-4 w-4" />, color: 'bg-orange-100 text-orange-700' },
    { value: 'technology', label: 'Technology', icon: <Cpu className="h-4 w-4" />, color: 'bg-green-100 text-green-700' },
  ];

  // Fetch global news based on category
  const { 
    articles: globalArticles, 
    loading: globalLoading, 
    error: globalError, 
    refetch: refetchGlobal 
  } = useNews(selectedGlobalCategory === 'general' ? undefined : selectedGlobalCategory);

  // Fetch Indonesian news based on category
  const { 
    articles: indonesianArticles, 
    loading: indonesianLoading, 
    error: indonesianError, 
    refetch: refetchIndonesian 
  } = useIndonesianNews(selectedIndonesianCategory === 'general' ? undefined : selectedIndonesianCategory);

  // Search news
  const { 
    articles: searchArticles, 
    loading: searchLoading, 
    error: searchError, 
    refetch: refetchSearch 
  } = useSearchNews(searchTerm);

  // Determine which articles to show
  const articles = isSearchMode 
    ? searchArticles 
    : activeTab === 'global' 
    ? globalArticles 
    : indonesianArticles;
  
  const loading = isSearchMode 
    ? searchLoading 
    : activeTab === 'global' 
    ? globalLoading 
    : indonesianLoading;
  
  const error = isSearchMode 
    ? searchError 
    : activeTab === 'global' 
    ? globalError 
    : indonesianError;
  
  const refetch = isSearchMode 
    ? refetchSearch 
    : activeTab === 'global' 
    ? refetchGlobal 
    : refetchIndonesian;

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
    if (activeTab === 'global') {
      return globalCategories.find(cat => cat.value === selectedGlobalCategory) || globalCategories[0];
    } else {
      return indonesianCategories.find(cat => cat.value === selectedIndonesianCategory) || indonesianCategories[0];
    }
  };

  // Theme-aware classes
  const getThemeClasses = () => {
    switch (mode) {
      case 'dark':
        return {
          background: 'bg-gray-900',
          text: 'text-white',
          secondaryText: 'text-gray-300',
          cardBg: 'bg-gray-800',
          border: 'border-gray-700',
          inputBg: 'bg-gray-800',
          tabBg: 'bg-gray-800',
          tabActiveBg: 'bg-gray-700'
        };
      case 'reader':
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          secondaryText: 'text-gray-600',
          cardBg: 'bg-white',
          border: 'border-gray-200',
          inputBg: 'bg-white',
          tabBg: 'bg-gray-50',
          tabActiveBg: 'bg-white'
        };
      case 'debug':
        return {
          background: 'bg-gray-900',
          text: 'text-green-400',
          secondaryText: 'text-cyan-400',
          cardBg: 'bg-gray-800',
          border: 'border-green-500',
          inputBg: 'bg-gray-800',
          tabBg: 'bg-gray-800',
          tabActiveBg: 'bg-gray-700'
        };
      default:
        return {
          background: 'bg-white',
          text: 'text-black',
          secondaryText: 'text-gray-600',
          cardBg: 'bg-white',
          border: 'border-gray-200',
          inputBg: 'bg-white',
          tabBg: 'bg-gray-50',
          tabActiveBg: 'bg-white'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`section-padding ${mode === 'reader' ? 'pt-8' : ''} ${themeClasses.background} min-h-screen transition-colors duration-300`}>
      {/* Reader Mode Theme Toggle */}
      {mode === 'reader' && (
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      )}

      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${themeClasses.text} mb-4 transition-colors duration-300`}>Latest News</h1>
          <p className={`text-xl ${themeClasses.secondaryText} max-w-3xl mx-auto transition-colors duration-300`}>
            Stay updated with the latest news from Indonesia and around the world.
          </p>
        </div>

        {/* Search Bar - Hidden in reader mode */}
        {mode !== 'reader' && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${themeClasses.secondaryText} transition-colors duration-300`} />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 ${themeClasses.border} border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ${themeClasses.inputBg} ${themeClasses.text} text-lg shadow-sm`}
              />
            </div>
          </div>
        )}

        {/* Search Results Info */}
        {isSearchMode && (
          <div className={`max-w-6xl mx-auto mb-6 p-4 ${themeClasses.cardBg} rounded-lg ${themeClasses.border} border transition-colors duration-300`}>
            <div className="flex items-center justify-between">
              <div className={`text-sm ${themeClasses.secondaryText} transition-colors duration-300`}>
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
          </div>
        )}

        {/* Tab Navigation - Hidden in reader mode and search mode */}
        {mode !== 'reader' && !isSearchMode && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className={`${themeClasses.tabBg} rounded-lg p-1 transition-colors duration-300`}>
              <div className="flex">
                <button
                  onClick={() => setActiveTab('global')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === 'global'
                      ? `${themeClasses.tabActiveBg} ${themeClasses.text} shadow-sm`
                      : `${themeClasses.secondaryText} hover:${themeClasses.text}`
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  <span>Global News</span>
                </button>
                <button
                  onClick={() => setActiveTab('indonesian')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === 'indonesian'
                      ? `${themeClasses.tabActiveBg} ${themeClasses.text} shadow-sm`
                      : `${themeClasses.secondaryText} hover:${themeClasses.text}`
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  <span>Indonesian News</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter - Hidden in reader mode and search mode */}
        {mode !== 'reader' && !isSearchMode && (
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {(activeTab === 'global' ? globalCategories : indonesianCategories).map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    if (activeTab === 'global') {
                      setSelectedGlobalCategory(category.value);
                    } else {
                      setSelectedIndonesianCategory(category.value);
                    }
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                    (activeTab === 'global' ? selectedGlobalCategory : selectedIndonesianCategory) === category.value
                      ? 'bg-primary-600 text-white shadow-lg'
                      : `${category.color} hover:shadow-md`
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" />
            <div className="mt-4 text-center">
              <p className={`${themeClasses.secondaryText} text-lg transition-colors duration-300`}>
                Loading {isSearchMode ? 'search results' : activeTab === 'global' ? 'global news' : 'Indonesian news'}...
              </p>
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
                      <div className={`p-2 rounded-lg ${getCurrentCategory().color} transition-colors duration-300`}>
                        {getCurrentCategory().icon}
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${themeClasses.text} transition-colors duration-300`}>
                          {activeTab === 'global' ? 'Global' : 'Indonesian'} {getCurrentCategory().label}
                        </h2>
                        <p className={`${themeClasses.secondaryText} transition-colors duration-300`}>
                          {filteredArticles.length} articles found
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article, index) => (
                    <article
                      key={article.id}
                      className={`group cursor-pointer transition-all duration-300 ${
                        mode === 'reader' 
                          ? 'border-none shadow-none bg-transparent' 
                          : `${themeClasses.cardBg} rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 ${themeClasses.border} border overflow-hidden`
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      {/* Article Image */}
                      {article.urlToImage && mode !== 'reader' && (
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
                          <div className={`flex items-center ${themeClasses.secondaryText} text-xs transition-colors duration-300`}>
                            <Clock className="h-3 w-3 mr-1" />
                            {getTimeAgo(article.publishedAt)}
                          </div>
                          <ExternalLink className={`h-4 w-4 ${themeClasses.secondaryText} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                        </div>
                        
                        <h3 className={`text-lg font-bold ${themeClasses.text} mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200`}>
                          {article.title}
                        </h3>
                        
                        <p className={`${themeClasses.secondaryText} text-sm leading-relaxed line-clamp-3 mb-4 transition-colors duration-300`}>
                          {article.description}
                        </p>

                        {article.author && (
                          <p className={`text-xs ${themeClasses.secondaryText} transition-colors duration-300`}>
                            By {article.author}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className={`w-24 h-24 mx-auto mb-6 ${themeClasses.cardBg} rounded-full flex items-center justify-center transition-colors duration-300`}>
                  <Search className={`h-12 w-12 ${themeClasses.secondaryText} transition-colors duration-300`} />
                </div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2 transition-colors duration-300`}>
                  No articles found
                </h3>
                <p className={`${themeClasses.secondaryText} text-lg mb-6 transition-colors duration-300`}>
                  {isSearchMode 
                    ? 'Try adjusting your search terms or browse by category.' 
                    : `No ${activeTab === 'global' ? 'global' : 'Indonesian'} news articles available at the moment.`
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