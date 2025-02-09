# Generated by Django 5.1.4 on 2025-01-10 03:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_back_side_flashcard_answer_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='flashcardset',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='flashcard',
            name='answer',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='flashcard',
            name='question',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='flashcardset',
            name='description',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='flashcardset',
            name='title',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
