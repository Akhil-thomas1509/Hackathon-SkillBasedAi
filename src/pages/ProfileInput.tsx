import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { SkillBadge } from '../components/SkillBadge';
import { StepIndicator } from '../components/StepIndicator';
import { ArrowLeft, User, Sparkles, Upload, FileText, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { extractSkillsFromResume, generateSampleResume } from '../lib/resumeParser';

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
  const { selectedJob, currentPage, setCurrentPage, userProfile, setUserProfile } = useApp();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(userProfile.selectedSkills);
  const [resumeSummary, setResumeSummary] = useState(userProfile.resumeSummary);
  const [strengths, setStrengths] = useState(userProfile.strengths || '');
  const [resumeText, setResumeText] = useState(userProfile.resumeText || '');
  const [extractedSkills, setExtractedSkills] = useState<string[]>(userProfile.extractedSkills || []);
  const [showExtractedSkills, setShowExtractedSkills] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'paste'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStage, setUploadStage] = useState<'idle' | 'uploading' | 'analyzing' | 'extracting' | 'completed'>('idle');

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

  async function handleResumeExtract() {
    if (!resumeText.trim()) return;

    setIsProcessing(true);
    setUploadStage('analyzing');

    await new Promise(resolve => setTimeout(resolve, 600));
    setUploadStage('extracting');

    await new Promise(resolve => setTimeout(resolve, 800));
    const detected = extractSkillsFromResume(resumeText);
    setExtractedSkills(detected);

    setUploadStage('completed');
    await new Promise(resolve => setTimeout(resolve, 400));

    setShowExtractedSkills(true);
    setIsProcessing(false);
    setUploadStage('idle');

    const mergedSkills = Array.from(new Set([...selectedSkills, ...detected]));
    setSelectedSkills(mergedSkills);
  }

  async function handleLoadSample() {
    setIsProcessing(true);
    setUploadStage('uploading');

    const sample = generateSampleResume();
    setResumeText(sample);

    await new Promise(resolve => setTimeout(resolve, 400));
    setUploadStage('analyzing');

    await new Promise(resolve => setTimeout(resolve, 600));
    setUploadStage('extracting');

    await new Promise(resolve => setTimeout(resolve, 800));
    const detected = extractSkillsFromResume(sample);
    setExtractedSkills(detected);

    setUploadStage('completed');
    await new Promise(resolve => setTimeout(resolve, 400));

    setShowExtractedSkills(true);
    setIsProcessing(false);
    setUploadStage('idle');

    const mergedSkills = Array.from(new Set([...selectedSkills, ...detected]));
    setSelectedSkills(mergedSkills);
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadStage('uploading');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      setResumeText(text);

      await new Promise(resolve => setTimeout(resolve, 600));
      setUploadStage('analyzing');

      await new Promise(resolve => setTimeout(resolve, 800));
      setUploadStage('extracting');

      await new Promise(resolve => setTimeout(resolve, 800));
      const detected = extractSkillsFromResume(text);
      setExtractedSkills(detected);

      setUploadStage('completed');
      await new Promise(resolve => setTimeout(resolve, 400));

      setShowExtractedSkills(true);
      setIsProcessing(false);
      setUploadStage('idle');

      const mergedSkills = Array.from(new Set([...selectedSkills, ...detected]));
      setSelectedSkills(mergedSkills);
    };
    reader.readAsText(file);
  }

  function handleSubmit() {
    const allSkills = Array.from(new Set([...selectedSkills, ...extractedSkills]));

    if (allSkills.length === 0) {
      return;
    }

    setUserProfile({
      selectedSkills,
      resumeSummary,
      strengths,
      resumeText,
      extractedSkills,
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

        <StepIndicator currentPage={currentPage} />

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

            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 lg:p-8 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-cyan-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Upload Your Resume</h2>
                  <p className="text-sm text-slate-500 mt-1">Let us extract your skills automatically</p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setUploadMode('upload')}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    uploadMode === 'upload'
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload File
                  </div>
                </button>
                <button
                  onClick={() => setUploadMode('paste')}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    uploadMode === 'paste'
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Paste Resume
                  </div>
                </button>
              </div>

              <div className="space-y-4">
                {uploadMode === 'upload' ? (
                  <>
                    <div className="relative">
                      <label className="flex flex-col items-center px-6 py-10 bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-cyan-500 hover:bg-slate-800/70 hover:scale-[1.01] transition-all duration-200 group">
                        <FileText className="w-14 h-14 text-slate-500 group-hover:text-cyan-400 transition-all duration-200 group-hover:scale-110 mb-4" />
                        <span className="text-base font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors mb-2">
                          Click to upload resume
                        </span>
                        <span className="text-sm text-slate-500">Supports .txt, .pdf, .doc, .docx</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".txt,.pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          disabled={isProcessing}
                        />
                      </label>
                    </div>

                    <div className="text-center">
                      <Button
                        variant="ghost"
                        onClick={handleLoadSample}
                        disabled={isProcessing}
                        size="sm"
                      >
                        Try Sample Resume
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your complete resume here (education, skills, experience, projects)..."
                        rows={8}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none text-sm"
                      />
                    </div>

                    <Button
                      variant="secondary"
                      onClick={handleResumeExtract}
                      disabled={!resumeText.trim() || isProcessing}
                      className="w-full items-center"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      <span>Extract Skills from Resume</span>
                    </Button>
                  </>
                )}

                {isProcessing && (
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                      <div>
                        <p className="text-sm font-semibold text-cyan-400">
                          {uploadStage === 'uploading' && 'Uploading resume...'}
                          {uploadStage === 'analyzing' && 'Analyzing your resume...'}
                          {uploadStage === 'extracting' && 'Extracting skills...'}
                          {uploadStage === 'completed' && 'Complete!'}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">This will only take a moment</p>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                        style={{
                          width: uploadStage === 'uploading' ? '25%' :
                                 uploadStage === 'analyzing' ? '50%' :
                                 uploadStage === 'extracting' ? '75%' :
                                 uploadStage === 'completed' ? '100%' : '0%'
                        }}
                      />
                    </div>
                  </div>
                )}

                {showExtractedSkills && extractedSkills.length > 0 && !isProcessing && (
                  <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-5 animate-in">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-emerald-400">
                          {extractedSkills.length} skill{extractedSkills.length !== 1 ? 's' : ''} detected
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">Successfully extracted from your resume</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {extractedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-emerald-500/20">
                      <p className="text-xs text-emerald-400/80 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        These skills have been automatically added to your profile
                      </p>
                    </div>
                  </div>
                )}
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

            {selectedSkills.length === 0 && extractedSkills.length === 0 && (
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-5 mb-4 animate-in">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-400 font-semibold mb-1">No skills selected yet</p>
                    <p className="text-sm text-slate-400">
                      Select skills manually from the categories above, or upload your resume to automatically extract your skills.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={selectedSkills.length === 0 && extractedSkills.length === 0}
              className="w-full items-center"
            >
              <Sparkles className="w-5 h-5 mr-2" />
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
