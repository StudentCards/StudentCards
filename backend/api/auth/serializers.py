from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        # Tworzymy użytkownika za pomocą validated_data (danych, które przeszły walidację)
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

    def validate(self, data):
        # Sprawdzanie, czy dane są kompletne
        if 'username' not in data or 'password' not in data:
            raise serializers.ValidationError("Both 'username' and 'password' are required.")
        return data
