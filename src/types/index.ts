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
}

export interface AnalysisResult {
  targetJob: Job;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  insights: string;
}

export type Page = 'landing' | 'jobs' | 'profile' | 'loading' | 'results';
