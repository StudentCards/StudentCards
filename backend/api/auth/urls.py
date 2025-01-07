from django.urls import path
from .views import LoginView, RegisterView, LogoutView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),  # Logowanie
    path('register/', RegisterView.as_view(), name='register'),  # Rejestracja
    path('logout/', LogoutView.as_view(), name='logout'), # Wylogowanie
]
