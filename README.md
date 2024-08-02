## Todo Frontend

Este é um aplicativo de gerenciamento de tarefas criado com React. O projeto foi configurado com create-react-app e inclui funcionalidades para listar, criar, atualizar, editar e excluir tarefas, além de autenticação de usuários com formulários de login e cadastro.

### Funcionalidades

Cadastro de Usuário: Permite aos novos usuários se registrarem no aplicativo.
Login: Permite aos usuários existentes fazerem login no aplicativo.
Listagem de Tarefas: Exibe todas as tarefas do usuário autenticado.
Criação e Atualização de Tarefas: Permite criar novas tarefas e atualizar tarefas existentes.
Edição e Exclusão de Tarefas: Permite editar e excluir tarefas individuais.
### Componentes:

TaskList: Componente para listar todas as tarefas do usuário autenticado.
TaskForm: Componente para criar e atualizar tarefas.
TaskItem: Componente para exibir uma tarefa individual com opções para editar e excluir.
Login: Componente para o formulário de login.
Register: Componente para o formulário de cadastro de usuário.

### Estrutura do Projeto

src/: Contém todos os arquivos do código-fonte do React.
components/: Contém todos os componentes do aplicativo.
TaskList.js: Componente para listar todas as tarefas.
TaskForm.js: Componente para criar e atualizar tarefas.
TaskItem.js: Componente para exibir uma tarefa individual.
Login.js: Componente para o formulário de login.
Register.js: Componente para o formulário de cadastro.
App.js: Componente principal do aplicativo.
App.css: Estilos CSS para o aplicativo.
index.js: Ponto de entrada do aplicativo React.
public/: Contém arquivos estáticos, incluindo index.html.
Instalação
Clone o Repositório

bash
Copiar código
git clone https://github.com/seu-usuario/todo_frontend.git
cd todo_frontend
Instale as Dependências

bash
Copiar código
npm install
Inicie o Servidor de Desenvolvimento

bash
Copiar código
npm start
O aplicativo estará disponível em http://localhost:3000.

### Uso

Cadastro de Usuário: Navegue para a página de registro e preencha o formulário para criar uma nova conta.
Login: Navegue para a página de login e insira suas credenciais para acessar o aplicativo.
Listagem de Tarefas: Após o login, você será direcionado para a tela onde todas as suas tarefas serão listadas.
Criação e Atualização de Tarefas: Use o formulário para adicionar novas tarefas ou atualizar tarefas existentes.
Edição e Exclusão de Tarefas: Clique nos botões de edição ou exclusão ao lado de cada tarefa para modificar ou remover tarefas.
Contribuição
Sinta-se à vontade para abrir issues ou enviar pull requests. Contribuições são bem-vindas!

Licença
Este projeto é licenciado sob a MIT License.