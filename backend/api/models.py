from django.db import models


class FlashcardSet(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=100)
    is_public = models.BooleanField(default=False)
    # owner = 


class Flashcard(models.Model):
    question = models.CharField(max_length=50)
    answer = models.CharField(max_length=50)
    flashcard_set = models.ForeignKey(FlashcardSet, on_delete=models.CASCADE)
    