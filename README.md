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

> [!Important]
> Make sure the server is running on port `8000` and accessible at `http://127.0.0.1:8000/`. If it runs on any other port, update the `BASE_URL` value accordingly in `frontend/src/api/api.js`.

    
5. Remove database locally:
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
   
## Preview (Screenshots)

These screenshots provide a visual overview of the user interface and demonstrate the main functionalities of the app.

### Registration Form
![Registration Form](https://github.com/user-attachments/assets/63392116-f409-4467-b78d-83e92adda80a)
*A registration form that allows users to create a new account and get started with the app. *

### Card Sets
![Card Sets](https://github.com/user-attachments/assets/a263358b-8e4f-46a0-97a2-62f7427460bd)
*Display of flashcard sets, including both private (owned by the logged-in user) and public sets. *

### Flashcard Game
![Flashcard Game](https://github.com/user-attachments/assets/2f7c69ea-aeb0-4700-9d9b-951edb65d71c)
*A screen showcasing the flashcard game, where users can engage with flashcards to test their knowledge in an interactive way.*

### Set Management
![Set Management](https://github.com/user-attachments/assets/a3574c04-f019-47a8-bba5-07a59d95f984)
*A screen for managing flashcard sets, allowing users to create, edit, and delete their personal sets.*

### Mobile version
<div style="display: flex; justify-content: space-around;">
  <img src="https://github.com/user-attachments/assets/e6d949f6-c902-4059-99f2-5b45b93b294d" width="18%"/>
  <img src="https://github.com/user-attachments/assets/a7f4bf1c-b415-4f81-8635-1288cce0fbf9" width="18%"/>
  <img src="https://github.com/user-attachments/assets/c2b36777-c7df-46b5-a176-fd3a661bceb1" width="18%"/>
  <img src="https://github.com/user-attachments/assets/5ffc893b-0511-4bb7-814c-256bc2680198" width="18%"/>
  <img src="https://github.com/user-attachments/assets/1526bd60-23bd-4dc0-9f64-b35da005169d" width="18%"/>
</div>

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
