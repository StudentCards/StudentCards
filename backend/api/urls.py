from django.urls import path
from .views import FlashcardList, FlashcardDetails, FlashcardSetList, FlashcardSetDetails, PublicFlashcardSetList


urlpatterns = [
    path('flashcards/', FlashcardList.as_view()),                       # Post one flashcard
    path('flashcards/<int:pk>', FlashcardDetails.as_view()),            # Get / Put / Delete one flashcard
    path('flashcard-sets/', FlashcardSetList.as_view()),                # Get all sets / Post one set
    path('flashcard-sets/<int:pk>', FlashcardSetDetails.as_view()),     # Get / Put / Delete one set
    path('flashcard-sets/public/', PublicFlashcardSetList.as_view())    # Get public sets
]
