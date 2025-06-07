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
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'News', path: '/news' },
    { name: 'Gallery', path: '/gallery' },
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

  // Check if we're on the new home page
  const isHomePage = location.pathname === '/';

  // Hide certain elements in reader mode
  const readerHideClass = mode === 'reader' ? 'reader-hide' : '';

  return (
    <div className="min-h-screen bg-themed-secondary transition-theme">
      {/* Debug Overlay */}
      <DebugOverlay />

      {/* Modern Clock - Only show on non-home pages */}
      {!isHomePage && <ModernClock />}

      {/* Right Navigation - Only show on non-home pages */}
      {!isHomePage && <RightNavigation />}

      {/* Navigation Header - Only show on non-home pages */}
      {!isHomePage && (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${readerHideClass} ${
          isScrolled ? 'bg-themed-primary/95 backdrop-blur-sm shadow-sm' : 'bg-themed-primary'
        }`}>
          <nav className="container-custom">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 text-xl font-semibold text-themed-primary">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600">
                  <img
                    src="/WhatsApp Image 2025-05-18 at 06.19.27_919beb6a.jpg"
                    alt="Rofi Darmawan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Rofi Darmawan</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-primary-600'
                        : 'text-themed-secondary hover:text-themed-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Theme Toggle */}
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg text-themed-secondary hover:text-themed-primary hover:bg-themed-tertiary transition-colors duration-200"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-themed-primary bg-themed-primary">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-themed-secondary hover:text-themed-primary hover:bg-themed-secondary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </header>
      )}

      {/* Breadcrumbs - Only show on non-home pages and not in reader mode */}
      {!isHomePage && mode !== 'reader' && (
        <div className="pt-16 bg-themed-primary border-b border-themed-primary">
          <div className="container-custom py-4">
            <nav className="text-sm text-themed-tertiary">
              <Link to="/" className="hover:text-themed-secondary transition-colors duration-200">
                Home
              </Link>
              {location.pathname !== '/' && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-themed-primary">{getPageName(location.pathname)}</span>
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
        <footer className="bg-themed-tertiary text-themed-primary">
          <div className="container-custom py-12">
            <div className="text-center">
              <p className="text-themed-tertiary">
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