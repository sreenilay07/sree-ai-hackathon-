
import React from 'react';
import { AIAnalysisResponse } from '../../types';

interface VerdictCardProps {
  analysis: AIAnalysisResponse | null;
}

const VerdictCard: React.FC<VerdictCardProps> = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
    );
  }

  let verdictColor = 'text-gray-100';
  if (analysis.verdict.toUpperCase().includes('BUY') || analysis.verdict.toUpperCase().includes('ACCUMULATE')) {
    verdictColor = 'text-green-400';
  } else if (analysis.verdict.toUpperCase().includes('SELL') || analysis.verdict.toUpperCase().includes('PROFIT')) {
    verdictColor = 'text-red-400';
  } else if (analysis.verdict.toUpperCase().includes('HOLD')) {
    verdictColor = 'text-yellow-400';
  }


  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-6 rounded-lg shadow-2xl border border-gray-700">
      <h3 className={`text-2xl sm:text-3xl font-bold ${verdictColor} mb-3 tracking-wide`}>
        SreeAI Verdict: {analysis.verdict}
      </h3>
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
        <span className="font-semibold text-sky-400">AI Rationale:</span> {analysis.aiRationale}
      </p>
    </div>
  );
};

export default VerdictCard;
