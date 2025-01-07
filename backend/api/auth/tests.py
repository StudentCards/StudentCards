from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken


class LoginTestCase(APITestCase):
    """
    Test sprawdzający połączenie z bazą oraz logowanie
    """

    def setUp(self):
        # Zakładamy, że użytkownik 'test1' już istnieje w bazie danych
        self.username = 'test1'
        self.password = 'Testowy!@'
        # Tworzymy użytkownika, jeśli nie istnieje
        if not User.objects.filter(username=self.username).exists():
            User.objects.create_user(username=self.username, password=self.password)

        self.login_url = reverse('token_obtain_pair')  # Zakładając, że używasz JWT z SimpleJWT

    def test_login_successful(self):
        data = {
            'username': self.username,
            'password': self.password
        }

        response = self.client.post(self.login_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_unsuccessful_wrong_password(self):
        data = {
            'username': self.username,
            'password': 'WrongPassword123'
        }

        response = self.client.post(self.login_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access', response.data)
        self.assertNotIn('refresh', response.data)


class LogoutTestCase(APITestCase):
    """
    Test sprawdzający wylogowywanie użytkownika.
    """

    def setUp(self):
        # Zakładamy, że użytkownik 'test1' już istnieje w bazie danych
        self.username = 'test1'
        self.password = 'Testowy!@'
        if not User.objects.filter(username=self.username).exists():
            self.user = User.objects.create_user(username=self.username, password=self.password)
        else:
            self.user = User.objects.get(username=self.username)

        # Logowanie i pobranie tokenów
        self.refresh_token = str(RefreshToken.for_user(self.user))
        self.access_token = str(RefreshToken.for_user(self.user).access_token)

        self.logout_url = reverse('logout')  # URL dla widoku logout

    def test_logout_successful(self):
        # Wylogowywanie za pomocą refresh tokena
        data = {
            'refresh_token': self.refresh_token
        }
        response = self.client.post(self.logout_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Successfully logged out.')

    def test_logout_unsuccessful_invalid_token(self):
        # Wylogowywanie za pomocą nieprawidłowego tokena
        data = {
            'refresh_token': 'invalid_refresh_token'
        }
        response = self.client.post(self.logout_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response.data)


class RegisterTestCase(APITestCase):
    """
    Test sprawdzający rejestrację użytkownika
    """
    def setUp(self):
        # Ustawiamy URL rejestracji
        self.register_url = reverse('register')  # Zakładając, że endpoint rejestracji ma nazwę 'register'

    def test_register_successful(self):
        # Dane użytkownika, które będziemy wysyłać w żądaniu
        data = {
            'username': 'newuser',
            'password': 'NewPassword123'
        }

        # Wysłanie żądania POST do endpointu rejestracji
        response = self.client.post(self.register_url, data, format='json')

        # Sprawdzamy, czy odpowiedź ma status 201 Created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Sprawdzamy, czy odpowiedź zawiera odpowiednią wiadomość
        self.assertEqual(response.data['detail'], 'User created successfully')

        # Dodatkowo możemy sprawdzić, czy użytkownik rzeczywiście pojawił się w bazie danych
        user_exists = User.objects.filter(username='newuser').exists()
        self.assertTrue(user_exists)

    def test_register_unsuccessful_username_taken(self):
        # Tworzymy użytkownika, który będzie istniał w bazie
        User.objects.create_user(username='existinguser', password='ExistingPassword123')

        # Dane użytkownika, który próbuje zarejestrować się z istniejącą nazwą użytkownika
        data = {
            'username': 'existinguser',
            'password': 'NewPassword123'
        }

        # Wysłanie żądania POST
        response = self.client.post(self.register_url, data, format='json')

        # Sprawdzamy, czy odpowiedź ma status 400 Bad Request
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Sprawdzamy, czy odpowiedź zawiera odpowiednią wiadomość
        self.assertEqual(response.data['username'][0], "A user with that username already exists.")

    def test_register_unsuccessful_missing_field(self):
        # Dane rejestracyjne, ale brak hasła
        data = {
            'username': 'userwithoutpassword'
        }

        # Wysłanie żądania POST
        response = self.client.post(self.register_url, data, format='json')

        # Sprawdzamy, czy odpowiedź ma status 400 Bad Request
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Sprawdzamy, czy odpowiedź zawiera szczegóły błędu
        self.assertIn('password', response.data)
