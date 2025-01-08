// src/api/auth.js

import { LOGIN_URL, REGISTER_URL } from './api';

// Funkcja logowania
export const login = async (data) => {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.detail || 'Login failed');
    }
    return result; // Zwraca token i inne dane
};

// Funkcja rejestracji
export const register = async (data) => {
    const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.detail || 'Registration failed');
    }
    return result; // Zwraca wiadomość o sukcesie
};
