import React, { useState, useEffect } from 'react';
import { useNews, useSearchNews } from '../hooks/useNews';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import RightNavigation from '../components/RightNavigation';
import { AlertTriangle, TrendingUp, Calendar, ExternalLink, DollarSign, Building } from 'lucide-react';

const Home: React.FC = () => {
  const { articles, loading, error } = useNews();
  const { mode } = useTheme();
  
  // Search for Indonesian economic news
  const { 
    articles: economyArticles, 
    loading: economyLoading, 
    error: economyError 
  } = useSearchNews('Indonesia economy economic financial rupiah bank');

  // Search for Indonesian political news
  const { 
    articles: politicsArticles, 
    loading: politicsLoading, 
    error: politicsError 
  } = useSearchNews('Indonesia politics political government president election');

  // Filter and limit articles for featured stories
  const featuredArticles = articles
    .filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]'
    )
    .slice(0, 20);

  // Filter Indonesian economy articles
  const filteredEconomyArticles = economyArticles
    .filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]' &&
      (article.title.toLowerCase().includes('indonesia') || 
       article.title.toLowerCase().includes('indonesian') ||
       article.description.toLowerCase().includes('indonesia') ||
       article.title.toLowerCase().includes('rupiah') ||
       article.title.toLowerCase().includes('jakarta'))
    )
    .slice(0, 3);

  // Filter Indonesian politics articles
  const filteredPoliticsArticles = politicsArticles
    .filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]' &&
      (article.title.toLowerCase().includes('indonesia') || 
       article.title.toLowerCase().includes('indonesian') ||
       article.description.toLowerCase().includes('indonesia') ||
       article.title.toLowerCase().includes('jakarta'))
    )
    .slice(0, 3);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Theme-aware classes
  const getThemeClasses = () => {
    switch (mode) {
      case 'dark':
        return {
          background: 'bg-gray-900',
          headerBg: 'bg-gray-900',
          text: 'text-white',
          secondaryText: 'text-gray-300',
          cardBg: 'bg-gray-800',
          cardHover: 'hover:bg-gray-700',
          border: 'border-gray-700',
          accent: 'text-orange-400',
          economyBg: 'bg-gradient-to-br from-green-900 to-emerald-800',
          economyBorder: 'border-green-600',
          economyText: 'text-green-200',
          politicsBg: 'bg-gradient-to-br from-blue-900 to-indigo-800',
          politicsBorder: 'border-blue-600',
          politicsText: 'text-blue-200'
        };
      case 'reader':
        return {
          background: 'bg-white',
          headerBg: 'bg-white',
          text: 'text-gray-900',
          secondaryText: 'text-gray-600',
          cardBg: 'bg-white',
          cardHover: 'hover:bg-gray-50',
          border: 'border-gray-200',
          accent: 'text-orange-600',
          economyBg: 'bg-gradient-to-br from-green-50 to-emerald-50',
          economyBorder: 'border-green-200',
          economyText: 'text-green-800',
          politicsBg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
          politicsBorder: 'border-blue-200',
          politicsText: 'text-blue-800'
        };
      case 'debug':
        return {
          background: 'bg-gray-900',
          headerBg: 'bg-gray-900',
          text: 'text-green-400',
          secondaryText: 'text-cyan-400',
          cardBg: 'bg-gray-800',
          cardHover: 'hover:bg-gray-700',
          border: 'border-green-500',
          accent: 'text-yellow-400',
          economyBg: 'bg-gradient-to-br from-green-900 to-yellow-900',
          economyBorder: 'border-green-500',
          economyText: 'text-green-300',
          politicsBg: 'bg-gradient-to-br from-blue-900 to-cyan-900',
          politicsBorder: 'border-cyan-500',
          politicsText: 'text-cyan-300'
        };
      default: // light
        return {
          background: 'bg-white',
          headerBg: 'bg-white',
          text: 'text-black',
          secondaryText: 'text-gray-600',
          cardBg: 'bg-white',
          cardHover: 'hover:bg-gray-50',
          border: 'border-gray-100',
          accent: 'text-orange-500',
          economyBg: 'bg-gradient-to-br from-green-600 to-emerald-600',
          economyBorder: 'border-green-500',
          economyText: 'text-white',
          politicsBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
          politicsBorder: 'border-blue-500',
          politicsText: 'text-white'
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Component for rendering article cards
  const ArticleCard = ({ article, isMain = false }: { article: any, isMain?: boolean }) => (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-lg hover:scale-[1.02] transition-all duration-300 group ${
        isMain ? 'mb-4' : 'mb-3'
      } bg-black/10 hover:bg-black/20 backdrop-blur-sm`}
    >
      <div className={`flex ${isMain ? 'flex-col space-y-4' : 'space-x-3'}`}>
        {/* Article Image */}
        {article.urlToImage && (
          <div className={`${isMain ? 'w-full h-32' : 'w-16 h-12'} rounded-lg overflow-hidden flex-shrink-0`}>
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
          </div>
        )}
        
        {/* Article Content */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-white leading-tight group-hover:opacity-90 transition-opacity duration-300 ${
            isMain ? 'text-lg mb-2' : 'text-sm mb-1 line-clamp-2'
          }`}>
            {article.title}
          </h4>
          
          {isMain && (
            <p className="text-white/80 text-sm leading-relaxed mb-3 line-clamp-2">
              {article.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="font-medium">{article.source.name}</span>
            <span>{getTimeAgo(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </a>
  );

  return (
    <div className={`min-h-screen ${themeClasses.background} transition-colors duration-300`}>
      {/* Theme Toggle and Right Navigation for Home Page - Positioned lower */}
      <div className="fixed top-20 right-4 z-50">
        <ThemeToggle />
      </div>
      <RightNavigation />

      {/* Header */}
      <header className={`${themeClasses.headerBg} relative z-20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/Untitled design (1).png" 
                alt="rivex" 
                className="h-8 w-auto"
              />
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              <a href="/about" className={`${themeClasses.secondaryText} hover:${themeClasses.text} font-medium transition-colors`}>
                About
              </a>
              <a href="/news" className={`${themeClasses.secondaryText} hover:${themeClasses.text} font-medium transition-colors`}>
                News
              </a>
              <a href="/timeline" className={`${themeClasses.secondaryText} hover:${themeClasses.text} font-medium transition-colors`}>
                Timeline
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Single Image */}
      <section className={`${themeClasses.background} pt-8 pb-12 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl overflow-hidden relative h-80">
            {/* Single Hero Image */}
            <div className="absolute inset-0">
              <img
                src="/image copy copy.png"
                alt="Hero image"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Simple gradient overlay - only where text appears */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60"></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-between h-full p-8">
              {/* Top right logo */}
              <div className="absolute top-8 right-8">
                <img 
                  src="/Untitled design (2).png" 
                  alt="rivex" 
                  className="h-6 w-auto drop-shadow-lg"
                />
              </div>
              
              {/* Bottom right text */}
              <div className="absolute bottom-8 right-8 text-right">
                <h1 className="text-white text-4xl font-light leading-tight drop-shadow-lg">
                  grow anywhere,
                  <br />
                  <span className="italic">anytime,</span>
                  <br />
                  <span className="italic">anyone.</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section - Indonesian Economic & Political Focus */}
      <section className={`${themeClasses.background} py-16 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Latest News Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
              <h2 className={`text-3xl font-bold ${themeClasses.text} transition-colors duration-300`}>
                LATEST NEWS
              </h2>
              <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
            </div>
            <div className={`w-24 h-1 bg-red-500 mx-auto mb-6`}></div>
            <p className={`${themeClasses.secondaryText} text-lg transition-colors duration-300`}>
              Indonesian Economic & Political Updates
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Economy Column */}
            <div className={`${themeClasses.economyBg} rounded-2xl p-6 ${themeClasses.economyBorder} border-2 shadow-2xl transition-colors duration-300`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Economy</h3>
                  <p className="text-white/80 text-sm">Financial & Economic News</p>
                </div>
              </div>

              {economyLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-4 animate-pulse">
                      <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : economyError || filteredEconomyArticles.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-white/50 mx-auto mb-4" />
                  <p className="text-white/80">No recent economy news available</p>
                </div>
              ) : (
                <div>
                  {filteredEconomyArticles.map((article, index) => (
                    <ArticleCard 
                      key={article.id} 
                      article={article} 
                      isMain={index === 0}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Politics Column */}
            <div className={`${themeClasses.politicsBg} rounded-2xl p-6 ${themeClasses.politicsBorder} border-2 shadow-2xl transition-colors duration-300`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Politics</h3>
                  <p className="text-white/80 text-sm">Government & Political News</p>
                </div>
              </div>

              {politicsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-4 animate-pulse">
                      <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : politicsError || filteredPoliticsArticles.length === 0 ? (
                <div className="text-center py-8">
                  <Building className="h-12 w-12 text-white/50 mx-auto mb-4" />
                  <p className="text-white/80">No recent politics news available</p>
                </div>
              ) : (
                <div>
                  {filteredPoliticsArticles.map((article, index) => (
                    <ArticleCard 
                      key={article.id} 
                      article={article} 
                      isMain={index === 0}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* View More Indonesian News */}
          <div className="text-center mt-8">
            <a
              href="/news"
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              View More Indonesian News
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className={`${themeClasses.background} py-12 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${themeClasses.text} mb-2 transition-colors duration-300`}>
              NEWS
            </h2>
            <div className={`w-24 h-1 ${themeClasses.accent} mx-auto mb-6`}></div>
            <p className={`${themeClasses.secondaryText} text-lg transition-colors duration-300`}>
              Stay updated with the latest news and developments
            </p>
          </div>

          {/* News Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
                <div key={i} className={`${themeClasses.cardBg} rounded-lg overflow-hidden animate-pulse transition-colors duration-300`}>
                  <div className={`h-40 ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <div className="p-4 space-y-3">
                    <div className={`h-4 ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4`}></div>
                    <div className={`h-3 ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2`}></div>
                    <div className={`h-3 ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3`}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className={`${themeClasses.secondaryText} text-lg transition-colors duration-300`}>Unable to load news articles</div>
              <p className={`${themeClasses.secondaryText} opacity-70 mt-2 transition-colors duration-300`}>Please try again later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredArticles.map((article, index) => (
                <div key={article.id} className="group">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${themeClasses.cardBg} rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${themeClasses.border} border`}
                  >
                    <div className="relative h-40">
                      {article.urlToImage ? (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center"><div class="w-12 h-12 ${themeClasses.accent} rounded-lg"></div></div>`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                          <div className={`w-12 h-12 ${themeClasses.accent} rounded-lg`}></div>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                          {article.source.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className={`font-bold text-sm ${themeClasses.text} leading-tight line-clamp-3 mb-3 group-hover:${themeClasses.accent} transition-colors`}>
                        {article.title}
                      </h3>
                      
                      <p className={`${themeClasses.secondaryText} text-xs leading-relaxed line-clamp-2 mb-3 transition-colors duration-300`}>
                        {article.description}
                      </p>
                      
                      <div className={`flex items-center justify-between text-xs ${themeClasses.secondaryText} transition-colors duration-300`}>
                        <span className="font-medium">{article.source.name}</span>
                        <span>{getTimeAgo(article.publishedAt)}</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* View More Button */}
          {!loading && !error && featuredArticles.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="/news"
                className={`inline-flex items-center px-8 py-3 ${themeClasses.accent} ${mode === 'dark' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-500 hover:bg-orange-600'} text-white font-medium rounded-lg transition-colors duration-300`}
              >
                View All News
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;