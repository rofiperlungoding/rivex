# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, minimalist design
- 🌙 Multiple theme modes (Light, Dark, Reader, Debug)
- 📱 Fully responsive design
- 🔄 Real-time news integration
- 🌤️ Weather widget
- 📸 Interactive gallery
- 📅 Timeline of achievements
- 🎯 Project showcase

## Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your API keys to the `.env` file:
   - Get a News API key from [newsapi.org](https://newsapi.org)
   - Get a Weather API key from [weatherapi.com](https://weatherapi.com)
   - Get a Finnhub API key from [finnhub.io](https://finnhub.io) for stock data

5. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## Deployment

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard:
   - `VITE_NEWS_API_KEY`
   - `VITE_WEATHER_API_KEY`
   - `VITE_FINNHUB_API_KEY`
   - `VITE_NEWS_API_URL` (optional)
   - `VITE_WEATHER_API_URL` (optional)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_NEWS_API_KEY` | News API key from newsapi.org | Yes |
| `VITE_WEATHER_API_KEY` | Weather API key from weatherapi.com | Yes |
| `VITE_FINNHUB_API_KEY` | Finnhub API key from finnhub.io | Yes |
| `VITE_NEWS_API_URL` | News API base URL | No |
| `VITE_WEATHER_API_URL` | Weather API base URL | No |
| `VITE_APP_URL` | Your deployed app URL | No |

## API Configuration

### News API

- Provider: [NewsAPI.org](https://newsapi.org)
- Free tier: 1000 requests/day
- Used for: Latest news section

### Weather API

- Provider: [WeatherAPI.com](https://weatherapi.com)
- Free tier: 1 million calls/month
- Used for: Weather widget in clock component

### Finnhub API

- Provider: [Finnhub.io](https://finnhub.io)
- Free tier: 60 API calls/minute
- Used for: Real-time stock data in ticker component

## Troubleshooting

### API Issues

1. **CORS Errors**: Make sure you're using the correct API endpoints and have valid API keys
2. **Rate Limiting**: Check if you've exceeded your API quotas
3. **Network Errors**: Verify your internet connection and API service status

### Build Issues

1. **Environment Variables**: Ensure all required environment variables are set
2. **Dependencies**: Run `npm install` to ensure all dependencies are installed
3. **TypeScript Errors**: Run `npm run lint` to check for type errors

## License

MIT License - see LICENSE file for details