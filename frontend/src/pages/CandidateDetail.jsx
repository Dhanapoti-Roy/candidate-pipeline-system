import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCandidateDetail } from '../utils/api';

export default function CandidateDetail() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCandidateDetail = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await getCandidateDetail(id);
        if (isMounted) {
          setCandidate(res.data);
        }
      } catch (err) {
        console.error('Failed to load candidate detail', err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCandidateDetail();

    // Cleanup function to prevent state updates on unmounted components
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Modern Skeleton Loader
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-6 animate-pulse max-w-5xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full md:w-1/3 h-80"></div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 h-96"></div>
      </div>
    );
  }

  // Modern Error / Not Found State
  if (error || !candidate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 bg-gray-50 rounded-2xl border border-dashed border-gray-300 mx-auto max-w-3xl text-center p-8">
        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900">Candidate not found</h3>
        <p className="mt-1 text-sm text-gray-500">We couldn't find the details for this application.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full md:w-1/3 flex flex-col items-center text-center h-fit">
          <div className="relative mb-5">
            <img 
              src={candidate.photo || '/placeholder.png'} 
              alt={`${candidate.name}'s profile`} 
              className="w-28 h-28 rounded-full object-cover ring-4 ring-gray-50 shadow-sm" 
            />
            {/* Optional Online/Status Indicator */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            {candidate.name}
          </h1>
          
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-700 mb-4">
            Role: {candidate.roleAppliedFor.title}
          </span>
          
          <div className="w-full border-t border-gray-100 mt-2 pt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 bg-yellow-100 text-yellow-800">
              Status: {candidate.application.currentStage}
            </span>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Application Date
            </div>
            <div className="text-sm text-gray-700 font-medium">
              {new Intl.DateTimeFormat('en-US', { 
                dateStyle: 'medium', 
                timeStyle: 'short' 
              }).format(new Date(candidate.application.createdAt))}
            </div>
          </div>
        </div>

        {/* Timeline / Stage History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Application Journey
          </h2>
          
          <div className="relative pl-2">
            {/* Background connecting line */}
            <div className="absolute left-2.75 top-2 bottom-2 w-px bg-gray-200"></div>

            <ul className="space-y-6 relative">
              {candidate.history.map((h, idx) => {                
                return (
                  <li key={idx} className="relative flex items-start gap-4">
                    {/* Timeline Dot */}
                    <div className="relative flex items-center justify-center shrink-0 w-6 h-6 z-10">
                      <div className={`w-2.5 h-2.5 rounded-full ring-4 ${
                        h.current 
                          ? 'bg-orange-500 ring-orange-100' 
                          : 'bg-gray-300 ring-white'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <p className={`text-base font-medium ${h.current ? 'text-orange-600' : 'text-gray-900'}`}>
                          {h.stage}
                        </p>
                        <time className="text-sm text-gray-500">
                          {new Intl.DateTimeFormat('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          }).format(new Date(h.timestamp))}
                        </time>
                      </div>
                      
                      {/* Optional helper text depending on stage status */}
                      {h.current && (
                        <p className="text-sm text-gray-500 mt-1">
                          Candidate is currently in this stage.
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}