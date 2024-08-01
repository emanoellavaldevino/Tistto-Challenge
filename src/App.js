import React, { useState } from 'react';
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  return ( 
    <div className="App">
      <h1>To Do</h1>

      {/* Envolvendo o formulário de entrada de tarefas em uma div com a classe "todo-wrapper". */}
      <div className='todo-wrapper'>

        {/* Agrupando as entradas de título, descrição e botão "Adicionar" */}
        <div className='todo-input'>
          {/* Entrada de texto para o título da tarefa */}
          <div className="todo-input-item"> 
            <label>Título</label>          
            <input type="text" placeholder="Qual é o título da tarefa?"/> 
          </div>
          
          {/* Entrada de texto para a descrição da tarefa */}
          <div className="todo-input-item">       
            <label>Descrição</label>
            <input type="text" placeholder="Qual é a descrição da tarefa?"/> 
          </div>

          {/* Botão para adicionar a tarefa */}
          <button type='button' className='primaryBtn'>Add</button>
        </div>

        {/* Área com botões de filtro de tarefas */}
        <div className='btn-area'>
          {/* Botão para mostrar todas as tarefas */}
          <button 
            className={`btn ${!isCompleteScreen ? 'activeBtn' : 'inactiveBtn'}`} 
            onClick={() => setIsCompleteScreen(false)}>
            To do
          </button>

          {/* Botão para mostrar apenas as tarefas concluídas */}
          <button 
            className={`btn ${isCompleteScreen ? 'activeBtn' : 'inactiveBtn'}`} 
            onClick={() => setIsCompleteScreen(true)}>
            Completed
          </button>
        </div>

        {/* Lista de tarefas */}
        <div className='todo-list'>
          {/* Cada tarefa é envolvida em uma div com a classe "todo-list-item" */}
          <div className='todo-list-item'>
            <h3>Take 1</h3>
            <p>Descrição</p>
          </div>
        </div>
      </div>
    </div>             
  );
}

export default App;
