import { Job, UserProfile } from '../types';
import { getRoleConfigByTitle } from './roleConfig';

export interface ScoreBreakdown {
  totalScore: number;
  requiredSkillsScore: number;
  categoryCoverageScore: number;
  resumeEvidenceScore: number;
  bonusSkillsScore: number;
  criticalSkillPenalty: number;
}

const EVIDENCE_KEYWORDS = [
  'built', 'developed', 'deployed', 'implemented', 'designed', 'created',
  'architected', 'engineered', 'programmed', 'coded', 'maintained',
  'optimized', 'automated', 'integrated', 'migrated', 'refactored',
  'internship', 'intern', 'project', 'certification', 'certified',
  'experience', 'worked on', 'contributed'
];

export function calculateEnhancedScore(
  job: Job,
  allSkills: string[],
  profile: UserProfile
): ScoreBreakdown {
  const roleConfig = getRoleConfigByTitle(job.title);

  if (!roleConfig) {
    return calculateBasicScore(job, allSkills);
  }

  const requiredSkillsScore = calculateRequiredSkillsScore(
    job.required_skills,
    allSkills
  );

  const categoryCoverageScore = calculateCategoryCoverageScore(
    roleConfig.categories,
    allSkills
  );

  const resumeEvidenceScore = calculateResumeEvidenceScore(
    profile.resumeText || '',
    allSkills
  );

  const bonusSkillsScore = calculateBonusSkillsScore(
    roleConfig.bonusSkills,
    allSkills
  );

  const criticalSkillPenalty = calculateCriticalSkillPenalty(
    roleConfig.criticalSkills,
    allSkills
  );

  const weightedScore =
    requiredSkillsScore * 0.55 +
    categoryCoverageScore * 0.20 +
    resumeEvidenceScore * 0.12 +
    bonusSkillsScore * 0.08 -
    criticalSkillPenalty * 0.05;

  const totalScore = Math.max(0, Math.min(100, Math.round(weightedScore)));

  return {
    totalScore,
    requiredSkillsScore: Math.round(requiredSkillsScore),
    categoryCoverageScore: Math.round(categoryCoverageScore),
    resumeEvidenceScore: Math.round(resumeEvidenceScore),
    bonusSkillsScore: Math.round(bonusSkillsScore),
    criticalSkillPenalty: Math.round(criticalSkillPenalty),
  };
}

function calculateRequiredSkillsScore(requiredSkills: string[], userSkills: string[]): number {
  if (requiredSkills.length === 0) return 100;

  const matchedCount = requiredSkills.filter(skill =>
    userSkills.includes(skill)
  ).length;

  return (matchedCount / requiredSkills.length) * 100;
}

function calculateCategoryCoverageScore(
  categories: { name: string; skills: string[] }[],
  userSkills: string[]
): number {
  if (categories.length === 0) return 100;

  let totalCoverage = 0;

  categories.forEach(category => {
    const categorySkills = category.skills;
    if (categorySkills.length === 0) return;

    const matchedInCategory = categorySkills.filter(skill =>
      userSkills.includes(skill)
    ).length;

    const categoryCoverage = matchedInCategory / categorySkills.length;
    totalCoverage += categoryCoverage;
  });

  return (totalCoverage / categories.length) * 100;
}

function calculateResumeEvidenceScore(resumeText: string, _userSkills: string[]): number {
  if (!resumeText || resumeText.trim().length === 0) {
    return 50;
  }

  const lowerResume = resumeText.toLowerCase();
  let evidenceScore = 50;

  const hasProjects = /project/i.test(resumeText);
  const hasExperience = /experience|intern/i.test(resumeText);
  const hasCertifications = /certification|certified/i.test(resumeText);

  if (hasProjects) evidenceScore += 15;
  if (hasExperience) evidenceScore += 20;
  if (hasCertifications) evidenceScore += 15;

  let evidenceKeywordMatches = 0;
  EVIDENCE_KEYWORDS.forEach(keyword => {
    if (lowerResume.includes(keyword)) {
      evidenceKeywordMatches++;
    }
  });

  evidenceScore += Math.min(evidenceKeywordMatches * 2, 20);

  return Math.min(evidenceScore, 100);
}

function calculateBonusSkillsScore(bonusSkills: string[], userSkills: string[]): number {
  if (bonusSkills.length === 0) return 0;

  const matchedBonus = bonusSkills.filter(skill =>
    userSkills.includes(skill)
  ).length;

  return (matchedBonus / bonusSkills.length) * 100;
}

function calculateCriticalSkillPenalty(criticalSkills: string[], userSkills: string[]): number {
  const missingCritical = criticalSkills.filter(skill =>
    !userSkills.includes(skill)
  );

  if (missingCritical.length === 0) return 0;
  if (missingCritical.length === 1) return 50;
  if (missingCritical.length === 2) return 75;
  return 100;
}

function calculateBasicScore(job: Job, allSkills: string[]): ScoreBreakdown {
  const matchedCount = job.required_skills.filter(skill =>
    allSkills.includes(skill)
  ).length;

  const basicScore = job.required_skills.length > 0
    ? Math.round((matchedCount / job.required_skills.length) * 100)
    : 0;

  return {
    totalScore: basicScore,
    requiredSkillsScore: basicScore,
    categoryCoverageScore: 0,
    resumeEvidenceScore: 0,
    bonusSkillsScore: 0,
    criticalSkillPenalty: 0,
  };
}
