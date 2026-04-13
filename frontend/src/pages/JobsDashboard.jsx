import { useEffect, useState } from 'react';
import { getJobs } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/authHook';


export default function JobsDashboard() {
  const { user } = useAuth()

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getJobs().then(res => {
      console.log(res.data);
      setJobs(res.data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (

    <div>
      {user && <section>

        <p>You are Admin: Email- {user.email}</p>
      </section>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-20">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-lg shadow p-5 cursor-pointer hover:shadow-lg transition" onClick={() => user ? navigate(`/admin/jobs/${job.id}/pipeline`) : navigate(`/jobs/${job.id}/apply`)}>
            <div className="text-xs text-orange-600 font-bold mb-2">SCREEN 01</div>
            <div className="font-serif text-lg font-semibold mb-1">{job.title}</div>
            <div className="text-gray-600 mb-2">{job.department}</div>
            <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Active Candidates: {job.activeCandidateCount}</span>
          </div>
        ))}
        {jobs.length === 0 && <div className="col-span-full text-center text-gray-500">No jobs found. Please create a job to get started.</div>}
      </div>
    </div>
  );
}
