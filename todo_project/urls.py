"""
URL configuration for todo_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include  # Inclua o 'include' para importar URLs de outros módulos
from tasks import views  # Certifique-se de que 'views' está importado corretamente

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),  # Rota para servir o arquivo index.html
    path('tasks/', include('tasks.urls')),  # Inclua as URLs da aplicação 'tasks'
]



