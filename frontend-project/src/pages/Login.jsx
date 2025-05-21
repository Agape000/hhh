import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(
        'http://localhost:4444/api/auth/login',
        { username, password },
        { withCredentials: true }
      );

      setMessage('Login successful!');
      localStorage.setItem('loggedIn', 'true');
      navigate('/home');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Login failed');
      } else if (error.request) {
        setMessage('Server not responding. Try again later.');
      } else {
        setMessage('Something went wrong.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
