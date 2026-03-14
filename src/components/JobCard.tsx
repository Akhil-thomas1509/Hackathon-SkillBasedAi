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
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {job.title}
          </h3>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${categoryColors[job.category] || 'bg-slate-700 text-slate-300'}`}>
              {job.category}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-700 text-slate-300 border border-slate-600">
              {job.difficulty}
            </span>
          </div>
        </div>
      </div>

      <p className="text-slate-400 mb-4 leading-relaxed">
        {job.description}
      </p>

      <div className="mb-4">
        <p className="text-sm text-slate-500 mb-2 font-medium">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {job.required_skills.slice(0, 4).map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
          {job.required_skills.length > 4 && (
            <span className="text-sm text-slate-500 self-center">
              +{job.required_skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      <Button onClick={onSelect} variant="primary" className="w-full">
        Select Role
      </Button>
    </div>
  );
}
