import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getApiConfig } from '../utils/apiConfig';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: number;
}

interface TickerProps {
  className?: string;
}

type ConnectionStatus = 'connecting' | 'live' | 'demo' | 'error' | 'reconnecting';

const StockTicker: React.FC<TickerProps> = ({ className = '' }) => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>('demo');
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  
  const wsRef = useRef<WebSocket | null>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const connectionStabilityRef = useRef<NodeJS.Timeout | null>(null);

  const config = getApiConfig();
  const SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'NFLX', 'BTC-USD', 'ETH-USD'];
  const MAX_RECONNECT_ATTEMPTS = 5;
  const BASE_RECONNECT_DELAY = 2000; // 2 seconds
  const CONNECTION_STABILITY_DELAY = 10000; // 10 seconds to consider connection stable

  // Fallback data for when WebSocket is not available
  const generateMockData = (): StockData[] => {
    return SYMBOLS.map(symbol => {
      const basePrice = symbol === 'BTC-USD' ? 45000 : symbol === 'ETH-USD' ? 3000 : Math.random() * 300 + 50;
      const change = (Math.random() - 0.5) * 10;
      const changePercent = (change / basePrice) * 100;
      
      return {
        symbol,
        price: basePrice + change,
        change,
        changePercent,
        timestamp: Date.now()
      };
    });
  };

  // Calculate exponential backoff delay
  const getReconnectDelay = (attempt: number): number => {
    return Math.min(BASE_RECONNECT_DELAY * Math.pow(2, attempt), 30000); // Max 30 seconds
  };

  // Clean up existing connection
  const cleanupConnection = () => {
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror = null;
      wsRef.current.onclose = null;
      
      if (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (connectionStabilityRef.current) {
      clearTimeout(connectionStabilityRef.current);
      connectionStabilityRef.current = null;
    }
  };

  // Initialize WebSocket connection with improved error handling
  const connectWebSocket = () => {
    // Check if API key is available
    if (!config.finnhub.isConfigured) {
      console.warn('Finnhub API key not found. Using mock data.');
      setStatus('demo');
      setStockData(generateMockData());
      setError(null);
      return;
    }

    // Don't attempt reconnection if we've exceeded max attempts
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.warn('Max reconnection attempts reached. Switching to demo mode.');
      setStatus('demo');
      setStockData(generateMockData());
      setError('Connection failed after multiple attempts. Using demo data.');
      return;
    }

    try {
      cleanupConnection();
      
      setStatus(reconnectAttempts > 0 ? 'reconnecting' : 'connecting');
      setError(null);

      const ws = new WebSocket(`${config.finnhub.wsUrl}?token=${config.finnhub.apiKey}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Finnhub WebSocket connected successfully');
        setStatus('live');
        setError(null);
        setReconnectAttempts(0); // Reset attempts on successful connection
        
        // Set a stability timer - only consider connection truly stable after some time
        connectionStabilityRef.current = setTimeout(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            console.log('WebSocket connection stabilized');
          }
        }, CONNECTION_STABILITY_DELAY);
        
        // Subscribe to symbols
        SYMBOLS.forEach(symbol => {
          const subscribeMsg = JSON.stringify({
            type: 'subscribe',
            symbol: symbol
          });
          ws.send(subscribeMsg);
        });
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'trade' && data.data && Array.isArray(data.data)) {
            data.data.forEach((trade: any) => {
              if (trade.s && typeof trade.p === 'number') {
                updateStockPrice(trade.s, trade.p);
              }
            });
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error occurred:', error);
        // Don't immediately set error status, let onclose handle it
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });

        // Clear stability timer
        if (connectionStabilityRef.current) {
          clearTimeout(connectionStabilityRef.current);
          connectionStabilityRef.current = null;
        }

        // Only attempt reconnection for unexpected closures
        if (!event.wasClean && event.code !== 1000) {
          const newAttempts = reconnectAttempts + 1;
          setReconnectAttempts(newAttempts);
          
          if (newAttempts < MAX_RECONNECT_ATTEMPTS) {
            const delay = getReconnectDelay(newAttempts - 1);
            console.log(`Scheduling reconnection attempt ${newAttempts} in ${delay}ms`);
            
            setStatus('reconnecting');
            setError(`Connection lost. Reconnecting... (${newAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              connectWebSocket();
            }, delay);
          } else {
            console.warn('Max reconnection attempts reached');
            setStatus('demo');
            setError('Connection failed. Using demo data.');
            setStockData(generateMockData());
          }
        } else {
          // Clean closure, switch to demo mode
          setStatus('demo');
          setStockData(generateMockData());
        }
      };

    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setStatus('error');
      setError('Failed to connect to real-time data');
      
      // Fallback to demo data
      setStockData(generateMockData());
      
      // Schedule retry if we haven't exceeded max attempts
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        const newAttempts = reconnectAttempts + 1;
        setReconnectAttempts(newAttempts);
        
        const delay = getReconnectDelay(newAttempts - 1);
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, delay);
      }
    }
  };

  // Update stock price in state
  const updateStockPrice = (symbol: string, newPrice: number) => {
    setStockData(prevData => {
      const existingIndex = prevData.findIndex(stock => stock.symbol === symbol);
      
      if (existingIndex >= 0) {
        const existing = prevData[existingIndex];
        const change = newPrice - existing.price;
        const changePercent = (change / existing.price) * 100;
        
        const updated = [...prevData];
        updated[existingIndex] = {
          ...existing,
          price: newPrice,
          change,
          changePercent,
          timestamp: Date.now()
        };
        
        return updated;
      } else {
        // New symbol
        return [...prevData, {
          symbol,
          price: newPrice,
          change: 0,
          changePercent: 0,
          timestamp: Date.now()
        }];
      }
    });
  };

  // Fetch initial data using REST API
  const fetchInitialData = async () => {
    if (!config.finnhub.isConfigured) {
      setStockData(generateMockData());
      return;
    }

    try {
      const promises = SYMBOLS.map(async (symbol) => {
        const response = await fetch(
          `${config.finnhub.restUrl}/quote?symbol=${symbol}&token=${config.finnhub.apiKey}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
          symbol,
          price: data.c || 0, // current price
          change: data.d || 0, // change
          changePercent: data.dp || 0, // change percent
          timestamp: Date.now()
        };
      });

      const results = await Promise.all(promises);
      const validResults = results.filter(stock => stock.price > 0);
      
      if (validResults.length > 0) {
        setStockData(validResults);
      } else {
        // If no valid data, use mock data
        setStockData(generateMockData());
      }
      
    } catch (err) {
      console.error('Error fetching initial stock data:', err);
      setStockData(generateMockData());
    }
  };

  // Update mock data periodically when not connected to live data
  const updateMockData = () => {
    if (status === 'demo') {
      setStockData(prevData => 
        prevData.map(stock => {
          const changeAmount = (Math.random() - 0.5) * 2; // Small random change
          const newPrice = Math.max(stock.price + changeAmount, 1);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;
          
          return {
            ...stock,
            price: newPrice,
            change: stock.change + change,
            changePercent: stock.changePercent + changePercent,
            timestamp: Date.now()
          };
        })
      );
    }
  };

  // Initialize data and connections
  useEffect(() => {
    fetchInitialData();
    connectWebSocket();

    // Update mock data every 5 seconds when in demo mode
    updateIntervalRef.current = setInterval(updateMockData, 5000);

    return () => {
      cleanupConnection();
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, []);

  // Format price based on symbol
  const formatPrice = (symbol: string, price: number): string => {
    if (symbol.includes('BTC') || symbol.includes('ETH')) {
      return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Format change
  const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  // Format percentage
  const formatPercent = (percent: number): string => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  // Get trend icon
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3" />;
    if (change < 0) return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  // Get color classes based on change
  const getColorClasses = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  // Get status display info
  const getStatusInfo = () => {
    switch (status) {
      case 'live':
        return { text: 'LIVE', color: 'bg-green-400', textColor: 'text-green-400' };
      case 'connecting':
        return { text: 'CONNECTING', color: 'bg-blue-400', textColor: 'text-blue-400' };
      case 'reconnecting':
        return { text: 'RECONNECTING', color: 'bg-yellow-400', textColor: 'text-yellow-400' };
      case 'error':
        return { text: 'ERROR', color: 'bg-red-400', textColor: 'text-red-400' };
      case 'demo':
      default:
        return { text: 'DEMO', color: 'bg-gray-400', textColor: 'text-gray-400' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="bg-gray-900 border-b border-gray-700 h-10 overflow-hidden">
        <div
          ref={tickerRef}
          className={`flex items-center h-full whitespace-nowrap ${
            isPaused ? '' : 'animate-scroll'
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            animation: isPaused ? 'none' : 'scroll 60s linear infinite'
          }}
        >
          {/* Connection Status */}
          <div className="flex items-center px-4 text-xs">
            <div className={`w-2 h-2 rounded-full mr-2 ${statusInfo.color} ${
              status === 'connecting' || status === 'reconnecting' ? 'animate-pulse' : ''
            }`} />
            <span className={`${statusInfo.textColor} font-medium`}>
              {statusInfo.text}
            </span>
            {reconnectAttempts > 0 && status === 'reconnecting' && (
              <span className="text-gray-400 ml-1">
                ({reconnectAttempts}/{MAX_RECONNECT_ATTEMPTS})
              </span>
            )}
          </div>

          {/* Stock Data */}
          {stockData.map((stock, index) => (
            <div
              key={`${stock.symbol}-${index}`}
              className="flex items-center px-6 text-sm font-medium border-r border-gray-700 last:border-r-0"
            >
              <span className="text-white font-bold mr-2">
                {stock.symbol}
              </span>
              <span className="text-gray-200 mr-2">
                {formatPrice(stock.symbol, stock.price)}
              </span>
              <div className={`flex items-center space-x-1 ${getColorClasses(stock.change)}`}>
                {getTrendIcon(stock.change)}
                <span className="text-xs">
                  {formatChange(stock.change)}
                </span>
                <span className="text-xs">
                  ({formatPercent(stock.changePercent)})
                </span>
              </div>
            </div>
          ))}

          {/* Duplicate for seamless scrolling */}
          {stockData.map((stock, index) => (
            <div
              key={`${stock.symbol}-duplicate-${index}`}
              className="flex items-center px-6 text-sm font-medium border-r border-gray-700 last:border-r-0"
            >
              <span className="text-white font-bold mr-2">
                {stock.symbol}
              </span>
              <span className="text-gray-200 mr-2">
                {formatPrice(stock.symbol, stock.price)}
              </span>
              <div className={`flex items-center space-x-1 ${getColorClasses(stock.change)}`}>
                {getTrendIcon(stock.change)}
                <span className="text-xs">
                  {formatChange(stock.change)}
                </span>
                <span className="text-xs">
                  ({formatPercent(stock.changePercent)})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white text-xs px-4 py-1 text-center">
          {error}
        </div>
      )}

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default StockTicker;