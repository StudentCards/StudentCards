import { apiCall, getApiCallConfig, FLASHCARD_SETS_URL, PUBLIC_FLASHCARD_SETS_URL } from './api.js';
import axios from 'axios';

export const getCardSets = async () => {
    const response = await apiCall(() => axios.get(FLASHCARD_SETS_URL, getApiCallConfig()), true);
    return response
};

export const getPublicCardSets = async () => {
    const response = await apiCall(() => axios.get(PUBLIC_FLASHCARD_SETS_URL), true);
    return response;
};

export const getCardSetDetails = async (id) => {
    const response = await apiCall(() => axios.get(`${FLASHCARD_SETS_URL}${id}/`, getApiCallConfig()), true);
    return response;
}

export const postCardSet = async (data, returnResponseData = false) => {
    const response = await apiCall(() => axios.post(FLASHCARD_SETS_URL, data, getApiCallConfig()), returnResponseData);
    return response;
}

export const putCardSet = async (data) => {
    const response = await apiCall(() => axios.put(`${FLASHCARD_SETS_URL}${data.id}/`, data, getApiCallConfig()));
    return response;
}

export const deleteCardSet = async (id) => {
    const response = await apiCall(() => axios.delete(`${FLASHCARD_SETS_URL}${id}/`, getApiCallConfig()));
    return response;
}
