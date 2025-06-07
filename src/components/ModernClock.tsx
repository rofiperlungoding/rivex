import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Eye } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  icon: string;
}

const ModernClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const { mode } = useTheme();
  const location = useLocation();

  // Update time every minute (since we removed seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    // Initial update
    setTime(new Date());

    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError(false);

        // Get user's location
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              try {
                // Using OpenWeatherMap API (you'll need to get a free API key)
                const API_KEY = '13f426023f25454ba1d56c132ca2b120'; // This is a demo key, replace with actual key
                const response = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                );
                
                if (response.ok) {
                  const data = await response.json();
                  setWeather({
                    temperature: Math.round(data.main.temp),
                    condition: data.weather[0].main,
                    humidity: data.main.humidity,
                    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
                    location: data.name,
                    icon: data.weather[0].icon
                  });
                } else {
                  throw new Error('Weather API failed');
                }
              } catch (error) {
                console.warn('Weather fetch failed:', error);
                // Fallback to mock data
                setWeather({
                  temperature: 22,
                  condition: 'Clear',
                  humidity: 65,
                  windSpeed: 12,
                  location: 'Jakarta',
                  icon: '01d'
                });
              }
              setWeatherLoading(false);
            },
            () => {
              // Geolocation failed, use default location
              setWeather({
                temperature: 22,
                condition: 'Clear',
                humidity: 65,
                windSpeed: 12,
                location: 'Jakarta',
                icon: '01d'
              });
              setWeatherLoading(false);
            }
          );
        } else {
          // Geolocation not supported, use default
          setWeather({
            temperature: 22,
            condition: 'Clear',
            humidity: 65,
            windSpeed: 12,
            location: 'Jakarta',
            icon: '01d'
          });
          setWeatherLoading(false);
        }
      } catch (error) {
        console.warn('Weather initialization failed:', error);
        setWeatherError(true);
        setWeatherLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather every 30 minutes
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(weatherTimer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWeatherIcon = (condition: string, iconCode?: string) => {
    const iconProps = { className: "h-4 w-4" };
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun {...iconProps} />;
      case 'clouds':
        return <Cloud {...iconProps} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain {...iconProps} />;
      case 'snow':
        return <CloudSnow {...iconProps} />;
      default:
        return <Cloud {...iconProps} />;
    }
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
        containerClasses = "bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm";
        textClasses = "text-gray-700";
        break;
      case 'debug':
        containerClasses = "bg-gray-900/95 backdrop-blur-sm border border-green-500 shadow-green-500/20";
        textClasses = "text-green-400";
        break;
      case 'dark':
        containerClasses = "bg-gray-800/95 backdrop-blur-sm border border-gray-700 shadow-lg";
        textClasses = "text-gray-200";
        break;
      default: // light
        containerClasses = "bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm";
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
      <div className={`${styles.containerClasses} rounded-lg px-3 py-2 min-w-[200px]`}>
        <div className="flex items-center justify-between space-x-3">
          {/* Time Section */}
          <div className="flex-shrink-0">
            <div className={`${styles.textClasses} font-mono text-sm font-medium leading-none`}>
              {formatTime(time)}
            </div>
            <div className={`${styles.textClasses} opacity-70 text-xs mt-1 leading-none`}>
              {formatDate(time)}
            </div>
          </div>

          {/* Weather Section */}
          <div className="flex-1 min-w-0">
            {weatherLoading ? (
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${
                  mode === 'debug' ? 'bg-green-500' : 'bg-blue-500'
                } animate-pulse`} />
                <div className={`${styles.textClasses} opacity-70 text-xs`}>
                  Loading...
                </div>
              </div>
            ) : weatherError ? (
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 opacity-50" />
                <div className={`${styles.textClasses} opacity-70 text-xs`}>
                  Weather unavailable
                </div>
              </div>
            ) : weather ? (
              <div className="space-y-1">
                {/* Temperature and condition */}
                <div className="flex items-center space-x-2">
                  {getWeatherIcon(weather.condition, weather.icon)}
                  <span className={`${styles.textClasses} text-sm font-medium`}>
                    {weather.temperature}°C
                  </span>
                </div>
                
                {/* Location and additional info */}
                <div className={`${styles.textClasses} opacity-70 text-xs leading-none`}>
                  {weather.location}
                </div>
                
                {/* Additional weather details */}
                <div className="flex items-center space-x-3 text-xs opacity-60">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className={styles.textClasses}>{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Wind className="h-2 w-2" />
                    <span className={styles.textClasses}>{weather.windSpeed}km/h</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
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