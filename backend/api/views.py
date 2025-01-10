from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import User
from .models import Flashcard, FlashcardSet
from .serializers import FlashcardSerializer, FlashcardSetSerializer


class PublicFlashcardSetList(generics.ListAPIView):
    queryset = FlashcardSet.objects.filter(is_public=True)
    serializer_class = FlashcardSetSerializer


class FlashcardSetList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FlashcardSetSerializer

    def get_queryset(self):
        user = self.request.user
        return FlashcardSet.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)


class FlashcardSetDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FlashcardSetSerializer
    queryset = FlashcardSet.objects.all()

    def get_queryset(self):
        user = self.request.user
        if isinstance(user, User):
            return FlashcardSet.objects.filter(is_public=True) | FlashcardSet.objects.filter(owner=user)
        else:
            return FlashcardSet.objects.filter(is_public=True)

    def get_permissions(self):
        # Allow anyone access to get
        if self.request.method == 'GET':
            return [AllowAny()]
        
        return super().get_permissions()
    
    def get_object(self):
        obj = super().get_object()
        user = self.request.user

        if obj.is_public or obj.owner == user:
            if self.request.method in ['PUT', 'DELETE']:
                # Prevent editing/deleting public sets not owned by the user
                if obj.is_public and obj.owner != user:
                    raise PermissionDenied("You cannot edit or delete a public FlashcardSet that you do not own.")

            return obj

        raise PermissionDenied("You do not have permission to access this FlashcardSet.")

    def get(self, request, *args, **kwargs):
        flashcard_set = self.get_object()
        flashcards = Flashcard.objects.filter(flashcard_set=flashcard_set)

        flashcard_set_serializer = self.get_serializer(flashcard_set)
        flashcards_serializer = FlashcardSerializer(flashcards, many=True)

        response_data = {
            'flashcard_set': flashcard_set_serializer.data,
            'flashcards': flashcards_serializer.data,
            'is_owner': flashcard_set.owner == self.request.user
        }

        return Response(response_data)


class FlashcardList(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FlashcardSerializer

    def get_queryset(self):
        user = self.request.user
        return Flashcard.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)


class FlashcardDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FlashcardSerializer

    def get_queryset(self):
        user = self.request.user
        return Flashcard.objects.filter(owner=user)
