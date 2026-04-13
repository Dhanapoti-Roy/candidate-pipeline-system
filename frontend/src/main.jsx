import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './components/Layout';
import JobsDashboard from './pages/JobsDashboard';
import CandidatePipeline from './pages/CandidatePipeline';
import CandidateDetail from './pages/CandidateDetail';
import RejectedArchive from './pages/RejectedArchive';
import Login from './pages/Login';
import LandingPage from './App';
import ProtectedRoute from './components/ProtectedRoute';
import ApplyJob from './pages/ApplyJob';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={

            <LandingPage />
          } />
          <Route path="/login" element={<Login />} />
          <Route
            path="/jobs"
            element={
              <Layout>
                <JobsDashboard />
              </Layout>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <Layout>
                  <JobsDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs/:id/apply"
            element={
              <Layout>
                <ApplyJob />
              </Layout>
            }
          />
          <Route
            path="/admin/jobs/:id/pipeline"
            element={
              <ProtectedRoute>
                <Layout>
                  <CandidatePipeline />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/candidates/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CandidateDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/archive"
            element={
              <ProtectedRoute>
                <Layout>
                  <RejectedArchive />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
