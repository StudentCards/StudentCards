from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.permissions import IsAuthenticated

from .serializers import RegisterSerializer


class LoginView(APIView):
    def post(self, request):
        # Pobranie danych z requestu
        username = request.data.get('username')
        password = request.data.get('password')

        # Sprawdzanie danych logowania
        user = authenticate(username=username, password=password)

        if user is not None:
            # Generowanie tokenu JWT dla użytkownika
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({"access_token": access_token, "refresh_token": refresh_token, "username": username}, status=HTTP_200_OK)
        return Response({"detail": "Invalid credentials"}, status=HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        # Sprawdzamy, czy dane wejściowe są poprawne za pomocą serializer
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            # Sprawdzamy, czy użytkownik o danej nazwie już istnieje
            username = serializer.validated_data['username']
            if User.objects.filter(username=username).exists():
                return Response({"detail": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                # Jeśli dane są poprawne, tworzymy użytkownika
                user = serializer.save()
                return Response({"detail": "User created successfully"}, status=status.HTTP_201_CREATED)
            except Exception as e:
                # Obsługujemy wszelkie błędy podczas tworzenia użytkownika
                return Response({"detail": f"Error creating user: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Jeśli dane wejściowe są niepoprawne, zwracamy błędy walidacji
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({"detail": "Refresh token missing"}, status=HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out."}, status=HTTP_200_OK)
        except TokenError:
            return Response({"detail": "Invalid or expired token"}, status=HTTP_400_BAD_REQUEST)


class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        password = request.data.get('password')

        if not password:
            return Response({'detail': 'Password is required to delete the account.'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user with the provided password
        if not user.check_password(password):
            return Response({'detail': 'Invalid password.'}, status=status.HTTP_403_FORBIDDEN)

        # Delete the user account
        user.delete()

        return Response({'detail': 'Your account has been deleted successfully.'}, status=status.HTTP_200_OK)
