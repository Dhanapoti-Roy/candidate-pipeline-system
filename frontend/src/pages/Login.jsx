import { useState } from 'react';
import { login } from '../utils/api'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/authHook';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: loginHook } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login(email, password);
      const user = {
        name: res.data.name,
        email: res.data.email,
      }
      localStorage.setItem('jwt', res.data.token);
      loginHook(res.data.token, user);
      navigate('/admin/jobs');
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cream">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="font-serif text-2xl mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mb-3 p-2 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mb-6 p-2 border rounded" />
        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition">Login</button>
      </form>
    </div>
  );
}
