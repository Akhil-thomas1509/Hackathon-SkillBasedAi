export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  required_skills: string[];
  created_at?: string;
}

export interface UserProfile {
  selectedSkills: string[];
  resumeSummary: string;
  strengths?: string;
  resumeText?: string;
  extractedSkills?: string[];
}

export interface ScoreBreakdown {
  totalScore: number;
  requiredSkillsScore: number;
  categoryCoverageScore: number;
  resumeEvidenceScore: number;
  bonusSkillsScore: number;
  criticalSkillPenalty: number;
}

export interface AnalysisResult {
  targetJob: Job;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  insights: string;
  extractedSkills: string[];
  manualSkills: string[];
  allSkills: string[];
  scoreBreakdown?: ScoreBreakdown;
}

export type Page = 'landing' | 'jobs' | 'profile' | 'loading' | 'results';
