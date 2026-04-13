import { useEffect, useState } from 'react';
import { getRejectedArchive } from '../utils/api';

export default function RejectedArchive() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let mounted = true;
    function fetchRejectedArchive() {
      setLoading(true);
      getRejectedArchive().then(res => {
        if (mounted) {
          setCandidates(res.data);
          console.log(res);
        }
      }).catch(err => {
        console.error('Failed to load rejected archive', err);
      }).finally(() => setLoading(false));
    }
    fetchRejectedArchive();
    return () => mounted = false;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-10 max-w-7xl mx-auto">

      <h2>List of Rejected Candidates</h2>

      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Original Role</th>
            <th className="p-2 text-left">Rejection Stage</th>
            <th className="p-2 text-left">Date/Time of Rejection</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c.id}>
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.role}</td>
              <td className="p-2">{c.rejectionStage}</td>
              <td className="p-2">{new Date(c.rejectionDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
