import os
import django

# Configura o ambiente do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_project.settings')
django.setup()

from django.conf import settings

# Verifica o caminho do arquivo index.html
index_path = os.path.join(settings.BASE_DIR, 'react_', 'todo_frontend', 'build', 'index.html')
print(f"Index path: {index_path}")

if os.path.exists(index_path):
    with open(index_path, 'r') as file:
        content = file.read()
        print(content[:100])  # Imprime os primeiros 100 caracteres para verificar se o conteúdo está correto
else:
    print("File not found")

