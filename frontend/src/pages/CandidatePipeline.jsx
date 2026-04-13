import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobCandidates, updateCandidateStage } from '../utils/api';


const STAGES = ["Applied", "Shortlisted", "Interviewing", "In Assessment", "Accepted"];

export default function CandidatePipeline() {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    let mounted = true;
    function fetchJobDataByJobId() {

      setLoading(true);

      getJobCandidates(jobId).then(res => {
        setCandidates(res.data)
        setLoading(false);
      }).catch(err => {
        setError('Failed to load candidates');
        console.log(err);
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      });
    }

    if (mounted)
      fetchJobDataByJobId();
    return () => mounted = false;
  }, [jobId]);

  const onDragStart = (e, candidateId) => {
    e.dataTransfer.setData('text/plain', candidateId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = async (e, stage) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('text/plain');
    const candidate = candidates.find(c => c._id === candidateId || c.id === candidateId);
    if (!candidate) return;

    if (candidate.currentStage === stage) return; // no change

    try {
      await updateCandidateStage(candidate._id || candidate.id, stage);
      setCandidates(prev => prev.map(c => c._id === candidateId || c.id === candidateId ? { ...c, currentStage: stage } : c));
    } catch (err) {
      console.error(err);
      setError('Failed to update candidate stage');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const byStage = STAGES.reduce((acc, stage) => {
    acc[stage] = candidates.filter(c => (c.currentStage || c.stage) === stage);
    return acc;
  }, {});

  return (
    <div className="flex gap-4 p-4 overflow-x-auto justify-center flex-nowrap">
      {STAGES.map(stage => (
        <div key={stage} className="min-w-75 bg-gray-700/30 ring-2 ring-violet-400/50 rounded-2xl p-3 shrink-0">
          <div className="font-bold mb-2">{stage}</div>
          <hr className="border-violet-400" />
          <br />
          <div
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, stage)}
            className="space-y-2 min-h-50"
          >
            {byStage[stage].map(c => (
              <div
                key={c._id || c.id}
                draggable
                onDragStart={(e) => onDragStart(e, c._id || c.id)}
                className="bg-white rounded-xl shadow p-2 flex items-center space-x-2 cursor-grab"
              >
                <img src={c.photoUrl || '/placeholder.png'} alt="profile" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">{new Date(c.updatedAt || c.createdAt).toLocaleString()}</div>
                </div>
                <button onClick={() => navigate(`/admin/candidates/${c._id || c.id}`, '_blank')} className="ml-auto text-sm text-blue-500 hover:underline cursor-pointer">
                  Visit
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
