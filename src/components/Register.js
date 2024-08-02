import React, { useState } from 'react';
import axios from 'axios';

function Register({ onAuthChange }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    axios.post('http://127.0.0.1:8000/register', { username, password })
      .then(response => {
        setSuccess('Registration successful! Please log in.');
        setError('');
        onAuthChange(true);
      })
      .catch(error => {
        setError('Error registering: ' + error.response?.data?.error || error.message);
        setSuccess('');
      });
  };

  return (
    <div className="register-form">
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
      <button onClick={handleRegister}>Register</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default Register;
