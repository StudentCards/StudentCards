from rest_framework import serializers
from .models import Flashcard, FlashcardSet


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'question', 'answer', 'flashcard_set']


class FlashcardSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashcardSet
        fields = ['id', 'title', 'description', 'is_public']
