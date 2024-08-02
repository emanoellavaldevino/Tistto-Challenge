import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);  
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState ([]);

  const handleaAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updateTodoArr))
    };

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);

    };

    const handleComplete = index => {
      let now = new Date ();
      let dd = now.getDate ();
      let mm = now.getMonth () + 1;
      let yyyy = now.getFullYear ();
      let h = now.getHours ();
      let m = now.getMinutes ();
      let s = now.getSeconds ();
      let completedOn =
        dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

      let filteredItem = {
        ...allTodos[index],
        completedOn: completedOn,
      };
      
    
      let updatedCompletedArr = [...completedTodos];
      updatedCompletedArr.push (filteredItem);
      setCompletedTodos (updatedCompletedArr);
      handleDeleteTodo (index);
      localStorage.setItem (
        'completedTodos',
        JSON.stringify (updatedCompletedArr)
      );
    };
  

  useEffect(() =>{
      let saveTodo = JSON.parse(localStorage.getItem('todolist'));
      if(saveTodo){
        setTodos(saveTodo);
      }
  }, []);

  return (
    <div className="App">
      <h1>To Do</h1>

      {/* Envolvendo o formulário de entrada de tarefas em uma div com a classe "todo-wrapper". */}
      <div className="todo-wrapper">
        {/* Agrupando as entradas de título, descrição e botão "Adicionar" */}
        <div className="todo-input">
          {/* Entrada de texto para o título da tarefa */}
          <div className="todo-input-item">
            <label>Título</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Qual é o título da tarefa?"
            />
          </div>

          {/* Entrada de texto para a descrição da tarefa */}
          <div className="todo-input-item">
            <label>Descrição</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Qual é a descrição da tarefa?"
            />
          </div>

          {/* Botão para adicionar a tarefa */}
          <button type="button" onClick={handleaAddTodo} className="primaryBtn">
            Add
          </button>
        </div>

        {/* Área com botões de filtro de tarefas */}
        <div className="btn-area">
          {/* Botão para mostrar todas as tarefas */}
          <button
            className={`btn ${!isCompleteScreen ? 'activeBtn' : 'inactiveBtn'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            To do
          </button>

          {/* Botão para mostrar apenas as tarefas concluídas */}
          <button
            className={`btn ${isCompleteScreen ? 'activeBtn' : 'inactiveBtn'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        {/* Lista de tarefas */}
        <div className="todo-list">
          {/* Cada tarefa é envolvida em uma div com a classe "todo-list-item" */}
          {isCompleteScreen===false && allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="icon-container">
                  <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index) } 
                  title="delete?" 
                  />                  
                  <BsCheckLg className="check-icon" onClick={() => handleComplete(index) } 
                  title="Complete?" 
                  />
                </div>

              </div>
            );
          })}

          {isCompleteScreen===true && completedTodos.map((item, index) => {
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
                            onClick={() => handleDeleteTodo(index) } 
                            title="delete?" 
                            />
                          </div>

                        </div>
                      );
                    })}
        </div>
      </div>
    </div>
  );
}

export default App;

