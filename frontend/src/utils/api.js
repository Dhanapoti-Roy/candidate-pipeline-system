import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL+'/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => api.post('/auth/login', { email, password });
export const getUserProfile = async () => api.get('/auth/profile');
export const getJobs = async () => api.get('/jobs');
export const getJobById = async (id) => api.get(`/jobs/${id}`);
export const applyToJob = async (jobId, candidateData) => api.post(`/jobs/${jobId}/apply`, candidateData);
export const getJobCandidates = async (jobId) => api.get(`/jobs/${jobId}/candidates`);
export const updateCandidateStage = async (id, stage) => api.patch(`/candidates/${id}/stage`, { stage });
export const getCandidateDetail = async (id) => api.get(`/candidates/${id}`);
export const getRejectedArchive = async () => api.get('/candidates/rejected');

export default api;
