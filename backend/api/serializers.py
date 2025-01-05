from rest_framework import serializers
from .models import Flashcard, FlashcardSet


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'front_side', 'back_side', 'flashcard_set']


class FlashcardSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashcardSet
        fields = ['id', 'title', 'description', 'is_public']
