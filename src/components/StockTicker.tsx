import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

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

const StockTicker: React.FC<TickerProps> = ({ className = '' }) => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
  const SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'NFLX', 'BTC-USD', 'ETH-USD'];

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

  // Initialize WebSocket connection
  const connectWebSocket = () => {
    // Check if API key is available
    if (!API_KEY) {
      console.warn('Finnhub API key not found. Using mock data.');
      setStockData(generateMockData());
      return;
    }
    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }

      const ws = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Finnhub WebSocket connected');
        setIsConnected(true);
        setError(null);
        
        // Subscribe to symbols
        SYMBOLS.forEach(symbol => {
          const subscribeMsg = JSON.stringify({
            type: 'subscribe',
            symbol: symbol === 'BTC-USD' || symbol === 'ETH-USD' ? symbol : symbol
          });
          ws.send(subscribeMsg);
        });
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'trade' && data.data) {
            data.data.forEach((trade: any) => {
              updateStockPrice(trade.s, trade.p);
            });
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error');
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnected(false);
        
        // Attempt to reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 5000);
      };

    } catch (err) {
      console.error('Failed to connect WebSocket:', err);
      setError('Failed to connect to real-time data');
      setIsConnected(false);
      
      // Use mock data as fallback
      setStockData(generateMockData());
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
    // Check if API key is available
    if (!API_KEY) {
      setStockData(generateMockData());
      return;
    }
    try {
      const promises = SYMBOLS.map(async (symbol) => {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
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
      setStockData(results.filter(stock => stock.price > 0));
      
    } catch (err) {
      console.error('Error fetching initial stock data:', err);
      setError('Failed to fetch stock data');
      
      // Use mock data as fallback
      setStockData(generateMockData());
    }
  };

  // Update mock data periodically when WebSocket is not available
  const updateMockData = () => {
    if (!isConnected) {
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

    // Update mock data every 5 seconds when not connected
    updateIntervalRef.current = setInterval(updateMockData, 5000);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
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
            <div className={`w-2 h-2 rounded-full mr-2 ${
              isConnected ? 'bg-green-400' : 'bg-yellow-400'
            }`} />
            <span className="text-gray-300">
              {isConnected ? 'LIVE' : 'DEMO'}
            </span>
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
          {error} - Using demo data
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