import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import DebugOverlay from './DebugOverlay';
import RightNavigation from './RightNavigation';
import ModernClock from './ModernClock';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { mode } = useTheme();

  const navigationItems = [
    { name: 'About', path: '/about' },
    { name: 'News', path: '/news' },
    { name: 'Timeline', path: '/timeline' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 400);
      setIsScrolled(scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageName = (path: string) => {
    const item = navigationItems.find(item => item.path === path);
    return item?.name || 'Home';
  };

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

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
          border: 'border-gray-700',
          footerBg: 'bg-gray-800'
        };
      case 'reader':
        return {
          background: 'bg-white',
          headerBg: 'bg-white',
          text: 'text-gray-900',
          secondaryText: 'text-gray-600',
          cardBg: 'bg-white',
          border: 'border-gray-200',
          footerBg: 'bg-gray-50'
        };
      case 'debug':
        return {
          background: 'bg-gray-900',
          headerBg: 'bg-gray-900',
          text: 'text-green-400',
          secondaryText: 'text-cyan-400',
          cardBg: 'bg-gray-800',
          border: 'border-green-500',
          footerBg: 'bg-gray-800'
        };
      default: // light
        return {
          background: 'bg-white',
          headerBg: 'bg-white',
          text: 'text-black',
          secondaryText: 'text-gray-600',
          cardBg: 'bg-white',
          border: 'border-gray-100',
          footerBg: 'bg-gray-50'
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Hide certain elements in reader mode
  const readerHideClass = mode === 'reader' ? 'reader-hide' : '';

  return (
    <div className={`min-h-screen ${themeClasses.background} transition-colors duration-300`}>
      {/* Debug Overlay */}
      <DebugOverlay />

      {/* Modern Clock - Shows on ALL pages */}
      <ModernClock />

      {/* Right Navigation - Only show on non-home pages */}
      {!isHomePage && <RightNavigation />}

      {/* Theme Toggle - Positioned lower for all pages */}
      {!isHomePage && (
        <div className="fixed top-20 right-4 z-50">
          <ThemeToggle />
        </div>
      )}

      {/* Navigation Header - Consistent design across all pages */}
      <header className={`${themeClasses.headerBg} relative z-20 transition-colors duration-300 ${
        isScrolled && !isHomePage ? 'shadow-sm' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/Untitled design (1).png" 
                alt="rivex" 
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? mode === 'debug' 
                        ? 'text-green-400' 
                        : mode === 'dark'
                        ? 'text-white'
                        : 'text-black'
                      : `${themeClasses.secondaryText} hover:${themeClasses.text}`
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {isHomePage && <ThemeToggle />}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${themeClasses.secondaryText} hover:${themeClasses.text} transition-colors duration-200`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={`md:hidden py-4 border-t ${themeClasses.border} ${themeClasses.headerBg} transition-colors duration-300`}>
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? mode === 'debug'
                        ? 'text-green-400 bg-green-900/20'
                        : mode === 'dark'
                        ? 'text-white bg-gray-700'
                        : 'text-black bg-gray-100'
                      : `${themeClasses.secondaryText} hover:${themeClasses.text} hover:${themeClasses.cardBg}`
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumbs - Only show on non-home pages and not in reader mode */}
      {!isHomePage && mode !== 'reader' && (
        <div className={`${themeClasses.headerBg} ${themeClasses.border} border-b transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className={`text-sm ${themeClasses.secondaryText} transition-colors duration-300`}>
              <Link to="/" className={`hover:${themeClasses.text} transition-colors duration-200`}>
                Home
              </Link>
              {location.pathname !== '/' && (
                <>
                  <span className="mx-2">/</span>
                  <span className={themeClasses.text}>{getPageName(location.pathname)}</span>
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`${!isHomePage ? 'animate-fade-in' : ''} ${mode === 'reader' ? 'reader-content' : ''}`}>
        {children}
      </main>

      {/* Back to Top Button - Only show on non-home pages */}
      {!isHomePage && showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 z-40 ${readerHideClass}`}
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Footer - Only show on non-home pages and not in reader mode */}
      {!isHomePage && mode !== 'reader' && (
        <footer className={`${themeClasses.footerBg} ${themeClasses.text} transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center">
              <p className={themeClasses.secondaryText}>
                © 2024 Rofi Darmawan. Built with React, TypeScript, and Tailwind CSS.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;