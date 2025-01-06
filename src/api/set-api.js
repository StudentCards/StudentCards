import { apiCall, FLASHCARD_SETS_URL, PUBLIC_FLASHCARD_SETS_URL } from './api.js';
import axios from 'axios';

export const getCardSets = async token => {
    try {
    	const response = await fetch(FLASHCARD_SETS_URL, {
    		method: 'GET',
    		headers: {
    			Authorization: `Bearer ${token}`,
    			'Content-Type': 'application/json',
    		},
    	});

    	if (!response.ok) {
    		throw new Error('Failed to fetch private card sets');
    	}
        
    	const data = await response.json();
        console.log(data)
        return {'success': true, 'data': data};
    } catch (err) {
    	console.log(err);
        return {'success': false, 'errMessage': err.message};
    }
};

export const getPublicCardSets = async () => {
    try {
        const response = await fetch(PUBLIC_FLASHCARD_SETS_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch public card sets');
        }

        const data = await response.json();
        return {'success': true, 'data': data};
    } catch (err) {
        console.log(err);
        return {'success': false, 'errMessage': err.message};
    }
};

export const getCardSetDetails = async (id) => {
    try {
        const response = await fetch(`${FLASHCARD_SETS_URL}${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch card set details');
        }

        const data = await response.json();
        return {'success': true, 'data': data};
    } catch (err) {
        console.log(err);
        return {'success': false, 'errMessage': err.message};
    }
}

export const postCardSet = async (data) => {
    const response = await apiCall(() => axios.post(FLASHCARD_SETS_URL, data));
    return response;
}

export const putCardSet = async (data) => {
    const response = await apiCall(() => axios.put(`${FLASHCARD_SETS_URL}${data.id}`, data));
    return response;
}

export const deleteCardSet = async (id) => {
    const response = await apiCall(() => axios.delete(`${FLASHCARD_SETS_URL}${id}`));
    return response;
}
