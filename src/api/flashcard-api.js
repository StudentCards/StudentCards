import { apiCall, FLASHCARDS_URL } from './api.js';
import axios from 'axios';

export const getFlashcard = async (id) => {
    const response = await apiCall(() => axios.get(`${FLASHCARDS_URL}${id}/`), true);
    return response;
}

export const postFlashcard = async (data) => {
    const response = await apiCall(() => axios.post(FLASHCARDS_URL, data));
    return response;
}

export const putFlashcard = async (data) => {
    const response = await apiCall(() => axios.put(`${FLASHCARDS_URL}${data.id}/`, data));
    return response;
}

export const deleteFlashcard = async (id) => {
    const response = await apiCall(() => axios.delete(`${FLASHCARDS_URL}${id}/`));
    return response;
}
