from rest_framework import serializers
from .models import Todo

# Criando uma classe serializer baseado no modelo Django para facilitar a comunicação entre API e o banco de dados

class TodoSerializer(serializers.ModelSerializer):
# A classe Meta é usada para configurar o serializer
    class Meta:
# model = Todo: indica que o serializer é baseado no modelo Todo
        model = Todo
# fields: especifica quais campos do modelo devem ser incluídos no serializer
        fields = ['id', 'task', 'completed']
