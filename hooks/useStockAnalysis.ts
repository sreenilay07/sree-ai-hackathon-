
import { useState, useEffect } from 'react';
import { 
  StockBasicData, 
  AIAnalysisResponse, 
  StockFundamentalData, 
  CorporateAnnouncement,
} from '../types';
import { getComprehensiveStockAnalysis } from '../services/geminiService';
import { isIndianMarketOpen } from '../services/marketTime';

interface UseStockAnalysisReturn {
  stockBasicData: StockBasicData | null;
  aiAnalysis: AIAnalysisResponse | null;
  stockFundamentalData: StockFundamentalData | null;
  corporateAnnouncements: CorporateAnnouncement[];
  sectorPeers: StockBasicData[];
  isLoading: boolean;
  error: string | null;
}

const useStockAnalysis = (stockSymbol: string): UseStockAnalysisReturn => {
  const [stockBasicData, setStockBasicData] = useState<StockBasicData | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [stockFundamentalData, setStockFundamentalData] = useState<StockFundamentalData | null>(null);
  const [corporateAnnouncements, setCorporateAnnouncements] = useState<CorporateAnnouncement[]>([]);
  const [sectorPeers, setSectorPeers] = useState<StockBasicData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataForEffect = async (symbolToFetch: string) => {
      setIsLoading(true);
      setError(null);
      
      // Reset states
      setStockBasicData(null);
      setAiAnalysis(null);
      setStockFundamentalData(null);
      setCorporateAnnouncements([]);
      setSectorPeers([]);

      try {
        // Call the single "Research Agent" service which uses Google Search
        const comprehensiveData = await getComprehensiveStockAnalysis(symbolToFetch);

        if (!comprehensiveData || !comprehensiveData.basicData) {
            throw new Error(`Could not retrieve data for ${symbolToFetch}. Please try again.`);
        }

        setStockBasicData(comprehensiveData.basicData);
        setStockFundamentalData(comprehensiveData.fundamentals);
        setAiAnalysis(comprehensiveData.analysis);
        setCorporateAnnouncements(comprehensiveData.announcements || []);
        setSectorPeers(comprehensiveData.peers || []);

      } catch (err) {
        console.error("Error fetching stock analysis data:", err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (stockSymbol) {
      fetchDataForEffect(stockSymbol);
    } else {
      setIsLoading(false);
      setError(null);
    }
  }, [stockSymbol]);

  // Effect for simulating live price ticks for the main stock based on the real fetched price
  useEffect(() => {
    if (!stockBasicData || isLoading) {
      return;
    }

    const intervalId = setInterval(() => {
      if (!isIndianMarketOpen()) return;

      setStockBasicData(prevData => {
        if (!prevData) return null;
        // Simulate a tiny tick
        const variation = (Math.random() - 0.48) * (prevData.currentPrice * 0.0005);
        const newPrice = parseFloat((prevData.currentPrice + variation).toFixed(2));
        const newChange = newPrice - prevData.close;
        const newChangePercent = (newChange / prevData.close) * 100;
        const newHigh = Math.max(prevData.high, newPrice);
        const newLow = Math.min(prevData.low, newPrice);

        return {
          ...prevData,
          currentPrice: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          high: newHigh,
          low: newLow,
        };
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [stockBasicData?.symbol, isLoading]); // Only restart if symbol changes

  return { stockBasicData, aiAnalysis, stockFundamentalData, corporateAnnouncements, sectorPeers, isLoading, error };
};

export default useStockAnalysis;
