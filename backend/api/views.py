from rest_framework import generics
from rest_framework.response import Response
from .models import Flashcard, FlashcardSet
from .serializers import FlashcardSerializer, FlashcardSetSerializer


class PublicFlashcardSetList(generics.ListAPIView):
    queryset = FlashcardSet.objects.filter(is_public=True)
    serializer_class = FlashcardSetSerializer


class FlashcardSetList(generics.ListCreateAPIView):
    queryset = FlashcardSet.objects.all()
    serializer_class = FlashcardSetSerializer


class FlashcardSetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = FlashcardSet.objects.all()
    serializer_class = FlashcardSetSerializer

    def get(self, request, *args, **kwargs):
        flashcard_set = self.get_object()
        flashcards = Flashcard.objects.filter(flashcard_set=flashcard_set)

        flashcard_set_serializer = self.get_serializer(flashcard_set)
        flashcards_serializer = FlashcardSerializer(flashcards, many=True)

        response_data = {
            'flashcard_set': flashcard_set_serializer.data,
            'flashcards': flashcards_serializer.data
        }

        return Response(response_data)


class FlashcardList(generics.CreateAPIView):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer


class FlashcardDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
