import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Home, User, Briefcase, Newspaper, Camera, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}

const RightNavigation: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const { mode } = useTheme();

  const navigationItems: NavigationItem[] = [
    { 
      name: 'Home', 
      path: '/', 
      icon: <Home className="h-4 w-4" />,
      description: 'Back to homepage'
    },
    { 
      name: 'About', 
      path: '/about', 
      icon: <User className="h-4 w-4" />,
      description: 'Learn about me'
    },
    { 
      name: 'Projects', 
      path: '/projects', 
      icon: <Briefcase className="h-4 w-4" />,
      description: 'View my work'
    },
    { 
      name: 'News', 
      path: '/news', 
      icon: <Newspaper className="h-4 w-4" />,
      description: 'Latest updates'
    },
    { 
      name: 'Gallery', 
      path: '/gallery', 
      icon: <Camera className="h-4 w-4" />,
      description: 'Visual journey'
    },
    { 
      name: 'Timeline', 
      path: '/timeline', 
      icon: <Clock className="h-4 w-4" />,
      description: 'My journey'
    },
  ];

  // Track scroll position for section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section, [data-section]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const height = element.offsetHeight;
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(element.id || element.dataset.section || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Get current page info
  const currentPage = navigationItems.find(item => item.path === location.pathname);
  const currentIndex = navigationItems.findIndex(item => item.path === location.pathname);
  const prevPage = currentIndex > 0 ? navigationItems[currentIndex - 1] : null;
  const nextPage = currentIndex < navigationItems.length - 1 ? navigationItems[currentIndex + 1] : null;

  // Show simplified version on home page
  const isHomePage = location.pathname === '/';

  // Determine styling based on mode
  const getContainerClasses = () => {
    if (mode === 'reader') {
      return 'bg-white border-gray-200 shadow-sm';
    }
    if (mode === 'debug') {
      return 'bg-gray-900 border-green-500 shadow-green-500/20';
    }
    return 'bg-themed-primary border-themed-primary shadow-lg';
  };

  const getTextClasses = () => {
    if (mode === 'reader') {
      return {
        primary: 'text-gray-900',
        secondary: 'text-gray-600',
        tertiary: 'text-gray-500',
        hover: 'hover:text-gray-900 hover:bg-gray-100'
      };
    }
    if (mode === 'debug') {
      return {
        primary: 'text-green-400',
        secondary: 'text-cyan-400',
        tertiary: 'text-yellow-400',
        hover: 'hover:text-green-300 hover:bg-gray-800'
      };
    }
    return {
      primary: 'text-themed-primary',
      secondary: 'text-themed-secondary',
      tertiary: 'text-themed-tertiary',
      hover: 'hover:text-themed-primary hover:bg-themed-secondary'
    };
  };

  const textStyles = getTextClasses();

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
      <div className={`${getContainerClasses()} rounded-l-lg transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-12'
      }`}>
        
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full h-12 flex items-center justify-center ${textStyles.secondary} ${textStyles.hover} transition-colors duration-200`}
          aria-label={isExpanded ? 'Collapse navigation' : 'Expand navigation'}
        >
          {isExpanded ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className={`p-4 border-t ${mode === 'reader' ? 'border-gray-200' : mode === 'debug' ? 'border-green-500' : 'border-themed-secondary'}`}>
            
            {/* Current Page Info - Only show on non-home pages */}
            {!isHomePage && currentPage && (
              <div className={`mb-4 pb-4 border-b ${mode === 'reader' ? 'border-gray-200' : mode === 'debug' ? 'border-green-500' : 'border-themed-secondary'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={textStyles.secondary}>{currentPage.icon}</span>
                  <span className={`font-medium ${textStyles.primary} text-sm`}>
                    {currentPage.name}
                  </span>
                </div>
                <p className={`text-xs ${textStyles.tertiary}`}>
                  {currentPage.description}
                </p>
              </div>
            )}

            {/* Quick Navigation */}
            <div className="mb-4">
              <h4 className={`text-xs font-medium ${textStyles.secondary} mb-2 uppercase tracking-wide`}>
                {isHomePage ? 'Explore' : 'Quick Navigation'}
              </h4>
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-2 py-1.5 rounded text-xs transition-colors duration-200 ${
                      location.pathname === item.path
                        ? mode === 'reader' 
                          ? 'bg-blue-50 text-blue-700'
                          : mode === 'debug'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-primary-100 text-primary-700'
                        : `${textStyles.secondary} ${textStyles.hover}`
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Previous/Next Navigation - Only show on non-home pages and not in reader mode */}
            {!isHomePage && mode !== 'reader' && (
              <div className="space-y-2">
                {prevPage && (
                  <Link
                    to={prevPage.path}
                    className={`flex items-center space-x-2 px-2 py-2 rounded transition-colors duration-200 group ${
                      mode === 'debug' 
                        ? 'bg-gray-800 hover:bg-gray-700' 
                        : 'bg-themed-secondary hover:bg-themed-tertiary'
                    }`}
                  >
                    <ChevronLeft className={`h-3 w-3 ${textStyles.tertiary} group-hover:${textStyles.secondary}`} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs ${textStyles.tertiary}`}>Previous</div>
                      <div className={`text-xs font-medium ${textStyles.primary} truncate`}>
                        {prevPage.name}
                      </div>
                    </div>
                  </Link>
                )}
                
                {nextPage && (
                  <Link
                    to={nextPage.path}
                    className={`flex items-center space-x-2 px-2 py-2 rounded transition-colors duration-200 group ${
                      mode === 'debug' 
                        ? 'bg-gray-800 hover:bg-gray-700' 
                        : 'bg-themed-secondary hover:bg-themed-tertiary'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs ${textStyles.tertiary}`}>Next</div>
                      <div className={`text-xs font-medium ${textStyles.primary} truncate`}>
                        {nextPage.name}
                      </div>
                    </div>
                    <ChevronRight className={`h-3 w-3 ${textStyles.tertiary} group-hover:${textStyles.secondary}`} />
                  </Link>
                )}
              </div>
            )}

            {/* Page Progress Indicator - Only show on non-home pages and not in reader mode */}
            {!isHomePage && mode !== 'reader' && (
              <div className={`mt-4 pt-4 border-t ${mode === 'debug' ? 'border-green-500' : 'border-themed-secondary'}`}>
                <div className={`flex items-center justify-between text-xs ${textStyles.tertiary} mb-1`}>
                  <span>Progress</span>
                  <span>{currentIndex + 1}/{navigationItems.length}</span>
                </div>
                <div className={`w-full rounded-full h-1 ${mode === 'debug' ? 'bg-gray-700' : 'bg-themed-secondary'}`}>
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      mode === 'debug' ? 'bg-green-500' : 'bg-primary-600'
                    }`}
                    style={{ width: `${((currentIndex + 1) / navigationItems.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Home Page Special Content */}
            {isHomePage && (
              <div className={`mt-4 pt-4 border-t ${mode === 'reader' ? 'border-gray-200' : mode === 'debug' ? 'border-green-500' : 'border-themed-secondary'}`}>
                <h4 className={`text-xs font-medium ${textStyles.secondary} mb-2 uppercase tracking-wide`}>
                  Quick Access
                </h4>
                <div className="space-y-2">
                  <a
                    href="mailto:opikopi32@gmail.com"
                    className={`flex items-center space-x-2 px-2 py-1.5 rounded text-xs ${textStyles.secondary} ${textStyles.hover} transition-colors duration-200`}
                  >
                    <span>📧</span>
                    <span>Contact Me</span>
                  </a>
                  <a
                    href="https://github.com/rofiperlungoding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-2 py-1.5 rounded text-xs ${textStyles.secondary} ${textStyles.hover} transition-colors duration-200`}
                  >
                    <span>💻</span>
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.instagram.com/rofidoesthings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-2 py-1.5 rounded text-xs ${textStyles.secondary} ${textStyles.hover} transition-colors duration-200`}
                  >
                    <span>📸</span>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            )}

            {/* Reader Mode Special Content */}
            {mode === 'reader' && !isHomePage && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">
                  Reading Tools
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
                  >
                    <span>⬆️</span>
                    <span>Back to Top</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
                  >
                    <span>🖨️</span>
                    <span>Print Article</span>
                  </button>
                </div>
              </div>
            )}

            {/* Debug Mode Special Content */}
            {mode === 'debug' && !isHomePage && (
              <div className="mt-4 pt-4 border-t border-green-500">
                <h4 className="text-xs font-medium text-cyan-400 mb-2 uppercase tracking-wide">
                  Debug Tools
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => console.log('Current page:', location.pathname)}
                    className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs text-cyan-400 hover:text-green-300 hover:bg-gray-800 transition-colors duration-200 w-full text-left"
                  >
                    <span>🔍</span>
                    <span>Log Page Info</span>
                  </button>
                  <button
                    onClick={() => console.log('Performance:', performance.now())}
                    className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs text-cyan-400 hover:text-green-300 hover:bg-gray-800 transition-colors duration-200 w-full text-left"
                  >
                    <span>⚡</span>
                    <span>Check Performance</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collapsed State Indicator */}
        {!isExpanded && currentPage && !isHomePage && (
          <div className={`p-2 border-t ${mode === 'reader' ? 'border-gray-200' : mode === 'debug' ? 'border-green-500' : 'border-themed-secondary'}`}>
            <div className="flex flex-col items-center space-y-1">
              <span className={textStyles.secondary}>{currentPage.icon}</span>
              <div className={`w-1 h-1 rounded-full ${mode === 'debug' ? 'bg-green-500' : 'bg-primary-600'}`} />
            </div>
          </div>
        )}

        {/* Collapsed State for Home Page */}
        {!isExpanded && isHomePage && (
          <div className={`p-2 border-t ${mode === 'reader' ? 'border-gray-200' : mode === 'debug' ? 'border-green-500' : 'border-themed-secondary'}`}>
            <div className="flex flex-col items-center space-y-1">
              <Home className={`h-4 w-4 ${textStyles.secondary}`} />
              <div className={`w-1 h-1 rounded-full ${mode === 'debug' ? 'bg-green-500' : 'bg-primary-600'}`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightNavigation;