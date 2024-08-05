import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onAuthChange }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    axios.post('http://127.0.0.1:8000/login', { username, password })
      .then(response => {
        localStorage.setItem('authToken', response.data.token);
        setSuccess('Login successful! Redirecting...');
        setError('');
        onAuthChange(true);
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(error => {
        setError('Error logging in: ' + error.response?.data?.error || error.message);
        setSuccess('');
      });
  };

  return (
    <div className="login-form">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default Login;
