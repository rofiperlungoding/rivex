import React, { useState, useEffect } from 'react';
import { useNews } from '../hooks/useNews';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import RightNavigation from '../components/RightNavigation';
import StockTicker from '../components/StockTicker';
import { 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  ExternalLink, 
  Globe, 
  MapPin, 
  Clock,
  Users,
  DollarSign,
  Building,
  Briefcase,
  Vote,
  Landmark
} from 'lucide-react';

const Home: React.FC = () => {
  // Fetch political news (general category often includes political stories)
  const { 
    articles: politicalArticles, 
    loading: politicalLoading, 
    error: politicalError 
  } = useNews('general');

  // Fetch business/economic news
  const { 
    articles: economicArticles, 
    loading: economicLoading, 
    error: economicError 
  } = useNews('business');

  const { mode } = useTheme();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Hero images array
  const heroImages = [
    "/image copy copy.png",
    "/image.png", 
    "/image copy.png",
    "/image copy copy copy.png",
    "/20230105_145528.jpg",
    "/image copy copy copy copy.png"
  ];

  // Auto-advance slideshow
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovered, heroImages.length]);

  // Filter and prioritize articles
  const filteredPoliticalArticles = politicalArticles
    .filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]' &&
      (article.title.toLowerCase().includes('government') ||
       article.title.toLowerCase().includes('election') ||
       article.title.toLowerCase().includes('policy') ||
       article.title.toLowerCase().includes('congress') ||
       article.title.toLowerCase().includes('senate') ||
       article.title.toLowerCase().includes('president') ||
       article.title.toLowerCase().includes('political') ||
       article.title.toLowerCase().includes('vote') ||
       article.title.toLowerCase().includes('law') ||
       article.title.toLowerCase().includes('court'))
    )
    .slice(0, 3);

  const filteredEconomicArticles = economicArticles
    .filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]'
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

  const truncateSummary = (text: string, maxWords: number = 75) => {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
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
          politicalBg: 'bg-gradient-to-br from-blue-900 to-indigo-900',
          politicalBorder: 'border-blue-600',
          politicalText: 'text-blue-200',
          economicBg: 'bg-gradient-to-br from-green-900 to-emerald-900',
          economicBorder: 'border-green-600',
          economicText: 'text-green-200'
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
          politicalBg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
          politicalBorder: 'border-blue-200',
          politicalText: 'text-blue-800',
          economicBg: 'bg-gradient-to-br from-green-50 to-emerald-100',
          economicBorder: 'border-green-200',
          economicText: 'text-green-800'
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
          politicalBg: 'bg-gradient-to-br from-blue-900 to-cyan-900',
          politicalBorder: 'border-blue-500',
          politicalText: 'text-blue-300',
          economicBg: 'bg-gradient-to-br from-green-900 to-cyan-900',
          economicBorder: 'border-green-500',
          economicText: 'text-green-300'
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
          politicalBg: 'bg-gradient-to-br from-blue-600 to-indigo-700',
          politicalBorder: 'border-blue-500',
          politicalText: 'text-white',
          economicBg: 'bg-gradient-to-br from-green-600 to-emerald-700',
          economicBorder: 'border-green-500',
          economicText: 'text-white'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`min-h-screen ${themeClasses.background} transition-colors duration-300`}>
      {/* Stock Ticker Bar */}
      <StockTicker />
      
      {/* Theme Toggle and Right Navigation for Home Page */}
      <div className="fixed top-24 right-4 z-50">
        <ThemeToggle />
      </div>
      <RightNavigation />

      {/* Header */}
      <header className={`${themeClasses.headerBg} relative z-20 transition-colors duration-300 mt-10`}>
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

      {/* Hero Section with Breaking News Banner */}
      <section className={`${themeClasses.background} pt-8 pb-12 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Breaking News Banner with Stock Ticker */}
          <div className="bg-red-600 text-white px-6 py-3 rounded-lg mb-6 flex items-center justify-between">
            <AlertTriangle className="h-5 w-5 mr-3 animate-pulse" />
            <div className="flex items-center">
              <span className="font-bold text-sm uppercase tracking-wide">Breaking News</span>
              <span className="mx-3">•</span>
              <span className="text-sm">Stay updated with the latest political and economic developments</span>
            </div>
          </div>

          {/* Stock Ticker in Breaking News Style */}
          <div className="mb-6">
            <StockTicker isBreakingNews={true} />
          </div>

          {/* Hero Image Slideshow */}
          <div 
            className="rounded-3xl overflow-hidden relative h-80"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Image Container */}
            <div className="absolute inset-0">
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hero slide ${index + 1}`}
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            
            {/* Gradient overlay */}
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
                  stay informed,
                  <br />
                  <span className="italic">stay ahead,</span>
                  <br />
                  <span className="italic">stay connected.</span>
                </h1>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-110' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main News Section - Two Column Layout */}
      <section className={`${themeClasses.background} py-16 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Globe className="h-6 w-6 text-blue-500" />
              <h2 className={`text-3xl font-bold ${themeClasses.text} transition-colors duration-300`}>
                TODAY'S TOP STORIES
              </h2>
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6`}></div>
            <p className={`${themeClasses.secondaryText} text-lg transition-colors duration-300`}>
              Political Developments & Economic Updates
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Political News Column */}
            <div className="space-y-6">
              <div className={`${themeClasses.politicalBg} rounded-2xl p-6 ${themeClasses.politicalBorder} border-2 shadow-2xl transition-colors duration-300`}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Vote className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Political News</h3>
                    <p className="text-white/80">Government & Policy Updates</p>
                  </div>
                </div>

                {politicalLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white/10 rounded-lg p-4 animate-pulse">
                        <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : politicalError || filteredPoliticalArticles.length === 0 ? (
                  <div className="text-center py-8">
                    <Landmark className="h-12 w-12 text-white/50 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">No Political News Available</h4>
                    <p className="text-white/80 text-sm">Unable to load political news at the moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPoliticalArticles.map((article, index) => (
                      <article
                        key={article.id}
                        className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all duration-300 hover:scale-105 backdrop-blur-sm group border border-white/20"
                      >
                        <div className="flex space-x-4">
                          {/* Article Image */}
                          {article.urlToImage && (
                            <div className="flex-shrink-0 w-20 h-20">
                              <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
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
                            <h4 className="font-bold text-white text-sm leading-tight mb-2 line-clamp-2 group-hover:text-blue-200 transition-colors duration-300">
                              {article.title}
                            </h4>
                            
                            <p className="text-white/80 text-xs leading-relaxed mb-3 line-clamp-3">
                              {truncateSummary(article.description, 50)}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                              <span className="font-medium">{article.source.name}</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{getTimeAgo(article.publishedAt)}</span>
                              </div>
                            </div>

                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-blue-200 hover:text-blue-100 font-medium transition-colors duration-200"
                            >
                              Read More
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* View More Political News */}
                {!politicalLoading && !politicalError && filteredPoliticalArticles.length > 0 && (
                  <div className="text-center mt-6">
                    <a
                      href="/news"
                      className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors duration-300 backdrop-blur-sm text-sm"
                    >
                      View All Political News
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Economic News Column */}
            <div className="space-y-6">
              <div className={`${themeClasses.economicBg} rounded-2xl p-6 ${themeClasses.economicBorder} border-2 shadow-2xl transition-colors duration-300`}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Economic News</h3>
                    <p className="text-white/80">Business & Market Updates</p>
                  </div>
                </div>

                {economicLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white/10 rounded-lg p-4 animate-pulse">
                        <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : economicError || filteredEconomicArticles.length === 0 ? (
                  <div className="text-center py-8">
                    <Building className="h-12 w-12 text-white/50 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">No Economic News Available</h4>
                    <p className="text-white/80 text-sm">Unable to load economic news at the moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEconomicArticles.map((article, index) => (
                      <article
                        key={article.id}
                        className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all duration-300 hover:scale-105 backdrop-blur-sm group border border-white/20"
                      >
                        <div className="flex space-x-4">
                          {/* Article Image */}
                          {article.urlToImage && (
                            <div className="flex-shrink-0 w-20 h-20">
                              <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
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
                            <h4 className="font-bold text-white text-sm leading-tight mb-2 line-clamp-2 group-hover:text-green-200 transition-colors duration-300">
                              {article.title}
                            </h4>
                            
                            <p className="text-white/80 text-xs leading-relaxed mb-3 line-clamp-3">
                              {truncateSummary(article.description, 50)}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                              <span className="font-medium">{article.source.name}</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{getTimeAgo(article.publishedAt)}</span>
                              </div>
                            </div>

                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-green-200 hover:text-green-100 font-medium transition-colors duration-200"
                            >
                              Read More
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* View More Economic News */}
                {!economicLoading && !economicError && filteredEconomicArticles.length > 0 && (
                  <div className="text-center mt-6">
                    <a
                      href="/news"
                      className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors duration-300 backdrop-blur-sm text-sm"
                    >
                      View All Economic News
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* News Summary Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className={`text-center p-6 ${themeClasses.cardBg} rounded-lg shadow-lg transition-colors duration-300`}>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {filteredPoliticalArticles.length}
              </div>
              <div className={`${themeClasses.secondaryText} transition-colors duration-300`}>Political Stories Today</div>
            </div>
            <div className={`text-center p-6 ${themeClasses.cardBg} rounded-lg shadow-lg transition-colors duration-300`}>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {filteredEconomicArticles.length}
              </div>
              <div className={`${themeClasses.secondaryText} transition-colors duration-300`}>Economic Updates</div>
            </div>
            <div className={`text-center p-6 ${themeClasses.cardBg} rounded-lg shadow-lg transition-colors duration-300`}>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {filteredPoliticalArticles.length + filteredEconomicArticles.length}
              </div>
              <div className={`${themeClasses.secondaryText} transition-colors duration-300`}>Total Stories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;