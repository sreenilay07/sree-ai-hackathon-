import React, { useState } from 'react';
import { StockBasicData, ScreenerCriteria, AIScreenerAnalysis } from '../types';
import { parseScreenerQuery, getAIScreenerAnalysis } from '../services/geminiService';
import { filterStocks } from '../services/stockService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ScreenerResultsTable from '../components/screener/ScreenerResultsTable';
import AIScreenerAnalysisCard from '../components/screener/AIScreenerAnalysisCard';

const ScreenerPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<StockBasicData[]>([]);
  const [searched, setSearched] = useState(false);

  // New state for AI analysis
  const [aiAnalysis, setAiAnalysis] = useState<AIScreenerAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearched(true);
    setResults([]);
    // Reset AI analysis on new search
    setAiAnalysis(null);
    setAiError(null);

    try {
      const criteria: ScreenerCriteria = await parseScreenerQuery(query);
      const filteredStocks = await filterStocks(criteria);
      setResults(filteredStocks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeResults = async () => {
    if (results.length === 0) return;
    setIsAnalyzing(true);
    setAiError(null);
    setAiAnalysis(null);
    try {
        const analysis = await getAIScreenerAnalysis(query, results);
        setAiAnalysis(analysis);
    } catch (err) {
        setAiError(err instanceof Error ? err.message : 'Failed to analyze results.');
    } finally {
        setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
          Natural Language Stock Screener
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          Ask for stocks in plain English. Try "IT stocks under ₹500" or "high dividend banking stocks".
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg shadow-lg focus-within:ring-2 focus-within:ring-sky-500 transition-all">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., show top IT stocks with PE under 30 and promoter holding > 50%"
            className="w-full p-4 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-r-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
            {isLoading ? '...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="mt-10">
        {isLoading && <div className="flex justify-center p-8"><LoadingSpinner /></div>}
        {error && <div className="text-center p-8 text-red-400 bg-red-900/20 rounded-lg">{error}</div>}
        
        {!isLoading && !error && searched && (
          <>
            {results.length > 0 && !aiAnalysis && (
              <div className="mb-6 text-center">
                 <button 
                    onClick={handleAnalyzeResults}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                 >
                    {isAnalyzing ? (
                        <>
                            <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                            Analyzing...
                        </>
                    ) : (
                        "Analyze Results with AI ✨"
                    )}
                 </button>
              </div>
            )}
            
            {isAnalyzing && <div className="flex justify-center p-8"><LoadingSpinner /></div>}
            {aiError && <div className="my-4 text-center p-4 text-red-400 bg-red-900/20 rounded-lg">{aiError}</div>}
            {aiAnalysis && <AIScreenerAnalysisCard analysis={aiAnalysis} />}
            
            <ScreenerResultsTable stocks={results} />
          </>
        )}

        {!searched && !isLoading && (
            <div className="mt-12 text-center text-gray-500 bg-gray-800/50 p-10 rounded-lg border border-dashed border-gray-700">
                <p>Your search results will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ScreenerPage;