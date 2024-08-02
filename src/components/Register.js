import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuthChange = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  const handleLogin = () => {
    // Logic to handle login
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      {!isAuthenticated ? (
        <>
          {isRegistering ? (
            <Register onAuthChange={handleAuthChange} />
          ) : (
            <Login onAuthChange={handleAuthChange} onLogin={handleLogin} />
          )}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </>
      ) : (
        <>
          <TaskForm />
          <TaskList />
        </>
      )}
    </div>
  );
}

export default App;
