import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, {getJobById} from '../utils/api';

const ApplyJob = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    getJobById(jobId).then(res=> res.data).then(data=>{
        setJobData(data);
    })
  }, [jobId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email) {
      setError('Name and Email are required.');
      return;
    }

    try {
      await api.post('/candidates', { ...formData, roleAppliedFor: jobId });
      setSuccess('Application submitted successfully!');
      setTimeout(() => navigate(`/jobs`), 2000); // Redirect to jobs dashboard after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-20">
      <h1 className="text-2xl font-bold mb-4">Apply for Job</h1>
      <div>
        <section>
            {/* job information */}
            {jobData ? (
                <div className="bg-gray-100 p-4 rounded mb-6">
                    <h2 className="text-xl font-semibold">{jobData.title}</h2>
                    <p className="text-gray-600">{jobData.department}</p>
                </div>
            ) : (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
                    Loading job information...
                </div>
            )}
        </section>
      </div>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="photoUrl" className="block text-gray-700 font-bold mb-2">Photo URL (Optional)</label>
          <input
            type="text"
            id="photoUrl"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyJob;
