import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Github, Instagram, ArrowRight, Clock } from 'lucide-react';
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
                alt="Rofi Darmawan"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Name and Title */}
            <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-wide">
              Rofi Darmawan
            </h1>
            <p className="text-xl md:text-2xl font-light mb-12 text-white/90 tracking-wide">
              Computer Science Student
            </p>

            {/* Minimal CTA */}
            <div className="flex justify-center space-x-8">
              <a
                href="mailto:opikopi32@gmail.com"
                className="group flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
                <span className="hidden sm:inline font-light">Contact</span>
              </a>
              <a
                href="https://github.com/rofiperlungoding"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
                <span className="hidden sm:inline font-light">Work</span>
              </a>
              <a
                href="https://www.instagram.com/rofidoesthings"
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
              <span className="text-primary-600">technology and art</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Passionate about the intersection of computation and visual arts, with a deep interest in 
              cinema, photography, and design. Constantly exploring new technologies while pursuing 
              personal growth and development.
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 tracking-wide">
                Latest News
              </h2>
              <a
                href="/news"
                className="group flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-300"
              >
                <span className="font-light">View all</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* News Articles */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                    <div className="flex space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-gray-500 font-light">Unable to load news at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Article Header with Thumbnail */}
                    <div className="flex space-x-4 mb-4">
                      {/* Mini Thumbnail */}
                      {article.urlToImage ? (
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={article.urlToImage}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center"><div class="w-6 h-6 bg-primary-400 rounded"></div></div>';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <div className="w-6 h-6 bg-primary-400 rounded"></div>
                        </div>
                      )}
                      
                      {/* Meta Information */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded truncate">
                            {article.source.name}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-400 text-xs">
                          <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span>{getTimeAgo(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Article Content */}
                    <h3 className="text-gray-900 font-medium mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300 leading-snug">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 font-light">
                      {article.description}
                    </p>
                  </a>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && featuredArticles.length === 0 && (
              <div className="text-center py-8">
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