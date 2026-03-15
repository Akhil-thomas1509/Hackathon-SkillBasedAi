import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { Sparkles, Target, TrendingUp, Zap } from 'lucide-react';

export function LandingPage() {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="py-6 lg:py-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">SkillBridge AI</h1>
          </div>
        </header>

        <section className="py-16 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-400">AI-Powered Career Intelligence</span>
              </div>

              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                Turn job requirements into a{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  clear action plan
                </span>
              </h2>

              <p className="text-xl lg:text-2xl text-slate-400 mb-10 leading-relaxed">
                Stop applying blindly. Discover exactly how close you are to your dream tech role and get personalized guidance on what to learn next.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setCurrentPage('jobs')}
                  className="w-full sm:w-auto shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Analysis
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto hover:scale-105 transition-all"
                >
                  See How It Works
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Your Match</h3>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-semibold">
                    Strong Fit
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-3 mb-2">
                    <span className="text-5xl font-bold text-white">78%</span>
                    <span className="text-slate-400 mb-2">match</span>
                  </div>
                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[78%] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2"></div>
                    <div>
                      <p className="text-sm text-emerald-400 font-medium">Strong foundation in core skills</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2"></div>
                    <div>
                      <p className="text-sm text-amber-400 font-medium">Focus on cloud deployment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2 uppercase tracking-wider">The Problem</h3>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why students struggle with job search</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Vague Requirements</h3>
              <p className="text-slate-400 leading-relaxed">
                Job descriptions list dozens of skills without clarity on what's actually essential.
              </p>
            </div>

            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">❓</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">No Clear Path</h3>
              <p className="text-slate-400 leading-relaxed">
                Students don't know what skills to prioritize or how to bridge their gaps.
              </p>
            </div>

            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Blind Applications</h3>
              <p className="text-slate-400 leading-relaxed">
                Applying without understanding your actual fit wastes time and confidence.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2 uppercase tracking-wider">Simple Process</h3>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">How SkillBridge AI works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/30">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-white mb-2">Choose a Role</h3>
              <p className="text-slate-400 text-sm">
                Browse curated tech positions from university job boards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-white mb-2">Enter Your Skills</h3>
              <p className="text-slate-400 text-sm">
                Select your current skills and optionally add context
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/30">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-white mb-2">See Your Match</h3>
              <p className="text-slate-400 text-sm">
                Get instant analysis of your fit for the role
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/30">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-white mb-2">Get AI Guidance</h3>
              <p className="text-slate-400 text-sm">
                Receive personalized recommendations on what to learn next
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to find your path?
            </h2>
            <p className="text-lg lg:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join students who are taking control of their career journey with data-driven insights.
            </p>
            <Button size="lg" onClick={() => setCurrentPage('jobs')} className="w-full sm:w-auto">
              Start Your Analysis
            </Button>
          </div>
        </section>

        <footer className="py-12 text-center text-slate-500 text-sm">
          <p>&copy; 2024 SkillBridge AI. Built for students, by students.</p>
        </footer>
      </div>
    </div>
  );
}
