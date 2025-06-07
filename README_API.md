# Indonesian News API

A comprehensive RESTful API for fetching Indonesian news content from detik.com using web scraping techniques. This API provides structured access to Indonesian news articles with features like categorization, search, pagination, caching, and rate limiting.

## 🚀 Features

- **Real-time News Scraping**: Fetches latest news from detik.com
- **Category Support**: News, Finance, Sports, Technology, Health, and more
- **Advanced Search**: Search articles by keywords with relevance scoring
- **Date Filtering**: Filter articles by date range
- **Pagination**: Efficient pagination for large result sets
- **Caching**: Redis-like in-memory caching for improved performance
- **Rate Limiting**: Prevents API abuse with configurable limits
- **Indonesian Language Support**: Proper encoding for Indonesian characters
- **Comprehensive Documentation**: OpenAPI/Swagger documentation
- **Error Handling**: Robust error handling with detailed error responses
- **Logging**: Comprehensive logging for monitoring and debugging

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Internet connection for scraping

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd <project-directory>
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3001
API_BASE_URL=http://localhost:3001
```

4. **Start the development server**
```bash
npm run api:dev
```

5. **Start the production server**
```bash
npm run api:start
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:3001/api/docs`
- **Health Check**: `http://localhost:3001/api/health`

## 🔗 API Endpoints

### Health Check
```http
GET /api/health
```

### Latest News
```http
GET /api/news/latest?page=1&limit=20&category=news
```

**Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Articles per page (1-50, default: 20)
- `category` (optional): Filter by category

### News by Category
```http
GET /api/news/category/{category}?page=1&limit=20&dateFrom=2024-01-01&dateTo=2024-12-31
```

**Parameters:**
- `category` (required): One of: news, finance, sport, otomotif, properti, travel, food, health, wolipop, inet, edu, hot
- `page` (optional): Page number (default: 1)
- `limit` (optional): Articles per page (1-50, default: 20)
- `dateFrom` (optional): Start date (YYYY-MM-DD)
- `dateTo` (optional): End date (YYYY-MM-DD)

### Search News
```http
GET /api/news/search?q=jakarta&page=1&limit=20&category=news&sortBy=relevance
```

**Parameters:**
- `q` (required): Search query (minimum 2 characters)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Articles per page (1-50, default: 20)
- `category` (optional): Filter by category
- `sortBy` (optional): Sort by relevance, date, or popularity (default: relevance)
- `dateFrom` (optional): Start date (YYYY-MM-DD)
- `dateTo` (optional): End date (YYYY-MM-DD)

### Get Article by ID
```http
GET /api/news/{id}
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "unique-article-id",
        "title": "Article Title",
        "description": "Article description or excerpt",
        "content": "Full article content",
        "url": "https://detik.com/article-url",
        "imageUrl": "https://detik.com/image-url",
        "publishedAt": "2024-01-15T10:30:00.000Z",
        "author": "Author Name",
        "category": "news",
        "tags": ["tag1", "tag2"],
        "source": {
          "name": "Detik.com",
          "url": "https://detik.com"
        }
      }
    ],
    "totalResults": 150,
    "page": 1,
    "pageSize": 20,
    "totalPages": 8
  },
  "message": "Latest news retrieved successfully",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Invalid category. Valid categories: news, finance, sport...",
    "code": "INVALID_CATEGORY",
    "details": {
      "url": "/api/news/category/invalid",
      "method": "GET",
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🏷️ Categories

The API supports the following news categories:

| Category | Description | Detik Section |
|----------|-------------|---------------|
| `news` | General News | news |
| `finance` | Financial News | finance |
| `sport` | Sports News | sport |
| `otomotif` | Automotive | oto |
| `properti` | Property | properti |
| `travel` | Travel | travel |
| `food` | Food & Culinary | food |
| `health` | Health & Medical | health |
| `wolipop` | Lifestyle & Entertainment | wolipop |
| `inet` | Technology & Internet | inet |
| `edu` | Education | edu |
| `hot` | Trending News | hot |

## 🔧 Configuration

### Rate Limiting
- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Headers**: `X-RateLimit-*` headers included in responses

### Caching
- **Default TTL**: 5 minutes for latest news
- **Search TTL**: 10 minutes for search results
- **Article TTL**: 30 minutes for individual articles
- **Headers**: `X-Cache` header indicates HIT/MISS

### Logging
- **Log Files**: `server/logs/app.log` and `server/logs/error.log`
- **Log Levels**: INFO, WARN, ERROR, DEBUG
- **Rotation**: Manual log rotation recommended

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Test Coverage
- API endpoint testing
- Parameter validation
- Error handling
- Rate limiting
- Caching behavior
- Response format validation

## 📈 Performance Optimization

### Caching Strategy
- In-memory caching with configurable TTL
- Cache keys based on request URL and parameters
- Automatic cache invalidation
- Cache statistics available

### Rate Limiting
- IP-based rate limiting
- Configurable windows and limits
- Graceful degradation under load

### Error Handling
- Comprehensive error categorization
- Detailed error responses
- Automatic retry mechanisms
- Circuit breaker patterns

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Configurable cross-origin requests
- **Input Validation**: Comprehensive parameter validation
- **XSS Protection**: Input sanitization
- **Rate Limiting**: DDoS protection

## 🚀 Deployment

### Development
```bash
npm run api:dev
```

### Production
```bash
npm run api:start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY server/ ./server/
EXPOSE 3001
CMD ["npm", "run", "api:start"]
```

## 📝 Example Usage

### JavaScript/Node.js
```javascript
const axios = require('axios');

// Get latest news
const getLatestNews = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/news/latest');
    console.log(response.data.data.articles);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

// Search news
const searchNews = async (query) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/news/search?q=${query}`);
    console.log(response.data.data.articles);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
```

### Python
```python
import requests

# Get latest news
def get_latest_news():
    try:
        response = requests.get('http://localhost:3001/api/news/latest')
        response.raise_for_status()
        data = response.json()
        return data['data']['articles']
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return []

# Search news
def search_news(query):
    try:
        response = requests.get(f'http://localhost:3001/api/news/search?q={query}')
        response.raise_for_status()
        data = response.json()
        return data['data']['articles']
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return []
```

### cURL
```bash
# Get latest news
curl -X GET "http://localhost:3001/api/news/latest?page=1&limit=10"

# Search news
curl -X GET "http://localhost:3001/api/news/search?q=jakarta&sortBy=date"

# Get news by category
curl -X GET "http://localhost:3001/api/news/category/sport?limit=5"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This API is for educational and research purposes. Please respect detik.com's robots.txt and terms of service. Consider implementing appropriate delays between requests and respect rate limits to avoid overwhelming the source website.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the API documentation at `/api/docs`
- Review the test files for usage examples

## 🔄 Changelog

### v1.0.0
- Initial release
- Basic news scraping functionality
- Category support
- Search functionality
- Pagination and caching
- Comprehensive documentation
- Test suite