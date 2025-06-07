import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronUp, Home, User, Briefcase, PenTool, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import DebugOverlay from './DebugOverlay';
import ModernClock from './ModernClock';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const location = useLocation();
  const { mode } = useTheme();

  const navigationItems = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'About', path: '/about', icon: <User className="h-4 w-4" /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase className="h-4 w-4" /> },
    { name: 'Blog', path: '/news', icon: <PenTool className="h-4 w-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="h-4 w-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 400);
      setIsScrolled(scrollY > 0);
      setShowQuickActions(scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white transition-all duration-300">
      {/* Debug Overlay */}
      <DebugOverlay />

      {/* Modern Clock - Only show on non-home pages */}
      {!isHomePage && <ModernClock />}

      {/* Fixed Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 text-xl font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span>Rivex</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-gray-900 ${
                    location.pathname === item.path
                      ? 'text-gray-900'
                      : 'text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex items-center space-x-2">
              {mode !== 'reader' && <ThemeToggle />}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-gray-900 bg-gray-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Quick Actions Sidebar - Only show when scrolled past header */}
      {showQuickActions && !isHomePage && mode !== 'reader' && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-2">
            <div className="flex flex-col space-y-2">
              {navigationItems.slice(0, 4).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-3 rounded-xl transition-all duration-200 group ${
                    location.pathname === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title={item.name}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`${isHomePage ? '' : 'pt-16'}`}>
        {children}
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 z-40"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Footer - Only show on non-home pages */}
      {!isHomePage && mode !== 'reader' && (
        <footer className="bg-gray-50 border-t border-gray-100">
          <div className="container-custom py-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">R</span>
                </div>
                <span className="text-lg font-medium text-gray-900">Rivex</span>
              </div>
              <p className="text-gray-600">
                © 2024 Rivex. Crafted with passion and purpose.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;