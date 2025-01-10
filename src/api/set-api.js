import { apiCall, FLASHCARD_SETS_URL, PUBLIC_FLASHCARD_SETS_URL } from './api.js';
import axios from 'axios';

export const getCardSets = async (token1) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const response = await apiCall(() => axios.get(FLASHCARD_SETS_URL, { headers: { Authorization: `Bearer ${token}` } }), true);
        return response;
    }
};

export const getPublicCardSets = async () => {
    const response = await apiCall(() => axios.get(PUBLIC_FLASHCARD_SETS_URL), true);
    return response;
};

export const getCardSetDetails = async (id) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const response = await apiCall(() => axios.get(`${FLASHCARD_SETS_URL}${id}/`, { headers: { Authorization: `Bearer ${token}` } }), true);
        return response;
    }
}

export const postCardSet = async (data, returnResponseData = false) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const response = await apiCall(() => axios.post(FLASHCARD_SETS_URL, data, { headers: { Authorization: `Bearer ${token}` } }), returnResponseData);
        return response;
    }
}

export const putCardSet = async (data) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const response = await apiCall(() => axios.put(`${FLASHCARD_SETS_URL}${data.id}/`, data, { headers: { Authorization: `Bearer ${token}` } }));
        return response;
    }
}

export const deleteCardSet = async (id) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const response = await apiCall(() => axios.delete(`${FLASHCARD_SETS_URL}${id}/`, { headers: { Authorization: `Bearer ${token}` } }));
        return response;
    }
}
