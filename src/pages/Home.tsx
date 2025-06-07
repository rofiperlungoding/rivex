import React, { useState, useEffect } from 'react';
import { useNews } from '../hooks/useNews';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import RightNavigation from '../components/RightNavigation';

const Home: React.FC = () => {
  const { articles, loading, error } = useNews();
  const { mode } = useTheme();

  // Filter and limit articles for featured stories
  const featuredArticles = articles
    .filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]'
    )
    .slice(0, 20); // Increased to 20 articles for more rows

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
          accent: 'text-orange-400'
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
          accent: 'text-orange-600'
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
          accent: 'text-yellow-400'
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
          accent: 'text-orange-500'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`min-h-screen ${themeClasses.background} transition-colors duration-300`}>
      {/* Theme Toggle and Right Navigation for Home Page */}
      <div className="fixed top-4 right-4 z-50">
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

      {/* Centered News Section */}
      <section className={`${themeClasses.background} py-12 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${themeClasses.text} mb-2 transition-colors duration-300`}>
              LATEST NEWS
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