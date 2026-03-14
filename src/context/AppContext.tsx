import { createContext, useContext, useState, ReactNode } from 'react';
import { Job, UserProfile, AnalysisResult, Page } from '../types';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialProfile: UserProfile = {
  selectedSkills: [],
  resumeSummary: '',
  strengths: '',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const resetApp = () => {
    setCurrentPage('landing');
    setSelectedJob(null);
    setUserProfile(initialProfile);
    setAnalysisResult(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedJob,
        setSelectedJob,
        userProfile,
        setUserProfile,
        analysisResult,
        setAnalysisResult,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
