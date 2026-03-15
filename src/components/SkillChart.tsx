import { useEffect, useState } from 'react';

interface SkillChartProps {
  matched: number;
  missing: number;
}

export function SkillChart({ matched, missing }: SkillChartProps) {
  const [animatedMatched, setAnimatedMatched] = useState(0);
  const [animatedMissing, setAnimatedMissing] = useState(0);

  const total = matched + missing;
  const matchedPercentage = total > 0 ? (matched / total) * 100 : 0;

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const matchedIncrement = matched / steps;
    const missingIncrement = missing / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setAnimatedMatched(Math.min(matched, matchedIncrement * currentStep));
        setAnimatedMissing(Math.min(missing, missingIncrement * currentStep));
      } else {
        setAnimatedMatched(matched);
        setAnimatedMissing(missing);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [matched, missing]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Skills Distribution</span>
        <span className="text-slate-300 font-semibold">{Math.round(matchedPercentage)}% Match</span>
      </div>

      <div className="relative h-6 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(animatedMatched / total) * 100}%` }}
        />
        <div
          className="absolute inset-y-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
          style={{
            left: `${(animatedMatched / total) * 100}%`,
            width: `${(animatedMissing / total) * 100}%`
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-medium">Skills You Have</span>
            <span className="text-lg font-bold text-emerald-400">{Math.round(animatedMatched)}</span>
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-400 font-medium">To Develop</span>
            <span className="text-lg font-bold text-amber-400">{Math.round(animatedMissing)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({ percentage, size = 200, strokeWidth = 12 }: CircularProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return { start: '#10b981', end: '#059669' };
    if (score >= 60) return { start: '#06b6d4', end: '#2563eb' };
    if (score >= 40) return { start: '#3b82f6', end: '#6366f1' };
    if (score >= 20) return { start: '#f59e0b', end: '#ea580c' };
    return { start: '#ef4444', end: '#f43f5e' };
  };

  const scoreGradient = getScoreColor(percentage);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = percentage / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setAnimatedPercentage(Math.min(percentage, increment * currentStep));
      } else {
        setAnimatedPercentage(percentage);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={scoreGradient.start} />
            <stop offset="100%" stopColor={scoreGradient.end} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-white animate-count">{Math.round(animatedPercentage)}%</span>
        <span className="text-sm text-slate-400 mt-1">match</span>
      </div>
    </div>
  );
}
