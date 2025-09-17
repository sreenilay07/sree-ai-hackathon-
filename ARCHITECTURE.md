# Sree AI - System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                          │
│                     (React 19 + TypeScript)                    │
├─────────────────────────────────────────────────────────────────┤
│  HomePage   │  Dashboard  │  Portfolio  │  Compare  │ Screener │
│     │       │      │      │      │      │     │     │     │    │
│     └───────┼──────┼──────┼──────┼──────┼─────┼─────┼─────┘    │
│             │      │      │      │      │     │     │          │
│         SearchBar  │   Chatbot   │   Charts   │  Tables       │
│                    │             │            │               │
└────────────────────┼─────────────┼────────────┼───────────────┘
                     │             │            │
┌────────────────────┼─────────────┼────────────┼───────────────┐
│                    │     HOOKS LAYER         │               │
│                    │  (State Management)     │               │
├────────────────────┼─────────────┼────────────┼───────────────┤
│          useStockAnalysis    │    usePortfolio   │            │
│                    │         │                  │            │
│                    │         │                  │            │
└────────────────────┼─────────────┼────────────┼───────────────┘
                     │             │            │
┌────────────────────┼─────────────┼────────────┼───────────────┐
│                         SERVICE LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│                              │                                │
│    stockService.ts           │        geminiService.ts        │
│    ┌─────────────────┐       │       ┌─────────────────────┐  │
│    │ Mock Data       │       │       │ AI Analysis         │  │
│    │ • 80+ Stocks    │       │       │ • Stock Analysis    │  │
│    │ • Price Data    │       │       │ • News Sentiment    │  │
│    │ • Fundamentals  │       │       │ • Portfolio Health  │  │
│    │ • News Items    │       │       │ • Natural Language  │  │
│    │ • Real-time Sim │       │       │ • Term Explanations │  │
│    └─────────────────┘       │       └─────────────────────┘  │
│                              │                │               │
└──────────────────────────────┼────────────────┼───────────────┘
                               │                │
┌──────────────────────────────┼────────────────┼───────────────┐
│                        EXTERNAL APIS                          │
├─────────────────────────────────────────────────────────────────┤
│                              │                                │
│         Mock Data            │      Google Gemini API         │
│       (In Memory)            │      (gemini-2.5-flash)        │
│                              │                                │
│  ┌─────────────────────┐     │     ┌─────────────────────┐   │
│  │ • Stock Prices      │     │     │ • AI Analysis       │   │
│  │ • Financial Ratios  │     │     │ • JSON Responses     │   │
│  │ • News Headlines    │     │     │ • Structured Output  │   │
│  │ • Corporate Actions │     │     │ • Context Awareness  │   │
│  └─────────────────────┘     │     └─────────────────────┘   │
│                              │                                │
└──────────────────────────────┼────────────────────────────────┘
                               │
┌──────────────────────────────┼────────────────────────────────┐
│                        BUILD & DEPLOYMENT                     │
├─────────────────────────────────────────────────────────────────┤
│                              │                                │
│      Vite Build Tool         │         AI Studio              │
│   ┌─────────────────────┐    │    ┌─────────────────────┐     │
│   │ • Fast HMR          │    │    │ • Static Hosting    │     │
│   │ • TypeScript        │    │    │ • Environment Vars  │     │
│   │ • Code Splitting    │    │    │ • CDN Distribution  │     │
│   │ • Optimizations     │    │    │ • Auto Deployment   │     │
│   └─────────────────────┘    │    └─────────────────────┘     │
│                              │                                │
└──────────────────────────────┼────────────────────────────────┘

DATA FLOW:
1. User Input → SearchBar/Navigation
2. Route Change → Page Component → useStockAnalysis Hook
3. Hook triggers → stockService (data) + geminiService (AI analysis)
4. AI processes → Stock data + News → Structured insights
5. Results render → Charts, Tables, Recommendations
6. Real-time updates → Price simulation every 5 seconds

KEY FEATURES ARCHITECTURE:
┌─────────────────────────────────────────────────────────────────┐
│                        AI INTEGRATION                          │
├─────────────────────────────────────────────────────────────────┤
│ Chatbot: Stock-specific system instructions + conversation     │
│ Analysis: Multi-dimensional scoring with justifications        │
│ Screening: Natural language → JSON criteria conversion         │
│ Explanations: Text selection → AI-powered definitions          │
│ Portfolio: Risk assessment + diversification recommendations   │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Integration Points

### Frontend to AI Service
- React components call custom hooks
- Hooks orchestrate service calls
- Services format data for AI consumption
- AI responses parsed and rendered

### AI Response Processing
```typescript
Gemini API Response (JSON) → Type Validation → React State → UI Components
```

### Real-time Simulation
```typescript
Mock Data → Price Algorithm → State Updates → Component Re-render
```

### Error Handling Flow
```typescript
Service Error → Hook Error State → UI Error Display → User Feedback
```