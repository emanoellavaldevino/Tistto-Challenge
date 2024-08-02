## Projeto Todo List - Tistto

## Objetivo
Este projeto visa avaliar habilidades técnicas básicas em Python, Django e React, além da capacidade de resolver problemas e implementar aplicações web. A aplicação desenvolvida é uma lista de tarefas (ToDo List) com funcionalidades de login e cadastro de usuários.

Descrição do Desafio
Desenvolver uma aplicação web simples para gerenciamento de tarefas, utilizando Django no backend e React no frontend. A aplicação deve permitir que os usuários se cadastrem, façam login e, uma vez autenticados, possam criar, ler, atualizar e excluir tarefas.

Requisitos do Projeto
Backend (Django)
Configuração do Projeto Django:

Crie um projeto Django chamado todo_project.
Crie um aplicativo Django chamado tasks.
Autenticação e Autorização:

Crie endpoints para registro de usuários, login e logout.
API REST:

Garanta que apenas usuários autenticados possam acessar as tarefas e que cada usuário só possa manipular suas próprias tarefas.
Banco de Dados:

Configure o projeto para utilizar SQLite ou PostgreSQL (opcional) como banco de dados.
Crie e aplique as migrações para criar as tabelas necessárias.
Frontend (React)
Configuração do Projeto React:

Crie um projeto React utilizando create-react-app chamado todo_frontend.
Componentes:

TaskList: Para listar todas as tarefas do usuário autenticado.
TaskForm: Para criar e atualizar tarefas.
TaskItem: Para exibir uma tarefa individual com opções para editar e excluir.
Login: Para o formulário de login.
Register: Para o formulário de cadastro de usuário.
Configuração do Ambiente
Backend
Clone o repositório:

bash
Copiar código
git clone https://github.com/seu_usuario/seu_repositorio_backend.git
Navegue para o diretório do projeto:

bash
Copiar código
cd todo_project
Crie e ative um ambiente virtual:

bash
Copiar código
python -m venv venv
source venv/bin/activate  # Para Windows: venv\Scripts\activate
Instale as dependências:

bash
Copiar código
pip install -r requirements.txt
Execute as migrações:

bash
Copiar código
python manage.py migrate
Inicie o servidor:

bash
Copiar código
python manage.py runserver
Frontend
Clone o repositório:

bash
Copiar código
git clone https://github.com/seu_usuario/seu_repositorio_frontend.git
Navegue para o diretório do projeto:

bash
Copiar código
cd todo_frontend
Instale as dependências:

bash
Copiar código
npm install
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm start
Estrutura do Projeto
Backend:

todo_project/
tasks/
models.py - Modelos para tarefas e usuários.
views.py - Views para operações CRUD e autenticação.
urls.py - URLs para os endpoints da API.
todo_project/settings.py - Configurações do projeto, incluindo banco de dados e autenticação.
Frontend:

src/
components/
TaskList.js - Lista todas as tarefas do usuário autenticado.
TaskForm.js - Formulário para criar e atualizar tarefas.
TaskItem.js - Exibe uma tarefa individual com opções para editar e excluir.
Login.js - Formulário para login de usuários.
Register.js - Formulário para cadastro de usuários.
App.js - Componente principal do React.
public/
index.html - Template HTML.
Contribuição
Contribuições são bem-vindas! Se encontrar algum problema ou tiver sugestões, por favor, abra uma issue ou um pull request.

Licença
Este projeto está licenciado sob a MIT License.
