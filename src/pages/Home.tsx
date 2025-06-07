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

      {/* Hero Section with Seamless Gradient Transition */}
      <section className="relative">
        {/* Background container with seamless transition */}
        <div className="relative">
          {/* Main hero container */}
          <div className="max-w-7xl mx-auto px-6 pt-8 pb-12">
            <div className="rounded-3xl overflow-hidden relative h-80">
              {/* Full Background Image */}
              <div className="absolute inset-0">
                <img
                  src="/image copy copy.png"
                  alt="Team achievement"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Multi-layer Gradient System for Seamless Transition */}
              {/* Base ambient gradient matching image warmth */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-800/15 to-yellow-700/10"></div>
              
              {/* Cinematic vignette for depth */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30"></div>
              
              {/* Text readability gradient - localized to bottom-right */}
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-black/70 via-black/40 to-transparent"></div>
              
              {/* Subtle top fade for logo area */}
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-black/30 via-black/10 to-transparent"></div>
              
              {/* Edge softening gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/3 via-transparent to-white/8"></div>
              
              {/* Content Overlay */}
              <div className="relative z-10 flex items-center justify-between h-full p-8">
                {/* Top right logo - Enhanced visibility */}
                <div className="absolute top-8 right-8">
                  <div className="relative">
                    {/* Logo backdrop for better contrast */}
                    <div className="absolute inset-0 -inset-2 bg-black/20 rounded-lg blur-sm"></div>
                    <img 
                      src="/Untitled design (2).png" 
                      alt="rivex" 
                      className="relative h-6 w-auto drop-shadow-2xl filter brightness-110"
                    />
                  </div>
                </div>
                
                {/* Bottom right text with enhanced gradient */}
                <div className="absolute bottom-8 right-8 text-right">
                  {/* Enhanced text backdrop with multiple layers */}
                  <div className="absolute inset-0 -inset-x-12 -inset-y-6">
                    {/* Primary text background */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-transparent rounded-2xl"></div>
                    {/* Secondary depth layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl"></div>
                    {/* Subtle warm tint matching image */}
                    <div className="absolute inset-0 bg-gradient-to-tl from-amber-900/20 via-orange-800/10 to-transparent rounded-2xl"></div>
                  </div>
                  
                  {/* Text content with enhanced styling */}
                  <div className="relative z-10">
                    <h1 className="text-white text-4xl font-light leading-tight drop-shadow-2xl filter brightness-110">
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
          </div>
          
          {/* Seamless transition to background */}
          <div className="absolute -bottom-12 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
        </div>
      </section>

      {/* Featured Stories Section with Enhanced Transition */}
      <section className="bg-white relative z-10">
        {/* Subtle top gradient for seamless blend */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-50/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8">
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