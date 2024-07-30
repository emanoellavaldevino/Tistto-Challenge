from django.shortcuts import render
from django.http import HttpResponse

# Registro

def register(request):
    return HttpResponse('Registre-se aqui!')

# Login
def login(request):
    return HttpResponse()

# Logout

def logout(request):
    return HttpResponse()
