import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Github, Instagram, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { useNews } from '../hooks/useNews';

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { articles, loading, error } = useNews();

  // Curated background images with consistent mood and desaturated tones
  const backgroundImages = [
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
  ];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
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
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Filter and limit articles for home page display
  const featuredArticles = articles
    .filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]'
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero Section with Background Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover filter grayscale-[30%] brightness-75"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            {/* Profile Image */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl">
              <img
                src="/WhatsApp Image 2025-05-18 at 06.19.27_919beb6a.jpg"
                alt="Rivex"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Name and Title */}
            <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-wide">
              Rivex
            </h1>
            <p className="text-xl md:text-2xl font-light mb-12 text-white/90 tracking-wide">
              Innovation & Technology
            </p>

            {/* Minimal CTA */}
            <div className="flex justify-center space-x-8">
              <a
                href="mailto:contact@rivex.com"
                className="group flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
                <span className="hidden sm:inline font-light">Contact</span>
              </a>
              <a
                href="https://github.com/rivex"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
                <span className="hidden sm:inline font-light">Work</span>
              </a>
              <a
                href="https://www.instagram.com/rivex"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
                <span className="hidden sm:inline font-light">Life</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-all duration-300 animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-8 right-8 flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Brief Introduction Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-wide">
              Creating at the intersection of
              <br />
              <span className="text-primary-600">technology and innovation</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Passionate about pushing the boundaries of what's possible through technology. 
              Constantly exploring new frontiers in software development, artificial intelligence, 
              and digital innovation while building solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* News Section with Modern Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Latest News
                  </h2>
                  <p className="text-gray-600">Stay updated with current events</p>
                </div>
              </div>
              <a
                href="/news"
                className="group flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="font-medium">View all</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* News Articles */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-xl mb-6"></div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-gray-500 font-light">Unable to load news at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredArticles.map((article, index) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Article Image */}
                    {article.urlToImage ? (
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={article.urlToImage}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center"><div class="w-12 h-12 bg-primary-400 rounded-lg"></div></div>';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Source Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-xs font-semibold">
                            {article.source.name}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <div className="w-12 h-12 bg-primary-400 rounded-lg"></div>
                      </div>
                    )}
                    
                    {/* Article Content */}
                    <div className="p-6">
                      {/* Meta Information */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-400 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{getTimeAgo(article.publishedAt)}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300 leading-tight">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 font-light">
                        {article.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && featuredArticles.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-light">No news articles available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Minimal Navigation to Other Sections */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a
              href="/projects"
              className="group text-center p-8 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">Projects</h3>
              <p className="text-gray-600 font-light">Explore my work</p>
            </a>

            <a
              href="/gallery"
              className="group text-center p-8 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">Gallery</h3>
              <p className="text-gray-600 font-light">Visual journey</p>
            </a>

            <a
              href="/about"
              className="group text-center p-8 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                <span className="text-2xl">👋</span>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">About</h3>
              <p className="text-gray-600 font-light">Get to know me</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;