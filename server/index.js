const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const newsRoutes = require('./routes/news');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { logger } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Indonesian News API',
      version: '1.0.0',
      description: 'RESTful API for Indonesian news content from detik.com',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-api-domain.com' 
          : `http://localhost:${PORT}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      schemas: {
        NewsArticle: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the article'
            },
            title: {
              type: 'string',
              description: 'Article title'
            },
            description: {
              type: 'string',
              description: 'Article description or excerpt'
            },
            content: {
              type: 'string',
              description: 'Full article content'
            },
            url: {
              type: 'string',
              format: 'uri',
              description: 'Original article URL'
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
              description: 'Article image URL'
            },
            publishedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Publication date and time'
            },
            author: {
              type: 'string',
              description: 'Article author'
            },
            category: {
              type: 'string',
              description: 'Article category'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Article tags'
            },
            source: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Source name'
                },
                url: {
                  type: 'string',
                  format: 'uri',
                  description: 'Source URL'
                }
              }
            }
          },
          required: ['id', 'title', 'url', 'publishedAt']
        },
        NewsResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Request success status'
            },
            data: {
              type: 'object',
              properties: {
                articles: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/NewsArticle'
                  }
                },
                totalResults: {
                  type: 'integer',
                  description: 'Total number of articles found'
                },
                page: {
                  type: 'integer',
                  description: 'Current page number'
                },
                pageSize: {
                  type: 'integer',
                  description: 'Number of articles per page'
                },
                totalPages: {
                  type: 'integer',
                  description: 'Total number of pages'
                }
              }
            },
            message: {
              type: 'string',
              description: 'Response message'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Response timestamp'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Error message'
                },
                code: {
                  type: 'string',
                  description: 'Error code'
                },
                details: {
                  type: 'object',
                  description: 'Additional error details'
                }
              }
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Error timestamp'
            }
          }
        }
      }
    }
  },
  apis: ['./server/routes/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Indonesian News API Documentation'
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Indonesian News API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/news', newsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Indonesian News API',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/api/health'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.listen(PORT, () => {
  logger.info(`Indonesian News API server running on port ${PORT}`);
  logger.info(`Documentation available at http://localhost:${PORT}/api/docs`);
});

module.exports = app;