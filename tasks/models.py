from django.db import models

# Create your models here.

# Criando uma tabela de dados

# Cada classe que herda de models.Model será traduzida em uma tabela no banco de dados 

class Todo(models.Model):
# models.CharField: Tipo de campo que armazena texto de comprimento variável.  max_length=100 o máximo de texto
    task = models.CharField(max_length=100)
# models.BooleanField: Tipo de campo que armazena dados booleanos e valor padrão false 
    completed = models.BooleanField(default=False)
# models.DateField: Tipo de campo que armazena uma data, auto_now_add=True define que a data atual será add automaticamente
# quando um novo objeto for criado 
    created = models.DateField(auto_now_add=True)
# auto_now=True define que a data atual será atualizada automaticamente toda vez que o objeto for salvo
    updated = models.DateField(auto_now=True)

# Método __str__ para retornar o valor do campo task
    def __str__(self):
        return self.task

    

