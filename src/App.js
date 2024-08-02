import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  // Estado para controlar se a tela de tarefas completas está ativa
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  
  // Estado para armazenar todas as tarefas
  const [allTodos, setTodos] = useState([]);
  
  // Estado para armazenar o título da nova tarefa
  const [newTitle, setNewTitle] = useState('');
  
  // Estado para armazenar a descrição da nova tarefa
  const [newDescription, setNewDescription] = useState('');
  
  // Estado para armazenar as tarefas completadas
  const [completedTodos, setCompletedTodos] = useState([]);
  
  // Estado para controlar a edição de tarefas
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  // Função para adicionar uma nova tarefa
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  // Função para deletar uma tarefa
  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1); // Corrigido para remover o item no índice especificado

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  // Função para marcar uma tarefa como completa
  const handleComplete = index => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  // Função para deletar uma tarefa completada
  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1); // Corrigido para remover o item no índice especificado

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  // UseEffect para carregar as tarefas salvas no localStorage
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  // Função para iniciar a edição de uma tarefa
  const handleEdit = (ind, item) => {
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }

  // Função para atualizar o título da tarefa sendo editada
  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value }
    })
  }

  // Função para atualizar a descrição da tarefa sendo editada
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value }
    })
  }

  // Função para salvar as alterações na tarefa editada
  const handleUpdateToDo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  }

  return (
    <div className="App">
      <h1>My Todos</h1>

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
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false && 
            allTodos.map((item, index) => {
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
                )
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
            })
          }

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
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
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
