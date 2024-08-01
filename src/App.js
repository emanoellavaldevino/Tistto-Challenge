import logo from './logo.svg';
import './App.css';

function App() {
  return ( 
    // O componente principal da aplicação, envolvido em uma div com a classe "App".
    <div className="App">
      <h1>Minha Tarefa</h1>

      {/* Envolvendo o formulário de entrada de tarefas em uma div com a classe "todo-wrapper". */}
      <div className= 'todo-wrapper'>

      {/* Primeira entrada de texto para o título da tarefa. */}  
        <div className='todo-input'>       
          <label>Título</label>
          <input type="text" placeholder="Qual é o título da tarefa?"/> 
        </div>

      {/* Segunda entrada de texto para a descrição da tarefa. */}
        <div className='todo-input'>       
          <label>Descrição</label>
          <input type="text" placeholder="Qual é a descrição da tarefa?"/> 
        </div>

      {/* Botão para adicionar a tarefa, dentro de uma div com a classe "todo-input". */}
        <div className='todo-input'>       
          <button type='button' className='primaryBtn'>Add</button>
        </div>
      </div>

      {/* Área com botões de filtro de tarefas: um para mostrar todas as tarefas e outro para mostrar apenas as concluídas. */}
      <div className='btn-area'>
          <button>Todo</button>
          <button>Completed</button>
      </div>
      
      {/* Lista de tarefas, cada tarefa é envolvida em uma div com a classe "todo-list-item". */}
      <div className='todo-list'>

            <div className='todo-list-item'>
              <h3>Task 1</h3>
              <p>Descrição</p>
            </div>

        </div>
      </div>             
  );
}

export default App; // Exporta o componente App para ser usado em outras partes da aplicação.
