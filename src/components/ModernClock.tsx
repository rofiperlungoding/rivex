import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Eye, Droplets, Thermometer } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  location: string;
  icon: string;
  feelsLike: number;
}

const ModernClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const { mode } = useTheme();
  const location = useLocation();

  // Weather API configuration
  const WEATHER_API_KEY = '2434caae723b409ca2b10726250706';
  const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

  // Update time every minute (since we removed seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    // Initial update
    setTime(new Date());

    return () => clearInterval(timer);
  }, []);

  // Fetch weather data using the provided API key
  useEffect(() => {
    const fetchWeatherByCoords = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          location: data.name,
          icon: data.weather[0].icon,
          feelsLike: Math.round(data.main.feels_like)
        };
      } catch (error) {
        console.error('Weather fetch error:', error);
        throw error;
      }
    };

    const fetchWeatherByCity = async (city: string) => {
      try {
        const response = await fetch(
          `${WEATHER_BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6),
          location: data.name,
          icon: data.weather[0].icon,
          feelsLike: Math.round(data.main.feels_like)
        };
      } catch (error) {
        console.error('Weather fetch error:', error);
        throw error;
      }
    };

    const initializeWeather = async () => {
      setWeatherLoading(true);
      setWeatherError(false);

      try {
        // First try to get user's location
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const weatherData = await fetchWeatherByCoords(latitude, longitude);
                setWeather(weatherData);
                setWeatherLoading(false);
              } catch (error) {
                console.warn('Geolocation weather fetch failed, trying default city');
                // Fallback to Jakarta
                try {
                  const weatherData = await fetchWeatherByCity('Jakarta');
                  setWeather(weatherData);
                } catch (fallbackError) {
                  console.error('Fallback weather fetch failed:', fallbackError);
                  setWeatherError(true);
                }
                setWeatherLoading(false);
              }
            },
            async (geoError) => {
              console.warn('Geolocation failed:', geoError.message);
              // Fallback to Jakarta when geolocation is denied/fails
              try {
                const weatherData = await fetchWeatherByCity('Jakarta');
                setWeather(weatherData);
              } catch (fallbackError) {
                console.error('Fallback weather fetch failed:', fallbackError);
                setWeatherError(true);
              }
              setWeatherLoading(false);
            },
            {
              timeout: 10000, // 10 second timeout
              enableHighAccuracy: false,
              maximumAge: 300000 // 5 minutes cache
            }
          );
        } else {
          // Geolocation not supported, use default city
          try {
            const weatherData = await fetchWeatherByCity('Jakarta');
            setWeather(weatherData);
          } catch (error) {
            console.error('Default weather fetch failed:', error);
            setWeatherError(true);
          }
          setWeatherLoading(false);
        }
      } catch (error) {
        console.error('Weather initialization failed:', error);
        setWeatherError(true);
        setWeatherLoading(false);
      }
    };

    initializeWeather();
    
    // Refresh weather every 10 minutes (API allows frequent calls)
    const weatherTimer = setInterval(initializeWeather, 10 * 60 * 1000);
    
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
    
    // More comprehensive weather condition mapping
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
      case 'thunderstorm':
        return <CloudRain {...iconProps} />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <Cloud {...iconProps} />;
      default:
        return <Cloud {...iconProps} />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return 'text-blue-500';
    if (temp <= 15) return 'text-blue-400';
    if (temp <= 25) return 'text-green-500';
    if (temp <= 30) return 'text-yellow-500';
    return 'text-red-500';
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
      <div className={`${styles.containerClasses} rounded-lg px-4 py-3 min-w-[240px] max-w-[280px]`}>
        <div className="space-y-2">
          {/* Time Section */}
          <div className="flex items-center justify-between">
            <div>
              <div className={`${styles.textClasses} font-mono text-lg font-semibold leading-none`}>
                {formatTime(time)}
              </div>
              <div className={`${styles.textClasses} opacity-70 text-xs mt-1 leading-none`}>
                {formatDate(time)}
              </div>
            </div>
            
            {/* Status indicator */}
            <div className={`w-2 h-2 rounded-full ${
              weatherError ? 'bg-red-400' : 
              weatherLoading ? 'bg-yellow-400 animate-pulse' : 
              mode === 'debug' ? 'bg-green-500' : 'bg-blue-500'
            }`} />
          </div>

          {/* Weather Section */}
          <div className="border-t border-opacity-20 pt-2">
            {weatherLoading ? (
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${
                  mode === 'debug' ? 'bg-green-500' : 'bg-blue-500'
                } animate-pulse`} />
                <div className={`${styles.textClasses} opacity-70 text-xs`}>
                  Loading weather...
                </div>
              </div>
            ) : weatherError ? (
              <div className="flex items-center space-x-2">
                <Eye className={`h-4 w-4 ${styles.textClasses} opacity-50`} />
                <div className={`${styles.textClasses} opacity-70 text-xs`}>
                  Weather unavailable
                </div>
              </div>
            ) : weather ? (
              <div className="space-y-2">
                {/* Main weather info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getWeatherIcon(weather.condition, weather.icon)}
                    <span className={`${styles.textClasses} text-sm font-medium capitalize`}>
                      {weather.description}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    mode === 'debug' ? 'text-green-400' : getTemperatureColor(weather.temperature)
                  }`}>
                    {weather.temperature}°C
                  </span>
                </div>
                
                {/* Location */}
                <div className={`${styles.textClasses} opacity-70 text-xs leading-none`}>
                  📍 {weather.location}
                </div>
                
                {/* Additional weather details */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Thermometer className="h-3 w-3 opacity-60" />
                    <span className={`${styles.textClasses} opacity-70`}>
                      {weather.feelsLike}°
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Droplets className="h-3 w-3 opacity-60" />
                    <span className={`${styles.textClasses} opacity-70`}>
                      {weather.humidity}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Wind className="h-3 w-3 opacity-60" />
                    <span className={`${styles.textClasses} opacity-70`}>
                      {weather.windSpeed}km/h
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernClock;