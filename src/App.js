import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import Login from './components/Login';   // Atualizado
import Register from './components/Register';  // Atualizado



function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentEditedItem, setCurrentEditedItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('http://127.0.0.1:8000/todos', {
        headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
      })
        .then(res => setTodos(res.data))
        .catch(err => console.error(err));

      // Load completedTodos if needed
    }
  }, [isAuthenticated]);

  const handleAddTodo = () => {
    if (!newTitle || !newDescription) return;

    axios.post('http://127.0.0.1:8000/todos/', { title: newTitle, description: newDescription }, {
      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
    })
      .then(res => {
        setTodos([...todos, res.data]);
        setNewTitle('');
        setNewDescription('');
      })
      .catch(err => console.error(err));
  };

  const handleDeleteTodo = index => {
    axios.delete(`http://127.0.0.1:8000/todos/${todos[index].id}`, {
      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
    })
      .then(() => {
        setTodos(todos.filter((_, i) => i !== index));
      })
      .catch(err => console.error(err));
  };

  const handleComplete = index => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const updatedTodo = { ...todos[index], completedOn };

    axios.put(`http://127.0.0.1:8000/todos/${todos[index].id}`, updatedTodo, {
      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
    })
      .then(() => {
        setCompletedTodos([...completedTodos, updatedTodo]);
        handleDeleteTodo(index);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteCompletedTodo = index => {
    axios.delete(`http://127.0.0.1:8000/todos/${completedTodos[index].id}`, {
      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
    })
      .then(() => {
        setCompletedTodos(completedTodos.filter((_, i) => i !== index));
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = value => {
    setCurrentEditedItem(prev => ({ ...prev, title: value }));
  };

  const handleUpdateDescription = value => {
    setCurrentEditedItem(prev => ({ ...prev, description: value }));
  };

  const handleUpdateToDo = () => {
    if (currentEdit === null || !currentEditedItem) return;

    axios.put(`http://127.0.0.1:8000/todos/${todos[currentEdit].id}`, currentEditedItem, {
      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
    })
      .then(() => {
        const updatedTodos = todos.map((item, index) =>
          index === currentEdit ? currentEditedItem : item
        );
        setTodos(updatedTodos);
        setCurrentEdit(null);
        setCurrentEditedItem(null);
      })
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const handleAuthChange = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      { !isAuthenticated ? (
        <>
          <Register onAuthChange={handleAuthChange} />
          <Login onAuthChange={handleAuthChange} />
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <div className="todo-wrapper">
            <div className="todo-input">
              <div className="todo-input-item">
                <label>Título</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Qual é o seu título?"
                />
              </div>
              <div className="todo-input-item">
                <label>Descrição</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Qual é o título da sua descrição?"
                />
              </div>
              <div className="todo-input-item">
                <button
                  type="button"
                  onClick={handleAddTodo}
                  className="primaryBtn"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="btn-area">
              <button
                className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
                onClick={() => setIsCompleteScreen(false)}
              >
                Todo
              </button>
              <button
                className={`secondaryBtn ${isCompleteScreen && 'active'}`}
                onClick={() => setIsCompleteScreen(true)}
              >
                Completed
              </button>
            </div>

            <div className="todo-list">
              {/* Renderiza tarefas pendentes */}
              {!isCompleteScreen && todos.map((item, index) => {
                if (currentEdit === index) {
                  return (
                    <div className='edit__wrapper' key={index}>
                      <input
                        placeholder='Updated Title'
                        onChange={(e) => handleUpdateTitle(e.target.value)}
                        value={currentEditedItem.title}
                      />
                      <textarea
                        placeholder='Updated Description'
                        rows={4}
                        onChange={(e) => handleUpdateDescription(e.target.value)}
                        value={currentEditedItem.description}
                      />
                      <button
                        type="button"
                        onClick={handleUpdateToDo}
                        className="primaryBtn"
                      >
                        Update
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div className="todo-list-item" key={index}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleDeleteTodo(index)}
                          title="Delete?"
                        />
                        <BsCheckLg
                          className="check-icon"
                          onClick={() => handleComplete(index)}
                          title="Complete?"
                        />
                        <AiOutlineEdit
                          className="check-icon"
                          onClick={() => handleEdit(index, item)}
                          title="Edit?"
                        />
                      </div>
                    </div>
                  );
                }
              })}

              {/* Renderiza tarefas completadas */}
              {isCompleteScreen && completedTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
