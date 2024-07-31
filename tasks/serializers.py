from rest_framework import serializers
from .models import Todo

# Criando uma classe serializer baseado no modelo Django para facilitar a comunicação entre API e o banco de dados

class TodoSerializer(serializers.ModelSerializer):
    class Meta: # A classe Meta é usada para configurar o serializer
        model = Todo # model = Todo: indica que o serializer é baseado no modelo Todo
        fields = ['id', 'task', 'completed'] # fields: especifica quais campos do modelo devem ser incluídos no serializer
        read_only_fields = ['user']