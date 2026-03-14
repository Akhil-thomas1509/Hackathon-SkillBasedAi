import { useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { JobBoard } from './pages/JobBoard';
import { ProfileInput } from './pages/ProfileInput';
import { LoadingPage } from './pages/LoadingPage';
import { ResultsPage } from './pages/ResultsPage';
import { Chatbot } from './components/Chatbot';

function App() {
  const { currentPage } = useApp();

  return (
    <>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'jobs' && <JobBoard />}
      {currentPage === 'profile' && <ProfileInput />}
      {currentPage === 'loading' && <LoadingPage />}
      {currentPage === 'results' && <ResultsPage />}
      <Chatbot />
    </>
  );
}

export default App;
