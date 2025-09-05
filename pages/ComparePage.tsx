import React, { useState, useCallback } from 'react';
import SearchBar from '../components/search/SearchBar';
import ComparisonTable from '../components/compare/ComparisonTable';
import useStockComparison from '../hooks/useStockComparison';
import { StockIdentifier, AIComparisonResponse } from '../types';
import { getAIComparison } from '../services/geminiService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ComparePage: React.FC = () => {
  const [selectedStocks, setSelectedStocks] = useState<StockIdentifier[]>([]);
  const { stocksData, isLoading: isTableLoading } = useStockComparison(selectedStocks);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIComparisonResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);


  const handleStockSelect = useCallback((stock: StockIdentifier) => {
    if (!selectedStocks.some(s => s.symbol === stock.symbol)) {
      setSelectedStocks(prevStocks => [...prevStocks, stock]);
    }
    setIsSearchModalOpen(false);
  }, [selectedStocks]);

  const handleRemoveStock = (symbolToRemove: string) => {
    setSelectedStocks(prevStocks => prevStocks.filter(s => s.symbol !== symbolToRemove));
    setAiAnalysis(null); // Reset AI analysis if a stock is removed
  };

  const proceedWithAnalysis = async () => {
    if (stocksData.some(s => s === null) || stocksData.length < 2) return;
    setIsAnalyzing(true);
    setAiError(null);
    setAiAnalysis(null);
    try {
      const validData = stocksData.filter(d => d !== null);
      // @ts-ignore
      const analysis = await getAIComparison(validData);
      setAiAnalysis(analysis);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Failed to get AI analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunAIAnalysis = () => {
    if (stocksData.some(s => s === null) || stocksData.length < 2) return;

    const sectors = new Set(stocksData.filter(s => s).map(s => s!.sector));
    if (sectors.size > 1) {
      setIsWarningModalOpen(true);
    } else {
      proceedWithAnalysis();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
          Stock Head-to-Head
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          Compare stocks side-by-side and get an AI-powered verdict.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {selectedStocks.map((stock) => (
            <div key={stock.symbol} className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-between text-center min-h-[90px]">
              <div className="flex-grow">
                <p className="font-bold text-gray-100 text-sm truncate" title={stock.name}>{stock.name}</p>
                <p className="text-xs text-sky-400">{stock.symbol}</p>
              </div>
              <button
                onClick={() => handleRemoveStock(stock.symbol)}
                className="mt-2 w-full text-xs bg-red-800/50 hover:bg-red-700/70 text-red-200 py-1 px-2 rounded transition-colors"
              >
                Remove
              </button>
            </div>
        ))}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="border-2 border-dashed border-gray-600 hover:border-sky-500 hover:bg-gray-800 transition-all rounded-lg flex flex-col items-center justify-center p-4 text-gray-500 hover:text-sky-400 min-h-[90px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-sm font-semibold mt-1">Add Stock</span>
        </button>
      </div>
      
      {selectedStocks.length >= 2 && (
        <div className="my-8 p-6 bg-gray-850 shadow-xl rounded-xl border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-2xl font-semibold text-gray-100">Sree AI Verdict</h3>
              <p className="text-sm text-gray-400">Let our AI analyze the strengths and weaknesses.</p>
            </div>
            <button onClick={handleRunAIAnalysis} disabled={isAnalyzing || isTableLoading} className="bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              {isAnalyzing ? "Analyzing..." : "Generate AI Comparison"}
            </button>
          </div>
          {isAnalyzing && <div className="flex justify-center p-6"><LoadingSpinner /></div>}
          {aiError && <div className="mt-4 text-center p-4 text-red-400 bg-red-900/20 rounded-lg">{aiError}</div>}
          {aiAnalysis && (
            <div className="mt-6 space-y-6 text-sm">
              {aiAnalysis.winnerSymbol && stocksData.find(s => s?.symbol === aiAnalysis.winnerSymbol) && (
                  <div className="bg-gradient-to-r from-green-500/20 to-sky-500/20 p-4 rounded-lg text-center border border-green-400">
                      <h4 className="text-lg font-bold text-gray-100">AI's Pick 🏆</h4>
                      <p className="text-xl font-semibold text-green-300">{stocksData.find(s => s?.symbol === aiAnalysis.winnerSymbol)?.name}</p>
                  </div>
              )}
              <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-sky-400 mb-2">Summary</h4>
                  <p className="text-gray-300 leading-relaxed">{aiAnalysis.summary}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-sky-400 mb-2">Recommendation for Investors</h4>
                  <p className="text-gray-300 leading-relaxed">{aiAnalysis.recommendation}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-center text-green-400">Strengths (Pros)</h4>
                      {Object.entries(aiAnalysis.pros).map(([symbol, pros]) => (
                          <div key={symbol} className="bg-gray-900/50 p-3 rounded-md border-l-4 border-green-500">
                              <h5 className="font-semibold text-gray-200">{symbol}</h5>
                              <ul className="list-disc list-inside text-gray-300 mt-1 pl-2 text-xs space-y-1">
                                  {pros.map((pro, i) => <li key={i}>{pro}</li>)}
                              </ul>
                          </div>
                      ))}
                  </div>
                  <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-center text-red-400">Weaknesses (Cons)</h4>
                      {Object.entries(aiAnalysis.cons).map(([symbol, cons]) => (
                           <div key={symbol} className="bg-gray-900/50 p-3 rounded-md border-l-4 border-red-500">
                              <h5 className="font-semibold text-gray-200">{symbol}</h5>
                              <ul className="list-disc list-inside text-gray-300 mt-1 pl-2 text-xs space-y-1">
                                  {cons.map((con, i) => <li key={i}>{con}</li>)}
                              </ul>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          )}
        </div>
      )}

      <ComparisonTable stocksData={stocksData} isLoading={isTableLoading} />

      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50 p-4 pt-[10vh]">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg relative border border-gray-700">
            <button onClick={() => setIsSearchModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold text-sky-400 mb-4">Add a stock to compare</h2>
            <SearchBar onStockSelect={handleStockSelect} />
          </div>
        </div>
      )}

      {isWarningModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg relative border border-gray-700">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Cross-Sector Comparison
            </h2>
            <p className="text-gray-300 mb-6">
                It's not usually recommended to compare stocks from different sectors (e.g., IT vs. Banking) as the comparison may not be meaningful.
                <br/><br/>
                Do you wish to proceed anyway?
            </p>
            <div className="flex justify-end gap-4">
                <button
                    onClick={() => setIsWarningModalOpen(false)}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        setIsWarningModalOpen(false);
                        proceedWithAnalysis();
                    }}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Proceed
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;