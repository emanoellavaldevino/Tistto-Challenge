from django.shortcuts import render
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer


def todo_list(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

