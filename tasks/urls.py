from django.urls import path
from .views import (
    todo_list,
    todo_detail,
    register,
    login_view,
    RegisterView,
    LoginView,
    TaskViewSet
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('todos/', todo_list, name='todo_list'),
    path('todos/<int:pk>/', todo_detail, name='todo_detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
] + router.urls




# URLs para suas views:
# http://127.0.0.1:8000/todos
# http://127.0.0.1:8000/todos/<int:pk>
# http://127.0.0.1:8000/register
# http://127.0.0.1:8000/login