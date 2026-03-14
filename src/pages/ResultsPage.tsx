import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { SkillBadge } from '../components/SkillBadge';
import { StepIndicator } from '../components/StepIndicator';
import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  RotateCcw,
  Target,
  Sparkles,
} from 'lucide-react';

export function ResultsPage() {
  const { analysisResult, resetApp, setCurrentPage } = useApp();

  if (!analysisResult) {
    setCurrentPage('landing');
    return null;
  }

  const { targetJob, matchScore, matchedSkills, missingSkills, recommendations, insights, extractedSkills, manualSkills, scoreBreakdown } =
    analysisResult;

  const getScoreColor = (score: number) => {
    if (score >= 80) return { start: '#10b981', end: '#059669' };
    if (score >= 60) return { start: '#06b6d4', end: '#2563eb' };
    if (score >= 40) return { start: '#3b82f6', end: '#6366f1' };
    if (score >= 20) return { start: '#f59e0b', end: '#ea580c' };
    return { start: '#ef4444', end: '#f43f5e' };
  };

  const scoreGradient = getScoreColor(matchScore);

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: 'Excellent Fit', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    if (score >= 60) return { text: 'Strong Fit', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' };
    if (score >= 40) return { text: 'Developing Fit', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    if (score >= 20) return { text: 'Early Stage', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    return { text: 'Building Foundation', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  };

  const scoreBadge = getScoreBadge(matchScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepIndicator currentPage="results" />

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Your Analysis Results</h1>
                <p className="text-slate-400 mt-1">
                  for <span className="text-cyan-400 font-semibold">{targetJob.title}</span>
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={resetApp} className="hidden md:flex items-center">
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 lg:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Match Score</h2>
                <span className={`inline-flex px-4 py-1.5 rounded-lg text-sm font-semibold border ${scoreBadge.color}`}>
                  {scoreBadge.text}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-6">
              <div className="relative flex-shrink-0">
                <svg className="w-44 h-44 md:w-48 md:h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(matchScore / 100) * 553} 553`}
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
                  <span className="text-5xl font-bold text-white">{matchScore}%</span>
                  <span className="text-sm text-slate-400">match</span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 gap-3">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-400">Required Skills</span>
                    <span className="text-2xl font-bold text-white">
                      {targetJob.required_skills.length}
                    </span>
                  </div>
                </div>
                <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-400">Skills You Have</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      {matchedSkills.length}
                    </span>
                  </div>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-amber-400">Skills to Develop</span>
                    <span className="text-2xl font-bold text-amber-400">
                      {missingSkills.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300 leading-relaxed">{insights}</p>
              </div>
            </div>

            {scoreBreakdown && (
              <details className="mt-4 bg-slate-800/30 rounded-xl border border-slate-700">
                <summary className="p-4 cursor-pointer hover:bg-slate-800/50 transition-colors rounded-xl">
                  <span className="text-sm font-medium text-slate-300">View Score Breakdown</span>
                </summary>
                <div className="px-4 pb-4 space-y-3">
                  <p className="text-xs text-slate-500 mb-3">
                    This score reflects required skills, category coverage, resume evidence, and critical skill gaps.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Required Skills Match</span>
                      <span className="text-sm font-semibold text-white">{scoreBreakdown.requiredSkillsScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Category Coverage</span>
                      <span className="text-sm font-semibold text-white">{scoreBreakdown.categoryCoverageScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Resume Evidence</span>
                      <span className="text-sm font-semibold text-white">{scoreBreakdown.resumeEvidenceScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Bonus Skills</span>
                      <span className="text-sm font-semibold text-white">{scoreBreakdown.bonusSkillsScore}%</span>
                    </div>
                    {scoreBreakdown.criticalSkillPenalty > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-amber-400">Critical Skill Gaps</span>
                        <span className="text-sm font-semibold text-amber-400">-{scoreBreakdown.criticalSkillPenalty}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </details>
            )}
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Target Role</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-xl font-bold text-cyan-400 mb-1">{targetJob.title}</h4>
                <p className="text-sm text-slate-400">{targetJob.description}</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-semibold">
                  {targetJob.category}
                </span>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 border border-slate-600 rounded-lg text-xs font-semibold">
                  {targetJob.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {extractedSkills && extractedSkills.length > 0 && (
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-white">Resume Analysis</h3>
                <p className="text-sm text-slate-400 mt-1">
                  We detected {extractedSkills.length} technical skill{extractedSkills.length !== 1 ? 's' : ''} from your resume
                  {manualSkills && manualSkills.length > 0 && `, plus ${manualSkills.length} manually selected skill${manualSkills.length !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Skills You Have</h3>
            </div>
            {matchedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} variant="matched" />
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No matching skills identified</p>
            )}
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Skills to Develop</h3>
            </div>
            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} variant="missing" />
                ))}
              </div>
            ) : (
              <p className="text-emerald-400 font-medium">
                Excellent! You have all required skills.
              </p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 lg:p-8 mb-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Personalized Recommendations</h3>
              <p className="text-slate-400 text-sm mt-1">Your career action plan</p>
            </div>
          </div>

          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 lg:p-5 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-200"
                >
                  <div className="flex gap-3 lg:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-cyan-500/20">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed flex-1 text-sm lg:text-base">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-8 text-center">
              <p className="text-slate-400">No recommendations available at this time.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={() => setCurrentPage('jobs')} className="w-full sm:w-auto">
            Compare Another Role
          </Button>
          <Button size="lg" variant="secondary" onClick={() => setCurrentPage('profile')} className="w-full sm:w-auto">
            Update Skills
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={resetApp}
            className="w-full sm:w-auto md:hidden"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}
