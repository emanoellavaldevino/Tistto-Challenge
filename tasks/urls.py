from django.urls import path
from . import views

urlpatterns = [
    path('todos', views.todo_list), # Rota para listar e criar tarefas
    path('todos/<int:pk>', views.todo_detail), # Rota para manipular uma tarefa específica
    path('register', views.register), # Rota para registrar novos usuários
    path('login', views.login),     # Rota para login de usuários
]

# URLs para suas views:
# http://127.0.0.1:8000/todos
# http://127.0.0.1:8000/todos/<int:pk>
# http://127.0.0.1:8000/register
# http://127.0.0.1:8000/login