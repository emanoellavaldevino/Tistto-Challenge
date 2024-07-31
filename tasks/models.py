from django.db import models
from django.contrib.auth.models import User

# Criando uma tabela de dados

# Cada classe que herda de models.Model será traduzida em uma tabela no banco de dados 

class Todo(models.Model):
    task = models.CharField(max_length=100) #  Tipo de campo que armazena texto de comprimento variável.  
    completed = models.BooleanField(default=False) # Tipo de campo que armazena dados booleanos e valor padrão false 
    created = models.DateField(auto_now_add=True) # Tipo de campo que armazena uma data, auto_now_add=True define que a data atual será add automaticamente
    updated = models.DateField(auto_now=True) # define que a data atual será atualizada automaticamente toda vez que o objeto for salvo
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)  # Associar a tarefa ao usuário

    def __str__(self):      # Método __str__ para retornar o valor do campo task
        return self.task 

    

