from django.urls import path
from .views import LoginView, RegisterView, LogoutView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),  # Logowanie
    path('registration/', RegisterView.as_view(), name='registration'),  # Rejestracja
    path('logout/', LogoutView.as_view(), name='logout'),  # Wylogowanie
]
