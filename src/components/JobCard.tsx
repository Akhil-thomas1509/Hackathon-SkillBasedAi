import { Job } from '../types';
import { SkillBadge } from './SkillBadge';
import { Button } from './Button';

interface JobCardProps {
  job: Job;
  onSelect: () => void;
}

export function JobCard({ job, onSelect }: JobCardProps) {
  const categoryColors: Record<string, string> = {
    'Engineering': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Data': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Security': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Cloud & DevOps': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'AI & ML': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${categoryColors[job.category] || 'bg-slate-700 text-slate-300'}`}>
              {job.category}
            </span>
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700/50 text-slate-300 border border-slate-600 transition-all">
              {job.difficulty}
            </span>
          </div>
        </div>
      </div>

      <p className="text-slate-400 mb-5 leading-relaxed text-sm">
        {job.description}
      </p>

      <div className="mb-5">
        <p className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wider">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {job.required_skills.slice(0, 5).map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
          {job.required_skills.length > 5 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 bg-slate-700/30">
              +{job.required_skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      <Button
        onClick={onSelect}
        variant="primary"
        className="w-full group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all"
      >
        Select Role
      </Button>
    </div>
  );
}
