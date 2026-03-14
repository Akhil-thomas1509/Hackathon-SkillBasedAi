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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl animate-ping opacity-20"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            <CurrentIcon className="w-12 h-12 text-white animate-bounce" />
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-white">
            {LOADING_MESSAGES[messageIndex].text}
          </h2>
          <div className="flex gap-2 justify-center">
            {LOADING_MESSAGES.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === messageIndex
                    ? 'bg-cyan-400 w-8'
                    : 'bg-slate-700'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-[loading_4.5s_ease-in-out]"></div>
          </div>
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
