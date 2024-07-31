from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer

# Decorator para especificar que a view aceita métodos GET e POST

@api_view(["GET", "POST"])
# Define uma view baseada na função que trata requisições para URL associada
def todo_list(request):
# Verificar se o método da requisição é GET
    if request.method == "GET":
# Recupera todos os objetos Todo do banco de dados.
        todos = Todo.objects.all()
# Serializa a lista de objetos Todo
        serializer = TodoSerializer(todos, many=True)
# Retorna a resposta em HTTP com os dados serializados em formato JSON
        return Response(serializer.data)
    
# Verifica se o método da requisição é um POST   
    elif request.method == "POST":
    # Cria uma instância do serializer ' TodoSerializer ' com os dados da requisição ' request.data ' 
        serializer = TodoSerializer(data=request.data)
        # Valida os dados do serializer.        
        if serializer.is_valid():
            # Salva o objeto Todo no banco de dados
            serializer.save()
            # Retorna a resposta com os dados do novo objeto Todo e o status HTTP 201 Created
            return Response(serializer.data, status=status.HTTP_201_created)
        #  Se os dados não forem válidos, retorna os erros com o status HTTP 400 Bad Request
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


