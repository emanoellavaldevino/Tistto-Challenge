from django.shortcuts import HttpResponse
import os
from pathlib import Path

def index(request):
    index_path = r'C:\Users\Emanoella\react_\todo_frontend\build\static\index.html'
    
    if not os.path.exists(index_path):
        raise FileNotFoundError(f"Template not found at {index_path}")
    
    with open(index_path, 'r') as file:
        return HttpResponse(file.read(), content_type='text/html')

