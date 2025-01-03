from django.shortcuts import render
from rest_framework import mixins, generics
from rest_framework.response import Response
from .models import Flashcard, FlashcardSet
from .serializers import FlashcardSerializer, FlashcardSetSerializer


class FlashcardSetList(mixins.ListModelMixin,
                       mixins.CreateModelMixin,
                       generics.GenericAPIView):
    
    queryset = FlashcardSet.objects.all()
    serializer_class = FlashcardSetSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class FlashcardSetDetail(mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      generics.GenericAPIView):
    
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

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)    


class FlashcardList(mixins.ListModelMixin, 
                    mixins.CreateModelMixin, 
                    generics.GenericAPIView):
    
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
   

class FlashcardDetail(mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      generics.GenericAPIView):
    
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
