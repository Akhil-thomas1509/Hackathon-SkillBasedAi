interface SkillBadgeProps {
  skill: string;
  variant?: 'default' | 'matched' | 'missing' | 'selectable' | 'selected';
  onClick?: () => void;
}

export function SkillBadge({ skill, variant = 'default', onClick }: SkillBadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    matched: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    missing: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    selectable: 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:border-slate-600 cursor-pointer',
    selected: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 cursor-pointer',
  };

  return (
    <span
      onClick={onClick}
      className={`
        inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border
        transition-all duration-200
        ${variants[variant]}
        ${onClick ? 'hover:-translate-y-0.5 hover:shadow-lg' : ''}
      `}
    >
      {skill}
    </span>
  );
}
