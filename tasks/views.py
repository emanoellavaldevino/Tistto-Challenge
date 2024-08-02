from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse  # Certifique-se de importar HttpResponse
from django.conf import settings
import os
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Todo
from .serializers import TodoSerializer

# View para servir o arquivo index.html
def index(request):
    index_path = os.path.join(settings.BASE_DIR, 'react_', 'todo_frontend', 'build', 'index.html')
    print(f"Index path: {index_path}")  # Adicione esta linha para depuração
    if not os.path.exists(index_path):
        return HttpResponse("File not found", status=404)
    with open(index_path, 'r') as file:
        return HttpResponse(file.read(), content_type='text/html')

# View para listar e criar tarefas
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])  # Garante que apenas usuários autenticados possam acessar esta view
def todo_list(request):
    if request.method == "GET":
        todos = Todo.objects.filter(user=request.user)  # Filtra as tarefas do usuário autenticado
        serializer = TodoSerializer(todos, many=True)  # Serializa a lista de tarefas
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = TodoSerializer(data=request.data)  # Cria um serializer com os dados da requisição
        if serializer.is_valid():
            serializer.save(user=request.user)  # Salva a tarefa associada ao usuário autenticado
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View para manipular uma tarefa específica
@api_view(["GET", "PATCH", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])  # Garante que apenas usuários autenticados possam acessar esta view
def todo_detail(request, pk):
    todo = get_object_or_404(Todo, id=pk)  # Recupera a tarefa ou retorna 404 se não existir

    if request.method == "GET":
        serializer = TodoSerializer(todo)  # Serializa a tarefa
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = TodoSerializer(todo, data=request.data)  # Atualiza a tarefa com os dados da requisição
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        todo.delete()  # Deleta a tarefa
        return Response(status=status.HTTP_204_NO_CONTENT)

# View para registrar novos usuários
@api_view(["POST"])
def register(request):
    if request.method == "POST":
        username = request.data.get('username')  # Obter o nome de usuário do corpo da requisição
        password = request.data.get('password')  # Obter a senha do corpo da requisição
        if User.objects.filter(username=username).exists():  # Verificar se o usuário já existe
            return Response({"error": "Usuário já existe"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password)  # Criar novo usuário
        refresh = RefreshToken.for_user(user)  # Criar tokens de atualização e acesso para o usuário
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=status.HTTP_201_CREATED)

# View para login de usuários
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')  # Obter o nome de usuário do corpo da requisição
        password = request.data.get('password')  # Obter a senha do corpo da requisição
        user = authenticate(username=username, password=password)  # Autenticar o usuário
        if user is not None:
            refresh = RefreshToken.for_user(user)  # Criar tokens de atualização e acesso para o usuário
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=status.HTTP_200_OK)
        return Response({"error": "Credenciais inválidas"}, status=status.HTTP_400_BAD_REQUEST)
