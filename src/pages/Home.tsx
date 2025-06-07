import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, Users, TrendingUp, Calendar } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">rivex</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                About
              </a>
              <a href="/projects" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Project
              </a>
              <a href="/news" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                News
              </a>
              <a href="/gallery" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Gallery
              </a>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  grow anywhere,
                  <br />
                  <span className="italic">anytime,</span>
                  <br />
                  <span className="italic">anyone.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Empowering individuals and teams to reach their full potential through innovative solutions and collaborative growth.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2">
                  <span>Start Growing</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/WhatsApp Image 2025-05-18 at 06.19.27_919beb6a.jpg"
                  alt="Team collaboration"
                  className="w-full h-96 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-6 right-6">
                  <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold">
                    rivex
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    grow anywhere, anytime, anyone.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Featured Stories Header */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  FEATURED STORIES
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-400 pl-4">
                    <div className="text-sm text-gray-600">MORE NFL NEWS</div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">2023</div>
                      <div className="text-gray-600">dfbsaorsabvouarfbvuiar</div>
                      <div className="text-gray-600">bsvoarsjfvsarv</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">2023</div>
                      <div className="text-gray-600">dfbsaorsabvouarfbvuiar</div>
                      <div className="text-gray-600">bsvoarsjfvsarv</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">2023</div>
                      <div className="text-gray-600">dfbsaorsabvouarfbvuiar</div>
                      <div className="text-gray-600">bsvoarsjfvsarv</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">2023</div>
                      <div className="text-gray-600">dfbsaorsabvouarfbvuiar</div>
                      <div className="text-gray-600">bsvoarsjfvsarv</div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <a href="/timeline" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Timeline
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - News Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-gray-500">Unable to load featured stories</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredArticles.map((article, index) => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 ${
                        index === 0 ? 'md:col-span-2' : ''
                      }`}
                    >
                      {/* Article Image */}
                      <div className={`relative overflow-hidden ${index === 0 ? 'h-64' : 'h-48'}`}>
                        {article.urlToImage ? (
                          <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {article.source.name}
                          </span>
                        </div>

                        {/* Featured Badge for first article */}
                        {index === 0 && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                              <Star className="h-3 w-3" />
                              <span>Featured</span>
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Article Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {getTimeAgo(article.publishedAt)}
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        
                        <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 leading-tight ${
                          index === 0 ? 'text-xl line-clamp-2' : 'text-lg line-clamp-2'
                        }`}>
                          {article.title}
                        </h3>
                        
                        {index === 0 && (
                          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                            {article.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          {article.author && (
                            <p className="text-sm text-gray-500 truncate">
                              By {article.author}
                            </p>
                          )}
                          <div className="flex items-center space-x-1 text-orange-600">
                            <span className="text-sm font-medium">Read more</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Rivex?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the features that make our platform the perfect choice for your growth journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Collaborative Growth
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Work together with teams and individuals to achieve shared goals and accelerate personal development.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Data-Driven Insights
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Make informed decisions with comprehensive analytics and insights that track your progress over time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Personalized Experience
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored recommendations and customized learning paths designed specifically for your unique goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">rivex</h3>
              <p className="text-gray-400 leading-relaxed">
                Empowering growth through innovative solutions and collaborative experiences.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
                <li><a href="/news" className="text-gray-400 hover:text-white transition-colors">News</a></li>
                <li><a href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/timeline" className="text-gray-400 hover:text-white transition-colors">Timeline</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/rofiperlungoding" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="https://www.instagram.com/rofidoesthings" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="mailto:opikopi32@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Rivex. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;