from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.conf import settings
import os
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import status, generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView  # Adicionando a importação para APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Todo, Task
from .serializers import TodoSerializer, RegisterSerializer, TaskSerializer

# View para servir o arquivo index.html
def index(request):
    index_path = os.path.join(settings.BASE_DIR, '..', 'react_', 'todo_frontend', 'build', 'index.html')
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
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
def login_view(request):
    if request.method == 'POST':
        username = request.data.get('username')  # Obter o nome de usuário do corpo da requisição
        password = request.data.get('password')  # Obter a senha do corpo da requisição
        user = authenticate(username=username, password=password)  # Autenticar o usuário
        if user is not None:
            refresh = RefreshToken.for_user(user)  # Criar tokens de atualização e acesso para o usuário
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=status.HTTP_200_OK)
        return Response({"error": "Credenciais inválidas"}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # Permite acesso a qualquer usuário

class LoginView(APIView):
    permission_classes = [AllowAny]  # para testes das APIs via Postman

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)  # Adicionando geração de tokens JWT
            return Response({
                'success': 'Login efetuado com sucesso',
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            })
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'success': 'Logout efetuado com sucesso'}, status=status.HTTP_200_OK)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtra as tarefas pelo usuário autenticado
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Define o usuário autenticado como o proprietário da tarefa
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Garante que o proprietário não seja alterado manualmente durante atualizações
        serializer.save(user=self.request.user)
