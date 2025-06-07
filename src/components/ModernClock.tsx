import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';

const ModernClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { mode } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Position and styling based on page and theme
  const getClockStyles = () => {
    const isHomePage = location.pathname === '/';
    
    // Base styles
    let baseClasses = "fixed z-30 transition-all duration-300 select-none";
    let containerClasses = "";
    let textClasses = "";
    let position = "";

    // Theme-specific styling
    switch (mode) {
      case 'reader':
        containerClasses = "bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm";
        textClasses = "text-gray-700";
        break;
      case 'debug':
        containerClasses = "bg-gray-900/90 backdrop-blur-sm border border-green-500 shadow-green-500/20";
        textClasses = "text-green-400";
        break;
      case 'dark':
        containerClasses = "bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-lg";
        textClasses = "text-gray-200";
        break;
      default: // light
        containerClasses = "bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm";
        textClasses = "text-gray-700";
    }

    // Position based on page and theme
    if (isHomePage) {
      // On home page, position in bottom left, away from theme toggle
      position = "bottom-4 left-4";
    } else {
      // On other pages, position in top left, below header
      position = "top-20 left-4";
    }

    return {
      baseClasses: `${baseClasses} ${position}`,
      containerClasses,
      textClasses
    };
  };

  const styles = getClockStyles();

  return (
    <div className={styles.baseClasses}>
      <div className={`${styles.containerClasses} rounded-lg px-3 py-2 min-w-[120px]`}>
        {/* Time Display */}
        <div className={`${styles.textClasses} font-mono text-sm font-medium leading-none`}>
          {formatTime(time)}
        </div>
        
        {/* Date Display */}
        <div className={`${styles.textClasses} opacity-70 text-xs mt-1 leading-none`}>
          {formatDate(time)}
        </div>
        
        {/* Subtle indicator dot */}
        <div className={`absolute top-1 right-1 w-1 h-1 rounded-full ${
          mode === 'debug' ? 'bg-green-500' : 
          mode === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
        } animate-pulse`} />
      </div>
    </div>
  );
};

export default ModernClock;