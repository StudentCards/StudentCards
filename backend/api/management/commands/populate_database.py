from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import FlashcardSet, Flashcard


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        user1_data = ('john_doe', 'password123')
        user2_data = ('jane_smith', 'password456')

        user1 = self.create_user(user1_data[0], user1_data[1])
        user2 = self.create_user(user2_data[0], user2_data[1])

        set1 = self.create_flashcard_set('Math', 'Basic math flashcards for beginners', True, user1)
        set2 = self.create_flashcard_set('Geography', 'Geography related flashcards about the world', True, user1)
        set3 = self.create_flashcard_set('Science', 'Flashcards covering basic science topics', True, user2)
        set4 = self.create_flashcard_set('History', 'Flashcards on historical events and figures', True, user2)
        set5 = self.create_flashcard_set('Literature', 'Flashcards for literary works and authors', False, user1)
        set6 = self.create_flashcard_set('Technology', 'Flashcards about tech terms and innovations', False, user1)
        set7 = self.create_flashcard_set('Animals', 'Flashcards on animals and their characteristics', False, user2)
        set8 = self.create_flashcard_set('Art', 'Flashcards on art history and famous artists', False, user2)

        self.create_flashcards_for_set(set1,
        [
            ("What is 2 + 2?", "4"),
            ("What is 3 + 5?", "8"),
            ("What is 10 - 4?", "6"),
            ("What is 7 * 3?", "21")
        ])
        self.create_flashcards_for_set(set2,
        [
            ("What is the capital of France?", "Paris"),
            ("What is the largest ocean?", "Pacific Ocean"),
            ("Which country has the most population?", "China"),
            ("Which continent is the Sahara Desert in?", "Africa")
        ])
        self.create_flashcards_for_set(set3,
        [
            ("What is the chemical symbol for water?", "H2O"),
            ("What planet is closest to the sun?", "Mercury"),
            ("What is the largest organ in the human body?", "Skin"),
            ("What gas do plants absorb during photosynthesis?", "Carbon Dioxide")
        ])
        self.create_flashcards_for_set(set4,
        [
            ("Who was the first President of the United States?", "George Washington"),
            ("In what year did World War II end?", "1945"),
            ("Who was the first man to step on the moon?", "Neil Armstrong"),
            ("What was the name of the ship that carried the Pilgrims to America?", "Mayflower")
        ])
        self.create_flashcards_for_set(set5,
        [
            ("Who wrote 'Romeo and Juliet'?", "William Shakespeare"),
            ("What is the title of the first book in the Harry Potter series?", "Harry Potter and the Philosopher's Stone"),
            ("Who wrote '1984'?", "George Orwell"),
            ("What is the name of the fictional wizard in 'The Lord of the Rings'?", "Gandalf")
        ])
        self.create_flashcards_for_set(set6,
        [
            ("What does 'HTML' stand for?", "HyperText Markup Language"),
            ("Who is known as the father of the computer?", "Charles Babbage"),
            ("What is the latest version of Android as of 2025?", "Android 14"),
            ("What is the main programming language for iOS development?", "Swift")
        ])
        self.create_flashcards_for_set(set7,
        [
            ("What is the largest land animal?", "African elephant"),
            ("Which bird is known for its colorful feathers and ability to mimic sounds?", "Parrot"),
            ("What animal is known for its ability to regenerate limbs?", "Axolotl"),
            ("What is the fastest land animal?", "Cheetah")
        ])
        self.create_flashcards_for_set(set8,
        [
            ("Who painted the Mona Lisa?", "Leonardo da Vinci"),
            ("What is the art movement associated with Pablo Picasso?", "Cubism"),
            ("Which artist is known for the 'Starry Night'?", "Vincent van Gogh"),
            ("What technique did Claude Monet popularize?", "Impressionism")
        ])

        self.stdout.write(self.style.SUCCESS('Database populated'))
        self.stdout.write(self.style.SUCCESS(f'Users data: \n{user1_data}\n{user2_data}'))
    
    def create_user(self, username, password):
        return User.objects.create_user(
            username=username, 
            password=password
        )

    def create_flashcard_set(self, title, description, is_public, owner):
        return FlashcardSet.objects.create(
            title=title,
            description=description,
            is_public=is_public,
            owner=owner
        )

    def create_flashcards_for_set(self, flashcard_set, flashcards_data):
        for question, answer in flashcards_data:
            Flashcard.objects.create(
                question=question,
                answer=answer,
                flashcard_set=flashcard_set,
                owner=flashcard_set.owner
            )
