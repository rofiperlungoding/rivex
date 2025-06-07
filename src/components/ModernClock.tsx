import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
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

  // Weather API configuration
  const WEATHER_API_KEY = '2434caae723b409ca2b10726250706';
  const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1';

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);

    setTime(new Date());
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherByCoords = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=no`
        );
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
          temperature: Math.round(data.current.temp_c),
          condition: data.current.condition.text,
          location: data.location.name,
          icon: data.current.condition.icon
        };
      } catch (error) {
        console.error('Weather fetch error:', error);
        throw error;
      }
    };

    const fetchWeatherByCity = async (city: string) => {
      try {
        const response = await fetch(
          `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
        );
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
          temperature: Math.round(data.current.temp_c),
          condition: data.current.condition.text,
          location: data.location.name,
          icon: data.current.condition.icon
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
              timeout: 10000,
              enableHighAccuracy: false,
              maximumAge: 300000
            }
          );
        } else {
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

  const getWeatherIcon = (condition: string) => {
    const iconProps = { className: "h-4 w-4" };
    
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun {...iconProps} />;
      case 'rain':
      case 'drizzle':
      case 'light rain':
      case 'moderate rain':
      case 'heavy rain':
        return <CloudRain {...iconProps} />;
      case 'snow':
      case 'light snow':
      case 'moderate snow':
      case 'heavy snow':
        return <CloudSnow {...iconProps} />;
      default:
        return <Cloud {...iconProps} />;
    }
  };

  // Position and styling based on page and theme
  const getClockStyles = () => {
    const isHomePage = location.pathname === '/';
    
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
      default:
        containerClasses = "bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm";
        textClasses = "text-gray-700";
    }

    // Position based on page
    if (isHomePage) {
      position = "bottom-4 left-4";
    } else {
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
      <div className={`${styles.containerClasses} rounded-lg px-3 py-2`}>
        <div className="flex items-center space-x-4">
          {/* Time */}
          <div>
            <div className={`${styles.textClasses} font-mono text-lg font-semibold leading-none`}>
              {formatTime(time)}
            </div>
            <div className={`${styles.textClasses} opacity-70 text-xs mt-0.5 leading-none`}>
              {formatDate(time)}
            </div>
          </div>

          {/* Weather - Minimalist */}
          <div className="flex items-center space-x-2 border-l border-opacity-20 pl-4">
            {weatherLoading ? (
              <div className={`w-4 h-4 rounded-full bg-blue-500 animate-pulse`} />
            ) : weatherError ? (
              <div className={`${styles.textClasses} opacity-50 text-xs`}>--</div>
            ) : weather ? (
              <>
                {getWeatherIcon(weather.condition)}
                <div className="text-right">
                  <div className={`${styles.textClasses} text-sm font-semibold leading-none`}>
                    {weather.temperature}°
                  </div>
                  <div className={`${styles.textClasses} opacity-70 text-xs leading-none`}>
                    {weather.location}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernClock;