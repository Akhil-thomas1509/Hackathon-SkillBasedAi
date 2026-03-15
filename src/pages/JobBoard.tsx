import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Job } from '../types';
import { supabase } from '../lib/supabase';
import { JobCard } from '../components/JobCard';
import { Button } from '../components/Button';
import { StepIndicator } from '../components/StepIndicator';
import { ArrowLeft, Briefcase, Search } from 'lucide-react';

export function JobBoard() {
  const { currentPage, setCurrentPage, setSelectedJob } = useApp();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSelectJob(job: Job) {
    setSelectedJob(job);
    setCurrentPage('profile');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage('landing')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <StepIndicator currentPage={currentPage} />

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Choose Your Target Role</h1>
              <p className="text-slate-400 mt-1">Select a position to analyze your fit</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role, category, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6"
              >
                <div className="space-y-4 animate-pulse">
                  <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-slate-700 rounded w-20"></div>
                    <div className="h-6 bg-slate-700 rounded w-20"></div>
                  </div>
                  <div className="h-10 bg-slate-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSelect={() => handleSelectJob(job)}
              />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No roles found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your search terms</p>
            <Button variant="ghost" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No jobs available</h3>
            <p className="text-slate-400">Check back later for new opportunities</p>
          </div>
        )}
      </div>
    </div>
  );
}
