from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    task = models.CharField(max_length=100)  # Campo para armazenar texto de comprimento variável
    completed = models.BooleanField(default=False)  # Campo para armazenar dados booleanos, valor padrão é False
    created = models.DateField(auto_now_add=True)  # Campo para armazenar a data de criação, valor é adicionado automaticamente
    updated = models.DateField(auto_now=True)  # Campo para armazenar a data de atualização, valor é atualizado automaticamente
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)  # Relaciona a tarefa ao usuário

    def __str__(self):
        return self.task  # Retorna o valor do campo 'task' ao converter o objeto para string

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title  # Retorna o valor do campo 'title' ao converter o objeto para string
