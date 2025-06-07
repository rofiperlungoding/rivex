import React, { useState, useEffect } from 'react';
import { useNews } from '../hooks/useNews';

const Home: React.FC = () => {
  const { articles, loading, error } = useNews();

  // Filter and limit articles for featured stories
  const featuredArticles = articles
    .filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]'
    )
    .slice(0, 6);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white relative z-20">
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
              <a href="/about" className="text-gray-700 hover:text-black font-medium transition-colors">
                About
              </a>
              <a href="/projects" className="text-gray-700 hover:text-black font-medium transition-colors">
                Project
              </a>
              <a href="/news" className="text-gray-700 hover:text-black font-medium transition-colors">
                News
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Simple Gradient */}
      <section className="bg-white pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl overflow-hidden relative h-80">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/image copy copy.png"
                alt="Team achievement"
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

      {/* Featured Stories Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8">
            {/* Left Column - Featured Stories Header */}
            <div className="col-span-1">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-black mb-1">
                  FEATURED STORIES
                </h2>
                <div className="w-16 h-1 bg-orange-500 mb-6"></div>
                
                <div className="text-sm text-orange-600 font-medium mb-6">
                  MORE NFL NEWS →
                </div>
              </div>
            </div>

            {/* Right Column - News Grid (3 columns) */}
            <div className="col-span-3">
              {loading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
                      <div className="h-32 bg-gray-200"></div>
                      <div className="p-3 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-gray-500">Unable to load featured stories</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {/* First large article spanning full width */}
                  {featuredArticles[0] && (
                    <div className="col-span-2">
                      <a
                        href={featuredArticles[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="relative h-48">
                          {featuredArticles[0].urlToImage ? (
                            <img
                              src={featuredArticles[0].urlToImage}
                              alt={featuredArticles[0].title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center"><div class="w-12 h-12 bg-orange-400 rounded-lg"></div></div>';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                              <div className="w-12 h-12 bg-orange-400 rounded-lg"></div>
                            </div>
                          )}
                          
                          {/* Overlay text */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                              {featuredArticles[0].title}
                            </h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                  
                  {/* Remaining articles in 2x2 grid */}
                  {featuredArticles.slice(1, 5).map((article, index) => (
                    <div key={article.id}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="relative h-32">
                          {article.urlToImage ? (
                            <img
                              src={article.urlToImage}
                              alt={article.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center"><div class="w-8 h-8 bg-orange-400 rounded"></div></div>';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                              <div className="w-8 h-8 bg-orange-400 rounded"></div>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-3">
                          <h3 className="font-bold text-sm text-black leading-tight line-clamp-2 mb-1">
                            {article.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{article.source.name}</span>
                            <span>{getTimeAgo(article.publishedAt)}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;