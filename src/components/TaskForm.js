import React, { useState } from 'react';
import axios from 'axios';

function Register({ onAuthChange }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username && password) {
      axios.post('http://127.0.0.1:8000/register', { username, password })
        .then(response => {
          // Handle successful registration (e.g., redirect to login or show a message)
          onAuthChange(true); // Consider user authenticated after registration
        })
        .catch(error => console.error('Error registering:', error));
    }
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
    </div>
  );
}

export default Register;
