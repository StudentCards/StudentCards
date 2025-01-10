from rest_framework import serializers
from .models import Flashcard, FlashcardSet
from django.contrib.auth.models import User


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'question', 'answer', 'flashcard_set', 'owner']
        read_only_fields = ['owner']


class FlashcardSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashcardSet
        fields = ['id', 'title', 'description', 'is_public', 'owner']
        read_only_fields = ['owner']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken")
        return value