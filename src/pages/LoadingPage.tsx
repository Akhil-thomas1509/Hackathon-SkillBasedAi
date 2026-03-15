import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeProfile } from '../lib/analysis';
import { Sparkles, Target, Brain } from 'lucide-react';

const LOADING_MESSAGES = [
  { icon: Target, text: 'Analyzing your profile...' },
  { icon: Sparkles, text: 'Comparing skills to role requirements...' },
  { icon: Brain, text: 'Generating personalized recommendations...' },
];

export function LoadingPage() {
  const { selectedJob, userProfile, setAnalysisResult, setCurrentPage } = useApp();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!selectedJob) {
      setCurrentPage('jobs');
      return;
    }

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1500);

    const analysisTimeout = setTimeout(async () => {
      const result = await analyzeProfile(selectedJob, userProfile);
      setAnalysisResult(result);
      setCurrentPage('results');
    }, 4500);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(analysisTimeout);
    };
  }, [selectedJob, userProfile, setAnalysisResult, setCurrentPage]);

  const CurrentIcon = LOADING_MESSAGES[messageIndex].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="relative w-28 h-28 mx-auto mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl animate-pulse shadow-2xl shadow-cyan-500/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl animate-ping opacity-20"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            <CurrentIcon className="w-14 h-14 text-white animate-bounce" />
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white animate-in">
            {LOADING_MESSAGES[messageIndex].text}
          </h2>
          <div className="flex gap-2 justify-center">
            {LOADING_MESSAGES.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === messageIndex
                    ? 'bg-cyan-400 w-10 shadow-lg shadow-cyan-400/50'
                    : 'bg-slate-700 w-2'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 rounded-full animate-[loading_4.5s_ease-in-out] shadow-lg shadow-cyan-500/50"></div>
          </div>
          <p className="text-sm text-slate-400 mt-4">This should only take a moment...</p>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
