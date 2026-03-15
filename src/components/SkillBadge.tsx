interface SkillBadgeProps {
  skill: string;
  variant?: 'default' | 'matched' | 'missing' | 'selectable' | 'selected';
  onClick?: () => void;
}

export function SkillBadge({ skill, variant = 'default', onClick }: SkillBadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600',
    matched: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30 hover:border-emerald-500/50',
    missing: 'bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-500/50',
    selectable: 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 cursor-pointer active:scale-95',
    selected: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/30 cursor-pointer active:scale-95',
  };

  return (
    <span
      onClick={onClick}
      className={`
        inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border
        transition-all duration-200
        ${variants[variant]}
        ${onClick ? 'hover:-translate-y-1 hover:shadow-lg hover:scale-105' : 'hover:-translate-y-0.5'}
      `}
    >
      {skill}
    </span>
  );
}
