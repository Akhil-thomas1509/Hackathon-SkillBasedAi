import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { SkillBadge } from '../components/SkillBadge';
import { ArrowLeft, User, Sparkles } from 'lucide-react';

const SKILL_CATEGORIES = {
  'Programming': ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'Go', 'Rust'],
  'Web Development': ['HTML', 'CSS', 'React', 'Vue', 'Angular', 'Node.js', 'Next.js'],
  'Data & Analytics': ['SQL', 'Pandas', 'NumPy', 'Data Visualization', 'Statistics', 'R'],
  'AI & Machine Learning': ['Machine Learning', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'MLOps'],
  'Cloud & DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
  'Core CS': ['Data Structures', 'Algorithms', 'System Design', 'Operating Systems', 'Computer Networks'],
  'Security': ['Security Fundamentals', 'Networking', 'Linux', 'Incident Response', 'Threat Analysis', 'Penetration Testing'],
  'Tools & Practices': ['Git', 'Agile', 'Testing', 'UI/UX Fundamentals', 'REST APIs', 'GraphQL'],
};

export function ProfileInput() {
  const { selectedJob, setCurrentPage, userProfile, setUserProfile } = useApp();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(userProfile.selectedSkills);
  const [resumeSummary, setResumeSummary] = useState(userProfile.resumeSummary);
  const [strengths, setStrengths] = useState(userProfile.strengths || '');

  if (!selectedJob) {
    setCurrentPage('jobs');
    return null;
  }

  function toggleSkill(skill: string) {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  }

  function handleSubmit() {
    if (selectedSkills.length === 0) {
      return;
    }

    setUserProfile({
      selectedSkills,
      resumeSummary,
      strengths,
    });

    setCurrentPage('loading');
  }

  const matchedSkills = selectedSkills.filter(skill =>
    selectedJob.required_skills.includes(skill)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage('jobs')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Build Your Profile</h1>
                <p className="text-slate-400 mt-1">Tell us about your current skills</p>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 lg:p-8 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Select Your Skills</h2>
                  <p className="text-sm text-slate-500 mt-1">Click to select skills you currently have</p>
                </div>
              </div>

              <div className="space-y-6">
                {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <SkillBadge
                          key={skill}
                          skill={skill}
                          variant={selectedSkills.includes(skill) ? 'selected' : 'selectable'}
                          onClick={() => toggleSkill(skill)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 lg:p-8 mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Additional Context (Optional)</h2>
              <p className="text-sm text-slate-500 mb-4">Help us provide more personalized recommendations</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Resume Summary
                  </label>
                  <textarea
                    value={resumeSummary}
                    onChange={(e) => setResumeSummary(e.target.value)}
                    placeholder="Brief summary of your experience, education, and projects..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Key Strengths or Projects
                  </label>
                  <textarea
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    placeholder="Highlight any notable projects, achievements, or strengths..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {selectedSkills.length === 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
                <p className="text-amber-400 text-sm text-center">
                  Please select at least one skill to continue
                </p>
              </div>
            )}

            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={selectedSkills.length === 0}
              className="w-full"
            >
              Analyze My Fit
            </Button>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Target Role</h3>

                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-cyan-400 mb-2">{selectedJob.title}</h4>
                  <p className="text-slate-400 text-sm mb-3">{selectedJob.description}</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-semibold">
                      {selectedJob.category}
                    </span>
                    <span className="px-3 py-1 bg-slate-700 text-slate-300 border border-slate-600 rounded-lg text-xs font-semibold">
                      {selectedJob.difficulty}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-4 mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    Required Skills ({selectedJob.required_skills.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.required_skills.map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Your Progress</span>
                    <span className="text-sm font-bold text-white">
                      {selectedSkills.length} skills selected
                    </span>
                  </div>
                  {selectedSkills.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">Matching required skills</span>
                        <span className="text-xs font-semibold text-cyan-400">
                          {matchedSkills.length} / {selectedJob.required_skills.length}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                          style={{
                            width: `${(matchedSkills.length / selectedJob.required_skills.length) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
