import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Configure proxy for development
  server: {
    proxy: mode === 'development' ? {
      '/api/news': {
        target: 'https://newsapi.org/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/news/, ''),
        headers: {
          'User-Agent': 'Portfolio-Website/1.0'
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('News API proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('News API request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('News API response:', proxyRes.statusCode, req.url);
          });
        },
      },
      '/api/indonesian-news': {
        target: 'https://berita-indo-api-next.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/indonesian-news/, '/api'),
        headers: {
          'User-Agent': 'Portfolio-Website/1.0',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Indonesian News API proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Indonesian News API request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Indonesian News API response:', proxyRes.statusCode, req.url);
          });
        },
      },
      '/api/weather': {
        target: 'https://api.weatherapi.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weather/, ''),
        headers: {
          'User-Agent': 'Portfolio-Website/1.0'
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Weather API proxy error:', err);
          });
        },
      }
    } : undefined
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    }
  },
  // Environment variable validation
  define: {
    __NEWS_API_CONFIGURED__: JSON.stringify(
      process.env.VITE_NEWS_API_KEY && 
      process.env.VITE_NEWS_API_KEY !== 'your_news_api_key_here'
    ),
    __WEATHER_API_CONFIGURED__: JSON.stringify(
      process.env.VITE_WEATHER_API_KEY && 
      process.env.VITE_WEATHER_API_KEY !== 'your_weather_api_key_here'
    )
  }
}));