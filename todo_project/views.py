from django.http import HttpResponse
import os
from django.conf import settings

def index(request):
    # Define o caminho para o arquivo index.html
    index_path = os.path.join(settings.BASE_DIR, 'react_', 'todo_frontend', 'build', 'index.html')
    
    # Verifica se o arquivo existe
    if not os.path.exists(index_path):
        return HttpResponse("File not found", status=404)
    
    # Lê e retorna o conteúdo do arquivo index.html
    with open(index_path, 'r') as file:
        return HttpResponse(file.read(), content_type='text/html')



