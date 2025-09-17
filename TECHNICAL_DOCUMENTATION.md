# Sree AI - Technical Stack Documentation

## Project Overview
**Sree AI** is an AI-powered stock market co-pilot designed specifically for Indian stock markets (NSE/BSE). The application provides intelligent stock analysis, recommendations, portfolio insights, and market screening capabilities through advanced AI integration.

---

## 1. Core Technology / AI Models

### Primary AI Framework
- **Google Gemini 2.5 Flash**: Our main AI engine for generating stock analysis, recommendations, and insights
- **Model Integration**: Using `@google/genai` SDK for direct integration with Google's Gemini API
- **AI Capabilities**:
  - Stock sentiment analysis from news data
  - Technical indicator interpretation
  - Fundamental analysis scoring
  - Portfolio health assessment
  - Stock screening and comparison
  - Natural language query processing for stock screening

### AI-Powered Features
- **Stock Analysis**: BUY/SELL/HOLD recommendations with detailed rationale
- **News Sentiment Analysis**: Automated analysis of financial news impact
- **Portfolio Optimization**: AI-driven portfolio diversification recommendations
- **Interactive Chatbot**: Context-aware stock-specific Q&A assistant
- **Stock Screening**: Natural language queries converted to technical criteria
- **Term Explanation**: On-demand explanation of financial terms via text selection

### AI Model Configuration
```typescript
// Gemini model configuration
const GEMINI_TEXT_MODEL = "gemini-2.5-flash";
config: {
  responseMimeType: "application/json",
  temperature: 0.6-0.7, // Balanced creativity vs consistency
}
```

---

## 2. Architecture Overview

### System Flow Diagram (in words):

```
Frontend (React SPA)
    ↓
Route Handler (React Router)
    ↓
Page Components (Home/Dashboard/Portfolio/etc.)
    ↓
Custom Hooks (useStockAnalysis)
    ↓
Service Layer
    ├── stockService.ts (Mock Data Management)
    └── geminiService.ts (AI Analysis)
            ↓
Google Gemini API
```

### Component Architecture:
- **Frontend**: React 19 with TypeScript, single-page application
- **State Management**: React hooks and local state (no external state library)
- **Routing**: React Router DOM with hash-based routing
- **UI Framework**: Tailwind CSS for styling, custom components
- **Charts**: Recharts library for data visualization
- **API Layer**: RESTful service pattern with mock data simulation

### Data Flow:
1. User searches for stock → SearchBar component
2. Navigation to StockDashboardPage with symbol parameter
3. useStockAnalysis hook fetches data via stockService
4. Parallel API calls for basic data, fundamentals, news
5. Data sent to geminiService for AI analysis
6. Results rendered in tabbed interface (Summary/Fundamentals/News)

---

## 3. Implementation Details

### Frontend Implementation
- **Framework**: React 19.1.0 with functional components and hooks
- **TypeScript**: Strongly typed throughout with comprehensive interfaces
- **Routing**: Hash-based routing for compatibility and deployment flexibility
- **Component Structure**:
  ```
  components/
  ├── charts/          # Data visualization components
  ├── chatbot/         # AI-powered chat interface
  ├── common/          # Reusable UI components
  ├── compare/         # Stock comparison features
  ├── layout/          # Page layout and navigation
  ├── portfolio/       # Portfolio management UI
  ├── screener/        # Stock screening interface
  ├── search/          # Stock search functionality
  └── stock/           # Stock analysis display
  ```

### Backend/AI Agent Logic
- **Mock Data Layer**: Comprehensive mock data for 80+ Indian stocks
- **AI Service Integration**: 
  - System instructions for consistent AI behavior
  - Structured JSON responses for reliability
  - Error handling and fallback mechanisms
- **Real-time Simulation**: Mock price updates every 5 seconds for live market feel

### Database/Data Management
- **Current**: In-memory mock data with realistic Indian stock information
- **Structure**: TypeScript interfaces defining data contracts
- **Categories**: Basic data, fundamentals, news, corporate announcements

### API Integration
- **Gemini API**: Primary AI service for analysis and recommendations
- **Mock Services**: Simulated real-time data with configurable delays
- **Error Handling**: Comprehensive try-catch blocks with user-friendly messages

---

## 4. Tools & Libraries

### Core Dependencies
```json
{
  "react": "^19.1.0",           // Latest React for modern features
  "react-dom": "^19.1.1",      // DOM manipulation
  "react-router-dom": "^6.25.1", // Client-side routing
  "@google/genai": "^0.15.0",   // Google Gemini AI integration
  "recharts": "^2.15.3"        // Charts and data visualization
}
```

### Development Tools
```json
{
  "typescript": "~5.8.2",       // Type safety and developer experience
  "vite": "^6.2.0",            // Fast build tool and dev server
  "@vitejs/plugin-react": "^5.0.0", // React plugin for Vite
  "@types/node": "^22.14.0"     // Node.js type definitions
}
```

### Why These Choices:
- **React 19**: Latest features, improved performance, modern hooks
- **Vite**: Extremely fast development and build times
- **TypeScript**: Type safety crucial for financial data accuracy
- **Gemini AI**: Advanced reasoning capabilities for stock analysis
- **Recharts**: React-native charting with good customization

---

## 5. Data Handling

### Data Collection
- **Mock Data Sources**: Comprehensive database of 80+ major Indian stocks
- **Real-time Simulation**: Price updates, volatility simulation
- **News Integration**: Mock news articles with realistic financial headlines
- **Corporate Actions**: Simulated dividend, split, and earnings announcements

### Data Processing
- **Input Validation**: TypeScript interfaces ensure data integrity
- **AI Processing**: Structured prompts convert raw data to insights
- **Response Parsing**: JSON parsing with error handling for AI responses
- **State Management**: React hooks manage component-level state

### Data Storage
- **Runtime Storage**: In-memory TypeScript objects and arrays
- **Session Persistence**: Browser storage for user interactions
- **No Database**: Current implementation uses mock data (ready for API integration)

### Data Security
- **API Key Management**: Environment variables for sensitive data
- **Client-side Protection**: API keys processed in build environment
- **Input Sanitization**: TypeScript types prevent injection attacks
- **Error Boundaries**: Graceful handling of data processing failures

---

## 6. Deployment

### Current Deployment Strategy
- **Platform**: Hosted on AI Studio (Google's platform)
- **Build Process**: Vite production build with optimizations
- **Deployment Type**: Static single-page application
- **Environment**: Client-side only (no server required)

### Build Configuration
```typescript
// vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    }
  };
});
```

### Deployment Options
1. **Current**: AI Studio (Google) - Direct integration
2. **Alternative Options**:
   - Vercel/Netlify for static hosting
   - AWS S3 + CloudFront for global CDN
   - GitHub Pages for open source deployment
   - Docker containerization for cloud deployment

### Environment Setup
- Node.js prerequisite for development
- `GEMINI_API_KEY` environment variable required
- Simple commands: `npm install` → `npm run dev`

---

## 7. Innovation Factor

### Unique Technical Solutions

#### 1. Intelligent Text Selection Explanations
- **Innovation**: Hover-to-explain functionality for financial terms
- **Implementation**: DOM event listeners with AI-powered explanations
- **User Experience**: Seamless learning without leaving the analysis page

#### 2. Context-Aware AI Chatbot
- **Innovation**: Stock-specific chatbot that maintains context
- **Implementation**: Dynamic system instructions per stock
- **Capability**: Answers questions about specific companies and sectors

#### 3. Natural Language Stock Screening
- **Innovation**: Convert plain English to technical stock criteria
- **Example**: "Show me IT stocks under ₹1500 with PE less than 25" → JSON criteria
- **AI Processing**: Gemini understands Indian market terminology

#### 4. Real-time Mock Market Simulation
- **Innovation**: Realistic price movements without real API dependency
- **Implementation**: Algorithmic price updates with volatility modeling
- **Benefits**: Demo-ready application with live market feel

#### 5. Comprehensive AI Scoring System
- **Innovation**: Multi-dimensional AI scoring (0-10 scale)
- **Categories**: Fundamentals, Valuation, Technicals, News Sentiment
- **Justification**: Each score includes AI-generated reasoning

### Technical Differentiators
- **Indian Market Focus**: Tailored prompts for NSE/BSE specific analysis
- **Integrated Experience**: No context switching between tools
- **AI-First Design**: Every feature enhanced by intelligent automation
- **Educational Component**: Built-in learning through explanations

---

## 8. Scalability & Future Improvements

### Immediate Scalability Enhancements

#### 1. Backend Infrastructure
```
Current: Client-only → Future: Node.js/Express backend
Benefits: 
- API rate limiting and caching
- User authentication and sessions
- Real-time WebSocket connections
- Database integration
```

#### 2. Database Integration
```
Current: Mock data → Future: MongoDB/PostgreSQL
Schema:
- User portfolios and watchlists
- Historical analysis cache
- Real-time price data
- News sentiment archives
```

#### 3. Real API Integration
```
Current: Mock data → Future: Multiple data sources
APIs:
- NSE/BSE official data feeds
- Financial news aggregators
- Economic indicators
- Corporate announcements
```

### Advanced Feature Roadmap

#### 1. Machine Learning Enhancements
- **Custom ML Models**: Train models on Indian market patterns
- **Ensemble AI**: Combine multiple AI models for better accuracy
- **Prediction Models**: Price movement and volatility forecasting
- **Risk Assessment**: Advanced portfolio risk analytics

#### 2. Real-time Features
- **Live Market Data**: WebSocket connections for instant updates
- **Price Alerts**: AI-driven notification system
- **Market News**: Real-time sentiment analysis
- **Portfolio Tracking**: Live P&L calculations

#### 3. Advanced Analytics
- **Backtesting**: Historical strategy performance testing
- **Sector Analysis**: Industry-wide trend analysis
- **Peer Comparison**: Automatic competitive benchmarking
- **ESG Scoring**: Environmental and governance factors

### Performance Optimizations

#### 1. Code Splitting
```typescript
// Dynamic imports for better loading
const StockDashboard = lazy(() => import('./pages/StockDashboardPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
```

#### 2. Caching Strategy
- **API Response Caching**: Redis for frequently accessed data
- **AI Response Caching**: Cache analysis for similar queries
- **Static Asset CDN**: Global content delivery optimization

#### 3. Database Optimization
- **Indexing Strategy**: Optimized queries for stock data
- **Data Partitioning**: Efficient historical data storage
- **Connection Pooling**: Scalable database connections

### Infrastructure Scaling

#### 1. Microservices Architecture
```
Frontend (React) → API Gateway → Services:
├── Stock Data Service (Node.js)
├── AI Analysis Service (Python/FastAPI)
├── User Management Service (Node.js)
├── Notification Service (Go)
└── Analytics Service (Python)
```

#### 2. Cloud Infrastructure
- **Kubernetes**: Container orchestration for auto-scaling
- **Load Balancers**: Distribute traffic across instances
- **Auto-scaling**: Dynamic resource allocation based on usage
- **Monitoring**: Comprehensive observability with alerts

#### 3. Global Deployment
- **Multi-region**: Deploy closer to user base
- **CDN Integration**: Fast asset delivery worldwide
- **Edge Computing**: Process data closer to users

### Technology Evolution Path

#### Year 1: Foundation
- [ ] Real API integration
- [ ] User authentication system
- [ ] Basic portfolio tracking
- [ ] Mobile responsive improvements

#### Year 2: Intelligence
- [ ] Custom ML model training
- [ ] Advanced portfolio analytics
- [ ] Real-time collaboration features
- [ ] Mobile application (React Native)

#### Year 3: Scale
- [ ] Microservices architecture
- [ ] International market expansion
- [ ] Advanced trading integration
- [ ] Institutional features

---

## Conclusion

Sree AI represents a modern approach to retail investment technology, combining the power of advanced AI with user-centric design. The technical foundation is solid and scalable, built with modern technologies and best practices. The innovative use of AI throughout the user journey sets it apart from traditional financial platforms, while the focus on the Indian market provides specialized value for domestic investors.

The architecture is designed for growth, with clear paths for scaling both technically and feature-wise. The modular design and comprehensive type system make it maintainable and extensible, ready for the next phase of development and real-world deployment.