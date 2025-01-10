# StudentCards Web Application

![Logo](frontend/icon.png)

## Overview
The Flashcard Web Application is a collaborative project developed by a team of three, designed to help users learn and memorize information through interactive flashcards. 
The application allows users to play flashcard games, create their own flashcard sets, and manage their flashcards with functionalities such as editing, adding, and deleting cards. 

This project was created as part of the Software Architecture course.

## Features

### General Features
- **Flashcard Game**: Users can play with existing flashcard sets.

### User Authentication
- **Login/Registration**: Users can create accounts or log in to access additional features.

### Authenticated User Features
- **Create Flashcard Sets**: Users can create their own sets of flashcards.
- **Edit Flashcards**: Users can edit existing flashcards within their sets.
- **Add Flashcards**: Users can add new flashcards to their sets.
- **Delete Flashcards**: Users can remove unwanted flashcards from their sets.

## Technology Stack

### Frontend
- **React JS**: Used for building the user interface.
- **Tailwind CSS**: Utilized for styling the application.

### Backend
- **Python Django**: Used for handling backend logic and database management.

## Installation

### Prerequisites
- Node.js
- Python

### Frontend Setup
In first terminal:
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/flashcard-app.git
    ```
2. Navigate to the frontend directory:
    ```bash
    cd StudentCards
    cd frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

### Backend Setup
In second terminal:
1. Navigate to the backend directory:
    ```bash
    cd StudentCards
    cd backend
    ```
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Apply migrations:
    ```bash
    py manage.py migrate
    ```
4. Populate database locally:
    ```bash
    py manage.py populate_database
    ```
5. Start the development server:
    ```bash
    py manage.py runserver
    ```
    *⚠️ **Important**: Make sure the server is running on port `8000` and accessible at `http://127.0.0.1:8000/`. If it runs on any other port, update the `BASE_URL` value accordingly in `frontend/src/api/api.js`.*
6. Remove database locally:
    ```bash
    py manage.py flush
    ```

## Usage

### Playing Flashcards
1. Navigate to the Card Sets section.
2. Select a flashcard set to begin by clicking play.
3. Use the "Next" and "Previous" buttons to navigate through cards.
4. Click on a card to flip and reveal the answer.

### Managing Flashcards (Logged-in Users)
1. Log in or create an account.
2. Go to the 'Card Sets' section.
3. You will now see the 'Your private card sets' section.
4. Play with your personal flashcard sets.
5. Use the provided options to create, edit, add, or delete flashcards.

## Contribution
To contribute to the project:
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add your message here"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Create a pull request.


## Authors
- [Oliwia Strzelec](https://github.com/StrzelecO)
- [Kamil Marszałek](https://github.com/KamilMarshal)
- [Piotr Matoszka](https://github.com/qsqus)
