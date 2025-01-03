from django.db import models


class FlashcardSet(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=100)
    # owner = 


class Flashcard(models.Model):
    front_side = models.CharField(max_length=50)
    back_side = models.CharField(max_length=50)
    flashcard_set = models.ForeignKey(FlashcardSet, on_delete=models.CASCADE)
    