import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { SkillBadge } from '../components/SkillBadge';
import { StepIndicator } from '../components/StepIndicator';
import { CircularProgress, SkillChart } from '../components/SkillChart';
import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  RotateCcw,
  Target,
  Sparkles,
  BookOpen,
  Code,
  Zap,
  MessageCircle,
} from 'lucide-react';

export function ResultsPage() {
  const { analysisResult, resetApp, setCurrentPage } = useApp();

  if (!analysisResult) {
    setCurrentPage('landing');
    return null;
  }

  const { targetJob, matchScore, matchedSkills, missingSkills, recommendations, insights, extractedSkills, manualSkills, scoreBreakdown } =
    analysisResult;

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: 'Excellent Fit', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    if (score >= 60) return { text: 'Strong Fit', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' };
    if (score >= 40) return { text: 'Developing Fit', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    if (score >= 20) return { text: 'Early Stage', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    return { text: 'Building Foundation', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  };

  const scoreBadge = getScoreBadge(matchScore);

  const splitRecommendations = () => {
    const learn = recommendations.filter(r =>
      r.toLowerCase().includes('learn') ||
      r.toLowerCase().includes('study') ||
      r.toLowerCase().includes('course')
    );
    const build = recommendations.filter(r =>
      r.toLowerCase().includes('build') ||
      r.toLowerCase().includes('create') ||
      r.toLowerCase().includes('project')
    );
    const improve = recommendations.filter(r =>
      !learn.includes(r) && !build.includes(r)
    );

    return { learn, build, improve };
  };

  const { learn, build, improve } = splitRecommendations();

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
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 lg:p-8 animate-in">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Match Score</h2>
                  <span className={`inline-flex px-4 py-2 rounded-lg text-sm font-semibold border ${scoreBadge.color}`}>
                    {scoreBadge.text}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                <div className="flex-shrink-0">
                  <CircularProgress percentage={matchScore} size={200} strokeWidth={14} />
                </div>

                <div className="flex-1 w-full">
                  <SkillChart matched={matchedSkills.length} missing={missingSkills.length} />
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300 leading-relaxed">{insights}</p>
                  </div>
                </div>
              </div>

              {scoreBreakdown && (
                <details className="mt-4 bg-slate-800/30 rounded-xl border border-slate-700 group">
                  <summary className="p-4 cursor-pointer hover:bg-slate-800/50 transition-all rounded-xl list-none">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">View Score Breakdown</span>
                      <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="px-4 pb-4 space-y-3 animate-in">
                    <p className="text-xs text-slate-500 mb-3">
                      This score reflects required skills, category coverage, resume evidence, and critical skill gaps.
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-slate-800/30 rounded-lg">
                        <span className="text-sm text-slate-400">Required Skills Match</span>
                        <span className="text-sm font-semibold text-white">{scoreBreakdown.requiredSkillsScore.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800/30 rounded-lg">
                        <span className="text-sm text-slate-400">Category Coverage</span>
                        <span className="text-sm font-semibold text-white">{scoreBreakdown.categoryCoverageScore.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800/30 rounded-lg">
                        <span className="text-sm text-slate-400">Resume Evidence</span>
                        <span className="text-sm font-semibold text-white">{scoreBreakdown.resumeEvidenceScore.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800/30 rounded-lg">
                        <span className="text-sm text-slate-400">Bonus Skills</span>
                        <span className="text-sm font-semibold text-white">{scoreBreakdown.bonusSkillsScore.toFixed(1)}%</span>
                      </div>
                      {scoreBreakdown.criticalSkillPenalty > 0 && (
                        <div className="flex justify-between items-center p-2 bg-amber-500/10 rounded-lg">
                          <span className="text-sm text-amber-400">Critical Skill Gaps</span>
                          <span className="text-sm font-semibold text-amber-400">-{scoreBreakdown.criticalSkillPenalty.toFixed(1)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}
            </div>

            {extractedSkills && extractedSkills.length > 0 && (
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 animate-in-delay">
                <div className="flex items-start gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Resume Insights</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Detected {extractedSkills.length} technical skill{extractedSkills.length !== 1 ? 's' : ''} from your resume
                      {manualSkills && manualSkills.length > 0 && `, plus ${manualSkills.length} manually selected`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((skill, index) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border bg-cyan-500/10 text-cyan-400 border-cyan-500/30 skill-chip-hover"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 animate-in-delay">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Target Role
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-cyan-400 mb-2">{targetJob.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{targetJob.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-semibold">
                  {targetJob.category}
                </span>
                <span className="px-3 py-1.5 bg-slate-700 text-slate-300 border border-slate-600 rounded-lg text-xs font-semibold">
                  {targetJob.difficulty}
                </span>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500 mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {targetJob.required_skills.slice(0, 8).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {targetJob.required_skills.length > 8 && (
                    <span className="px-2 py-1 text-slate-500 rounded text-xs">
                      +{targetJob.required_skills.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 card-hover animate-in">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Skills You Have</h3>
                <p className="text-xs text-slate-400 mt-0.5">{matchedSkills.length} matched skills</p>
              </div>
            </div>
            {matchedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, index) => (
                  <div key={skill} className="animate-in" style={{ animationDelay: `${index * 0.03}s` }}>
                    <SkillBadge skill={skill} variant="matched" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <p className="text-slate-500 italic">No matching skills identified</p>
              </div>
            )}
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 card-hover animate-in-delay">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Skills to Develop</h3>
                <p className="text-xs text-slate-400 mt-0.5">{missingSkills.length} skills to learn</p>
              </div>
            </div>
            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <div key={skill} className="animate-in" style={{ animationDelay: `${index * 0.03}s` }}>
                    <SkillBadge skill={skill} variant="missing" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
                <p className="text-emerald-400 font-medium flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Excellent! You have all required skills.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 lg:p-8 mb-6 animate-in-slow">
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
            <div className="grid lg:grid-cols-3 gap-4 mb-6">
              {learn.length > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <h4 className="font-bold text-blue-400">Learn Next</h4>
                  </div>
                  <div className="space-y-2">
                    {learn.map((rec, i) => (
                      <p key={i} className="text-sm text-slate-300 leading-relaxed">• {rec}</p>
                    ))}
                  </div>
                </div>
              )}
              {build.length > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-emerald-400">Build Next</h4>
                  </div>
                  <div className="space-y-2">
                    {build.map((rec, i) => (
                      <p key={i} className="text-sm text-slate-300 leading-relaxed">• {rec}</p>
                    ))}
                  </div>
                </div>
              )}
              {improve.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h4 className="font-bold text-amber-400">Improve Next</h4>
                  </div>
                  <div className="space-y-2">
                    {improve.map((rec, i) => (
                      <p key={i} className="text-sm text-slate-300 leading-relaxed">• {rec}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-8 text-center">
              <p className="text-slate-400">No recommendations available at this time.</p>
            </div>
          )}

          <div className="bg-slate-800/30 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-slate-300 mb-3">How the Score Works</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your match score is calculated based on required skills coverage (55%), technical category breadth (20%),
              resume evidence strength (12%), and bonus skills (8%). Missing critical skills apply a small penalty to encourage
              focus on foundational competencies.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 lg:p-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Quick Actions
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button
              size="lg"
              onClick={() => setCurrentPage('jobs')}
              className="w-full justify-center"
            >
              <Target className="w-4 h-4 mr-2" />
              Try Another Role
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setCurrentPage('profile')}
              className="w-full justify-center"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full justify-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask Assistant
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={resetApp}
              className="w-full justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
