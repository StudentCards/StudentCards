import { apiCall, FLASHCARDS_URL } from './api.js';
import axios from 'axios';

export const getFlashcard = async (id) => {
    const response = await apiCall(() => axios.get(`${FLASHCARDS_URL}${id}/`), true);
    return response;
}

export const postFlashcard = async (data) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const response = await apiCall(() => axios.post(FLASHCARDS_URL, data, { headers: { Authorization: `Bearer ${token}` } }));
        return response;
    }
}

export const putFlashcard = async (data) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const response = await apiCall(() => axios.put(`${FLASHCARDS_URL}${data.id}/`, data, { headers: { Authorization: `Bearer ${token}` } }));
        return response;
    }
}

export const deleteFlashcard = async (id) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const response = await apiCall(() => axios.delete(`${FLASHCARDS_URL}${id}/`, { headers: { Authorization: `Bearer ${token}` } }));
        return response;
    }
}
