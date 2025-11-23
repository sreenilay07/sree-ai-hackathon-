
import { StockIdentifier, StockBasicData, StockFundamentalData, NewsItemRaw, CorporateAnnouncement, PriceDataPoint, ChartInterval, ScreenerCriteria } from '../types';
import { MOCK_API_DELAY } from '../constants';

// --- MOCK DATA FOR DISCOVERY/AUTOCOMPLETE ONLY ---
// We keep this list to allow users to easily search for popular stocks.

const mockStocks: StockIdentifier[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', exchange: 'NSE' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.', exchange: 'NSE' },
  { symbol: 'INFY', name: 'Infosys Ltd.', exchange: 'NSE' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', exchange: 'NSE' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', exchange: 'NSE' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', exchange: 'NSE' },
  { symbol: 'ITC', name: 'ITC Ltd.', exchange: 'NSE' },
  { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd.', exchange: 'NSE' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd.', exchange: 'NSE' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', exchange: 'NSE' },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd.', exchange: 'NSE' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd.', exchange: 'NSE' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd.', exchange: 'NSE' },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd.', exchange: 'NSE' },
  { symbol: 'TITAN', name: 'Titan Company Ltd.', exchange: 'NSE' },
  { symbol: 'WIPRO', name: 'Wipro Ltd.', exchange: 'NSE' },
  { symbol: 'NESTLEIND', name: 'Nestle India Ltd.', exchange: 'NSE' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd.', exchange: 'NSE' },
  { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd.', exchange: 'NSE' },
  { symbol: 'DMART', name: 'Avenue Supermarts Ltd.', exchange: 'NSE' },
  { symbol: 'PIDILITIND', name: 'Pidilite Industries Ltd.', exchange: 'NSE' },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd.', exchange: 'NSE' },
  { symbol: 'HCLTECH', name: 'HCL Technologies Ltd.', exchange: 'NSE' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd.', exchange: 'NSE' },
  { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd.', exchange: 'NSE' },
  { symbol: 'TATASTEEL', name: 'Tata Steel Ltd.', exchange: 'NSE' },
  { symbol: 'M&M', name: 'Mahindra & Mahindra Ltd.', exchange: 'NSE' },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd.', exchange: 'NSE' },
  { symbol: 'ADANIPORTS', name: 'Adani Ports and SEZ Ltd.', exchange: 'NSE' },
  { symbol: 'NTPC', name: 'NTPC Ltd.', exchange: 'NSE' },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Ltd.', exchange: 'NSE' },
  { symbol: 'COALINDIA', name: 'Coal India Ltd.', exchange: 'NSE' },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corporation Ltd.', exchange: 'NSE' },
  { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd.', exchange: 'NSE' },
  { symbol: 'CIPLA', name: 'Cipla Ltd.', exchange: 'NSE' },
  { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories Ltd.', exchange: 'NSE' },
  { symbol: 'BRITANNIA', name: 'Britannia Industries Ltd.', exchange: 'NSE' },
  { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd.', exchange: 'NSE' },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd.', exchange: 'NSE' },
  { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd.', exchange: 'NSE' },
  { symbol: 'GRASIM', name: 'Grasim Industries Ltd.', exchange: 'NSE' },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank Ltd.', exchange: 'NSE' },
  { symbol: 'TECHM', name: 'Tech Mahindra Ltd.', exchange: 'NSE' },
  { symbol: 'HDFCLIFE', name: 'HDFC Life Insurance Company Ltd.', exchange: 'NSE' },
  { symbol: 'SBILIFE', name: 'SBI Life Insurance Company Ltd.', exchange: 'NSE' },
  { symbol: 'LTIM', name: 'LTIMindtree Ltd.', exchange: 'NSE' },
  { symbol: 'ADANIGREEN', name: 'Adani Green Energy Ltd.', exchange: 'NSE' },
  { symbol: 'ADANIPOWER', name: 'Adani Power Ltd.', exchange: 'NSE' },
  { symbol: 'TATAPOWER', name: 'Tata Power Company Ltd.', exchange: 'NSE' },
  { symbol: 'TATACONSUM', name: 'Tata Consumer Products Ltd.', exchange: 'NSE' },
  { symbol: 'ZOMATO', name: 'Zomato Ltd.', exchange: 'NSE' },
  { symbol: 'PAYTM', name: 'One97 Communications Ltd. (Paytm)', exchange: 'NSE' },
  { symbol: 'POLICYBZR', name: 'PB Fintech Ltd. (Policybazaar)', exchange: 'NSE' },
  { symbol: 'NYKAA', name: 'FSN E-Commerce Ventures Ltd. (Nykaa)', exchange: 'NSE' },
  { symbol: 'IRCTC', name: 'Indian Railway Catering & Tourism Corp Ltd.', exchange: 'NSE' },
  { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Ltd.', exchange: 'NSE' },
  { symbol: 'IOC', name: 'Indian Oil Corporation Ltd.', exchange: 'NSE' },
  { symbol: 'RECLTD', name: 'REC Ltd.', exchange: 'NSE' },
  { symbol: 'PFC', name: 'Power Finance Corporation Ltd.', exchange: 'NSE' },
  { symbol: 'BANKBARODA', name: 'Bank of Baroda', exchange: 'NSE' },
  { symbol: 'PNB', name: 'Punjab National Bank', exchange: 'NSE' },
  { symbol: 'SAIL', name: 'Steel Authority of India Ltd.', exchange: 'NSE' },
  { symbol: 'GAIL', name: 'GAIL (India) Ltd.', exchange: 'NSE' },
  { symbol: 'DLF', name: 'DLF Ltd.', exchange: 'NSE' },
  { symbol: 'SIEMENS', name: 'Siemens Ltd.', exchange: 'NSE' },
  { symbol: 'GODREJCP', name: 'Godrej Consumer Products Ltd.', exchange: 'NSE' },
  { symbol: 'DABUR', name: 'Dabur India Ltd.', exchange: 'NSE' },
  { symbol: 'MARICO', name: 'Marico Ltd.', exchange: 'NSE' },
  { symbol: 'UPL', name: 'UPL Ltd.', exchange: 'NSE' },
  { symbol: 'SHREECEM', name: 'Shree Cement Ltd.', exchange: 'NSE' },
  { symbol: 'AMBUJACEM', name: 'Ambuja Cements Ltd.', exchange: 'NSE' },
  { symbol: 'ACC', name: 'ACC Ltd.', exchange: 'NSE' },
  { symbol: 'HAVELLS', name: 'Havells India Ltd.', exchange: 'NSE' },
  { symbol: 'ICICIPRULI', name: 'ICICI Prudential Life Insurance Company Ltd.', exchange: 'NSE' },
  { symbol: 'ICICIGI', name: 'ICICI Lombard General Insurance Company Ltd.', exchange: 'NSE' },
  { symbol: 'HDFCAMC', name: 'HDFC Asset Management Company Ltd.', exchange: 'NSE' },
  { symbol: 'VEDL', name: 'Vedanta Ltd.', exchange: 'NSE' },
  { symbol: 'INDIGO', name: 'InterGlobe Aviation Ltd.', exchange: 'NSE' },
  { symbol: 'BOSCHLTD', name: 'Bosch Ltd.', exchange: 'NSE' },
  { symbol: 'LUPIN', name: 'Lupin Ltd.', exchange: 'NSE' },
  { symbol: 'AUROPHARMA', name: 'Aurobindo Pharma Ltd.', exchange: 'NSE' },
  { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd.', exchange: 'NSE' },
  { symbol: 'BANDHANBNK', name: 'Bandhan Bank Ltd.', exchange: 'NSE' },
  { symbol: 'IDFCFIRSTB', name: 'IDFC First Bank Ltd.', exchange: 'NSE' },
  { symbol: 'MRF', name: 'MRF Ltd.', exchange: 'NSE' },
  { symbol: 'MOTHERSON', name: 'Samvardhana Motherson International Ltd.', exchange: 'NSE' },
  { symbol: 'BERGEPAINT', name: 'Berger Paints India Ltd.', exchange: 'NSE' },
  { symbol: 'CHOLAFIN', name: 'Cholamandalam Investment and Finance Company Ltd.', exchange: 'NSE' },
  { symbol: 'SRF', name: 'SRF Ltd.', exchange: 'NSE' },
  { symbol: 'TRENT', name: 'Trent Ltd.', exchange: 'NSE' },
  { symbol: 'JUBLFOOD', name: 'Jubilant FoodWorks Ltd.', exchange: 'NSE' },
  { symbol: 'PIIND', name: 'PI Industries Ltd.', exchange: 'NSE' },
];

// --- SERVICES ---

export const searchStocks = (query: string): Promise<StockIdentifier[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }
      const lowerQuery = query.toLowerCase();
      const results = mockStocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(lowerQuery) ||
          stock.symbol.toLowerCase().includes(lowerQuery)
      );
      resolve(results.slice(0, 10));
    }, MOCK_API_DELAY / 3);
  });
};

export const getStockBasicData = async (symbol: string): Promise<StockBasicData | null> => {
    // This function is now mostly bypassed by the main hook which gets data from Gemini.
    // However, it can still return a skeleton for initial loads if needed.
    return new Promise((resolve) => {
        setTimeout(() => {
            const found = mockStocks.find(s => s.symbol === symbol.toUpperCase());
            if (found) {
                resolve({
                    ...found,
                    currentPrice: 0,
                    open: 0, high: 0, low: 0, close: 0, volume: 0, change: 0, changePercent: 0,
                    fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0, marketCap: "Loading...", sector: "Loading..."
                });
            } else {
                resolve(null);
            }
        }, MOCK_API_DELAY / 3);
    });
};

/**
 * Generates a mock price history chart that is anchored to a real reference price.
 * This ensures the chart looks consistent with the real-time data fetched from Gemini.
 */
export const getStockPriceHistory = async (symbol: string, interval: ChartInterval, referencePrice?: number): Promise<PriceDataPoint[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Use the provided reference price or default to 1000
            const basePrice = referencePrice && referencePrice > 0 ? referencePrice : 1000;
            resolve(generateMockPriceHistory(basePrice, interval)); 
        }, MOCK_API_DELAY / 2);
    });
};

// Deprecated functions now return empty/null to force usage of the Gemini service.
export const getStockFundamentalData = (symbol: string): Promise<StockFundamentalData | null> => Promise.resolve(null);
export const getNewsItemsRaw = (symbol: string): Promise<NewsItemRaw[]> => Promise.resolve([]);
export const getCorporateAnnouncements = (symbol: string): Promise<CorporateAnnouncement[]> => Promise.resolve([]);
export const getSectorPeers = (sector: string, currentSymbol: string): Promise<StockIdentifier[]> => Promise.resolve([]);

export const filterStocks = (criteria: ScreenerCriteria): Promise<StockBasicData[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      // Mock screener logic
      const randomResults = mockStocks.slice(0, criteria.limit || 15).map(s => ({
          ...s,
          currentPrice: Math.floor(Math.random() * 2000) + 100,
          open: 0, high: 0, low: 0, close: 0, volume: 0,
          change: 10, changePercent: 1.5,
          fiftyTwoWeekHigh: 0, fiftyTwoWeekLow: 0,
          marketCap: "₹20,000 Cr",
          peRatio: 22.5,
          promoterHolding: 55,
          sector: "Various"
      }));
      resolve(randomResults);
    }, MOCK_API_DELAY);
  });
};

export const getSectors = (): string[] => {
  return ['Banking', 'IT Services', 'FMCG', 'Automobile', 'Pharma', 'Energy', 'Metals', 'Infrastructure'];
};

// --- HELPER FUNCTIONS ---

const generateMockPriceHistory = (basePrice: number, interval: ChartInterval): PriceDataPoint[] => {
  const data: PriceDataPoint[] = [];
  
  if (interval === '1D') {
    // Generate backwards from today so the last point is exactly basePrice
    let currentPrice = basePrice;
    for (let i = 0; i < 252; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Push at beginning
        data.unshift({
            time: date.toISOString().split('T')[0],
            price: parseFloat(currentPrice.toFixed(2))
        });
        
        // Random walk backward
        const noise = (Math.random() - 0.48) * 0.035;
        currentPrice = currentPrice / (1 + noise);
    }
    return data;
  }

  // For Intraday
  const marketOpen = 9 * 60 + 15; 
  const marketClose = 15 * 60 + 30;
  const totalMinutes = marketClose - marketOpen;
  const step = interval === '1m' ? 1 : interval === '5m' ? 5 : interval === '15m' ? 15 : 60;
  
  // Create a trend that eventually lands on basePrice
  const now = new Date();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Capping timestamp for chart simulation
  const endMinute = Math.min(currentTotalMinutes, marketClose);
  
  let tempPrice = basePrice * (0.98 + Math.random() * 0.04); // Start somewhere nearby

  for (let minSinceOpen = 0; minSinceOpen <= (endMinute - marketOpen); minSinceOpen += step) {
      const totalMins = marketOpen + minSinceOpen;
      const hour = Math.floor(totalMins / 60);
      const minute = totalMins % 60;
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      
      // Interpolate towards basePrice as we approach "now"
      const progress = minSinceOpen / (endMinute - marketOpen || 1);
      
      const noise = (Math.random() - 0.5) * 0.005;
      tempPrice = tempPrice * (1 + noise);
      
      // Strong pull towards basePrice at the end
      const weightedPrice = (tempPrice * (1 - progress)) + (basePrice * progress);
      
      data.push({ time, price: parseFloat(weightedPrice.toFixed(2)) });
  }
  
  // Force exact match for last point
  if (data.length > 0) {
      data[data.length - 1].price = basePrice;
  } else {
      // Fallback if market hasn't opened or calculation failed
      const hour = Math.floor(marketOpen / 60);
      const minute = marketOpen % 60;
      data.push({ time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`, price: basePrice });
  }
  
  return data;
};
