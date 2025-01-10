const BASE_URL = 'http://127.0.0.1:8000/';

export const FLASHCARDS_URL = `${BASE_URL}flashcards/`;
export const FLASHCARD_SETS_URL = `${BASE_URL}flashcard-sets/`;
export const PUBLIC_FLASHCARD_SETS_URL = `${FLASHCARD_SETS_URL}public/`;
export const LOGIN_URL = `${BASE_URL}auth/login/`;
export const REGISTER_URL = `${BASE_URL}auth/registration/`;
export const LOGOUT_URL = `${BASE_URL}auth/logout/`;


export const apiCall = async (func, returnResponseData = false) => {
    try {
        const response = await func();

        if (returnResponseData) {
            return { 'success': true, 'data': response.data };
        } else {
            return { 'success': true };
        }
    } catch (error) {
        console.log(error);
        return { 'success': false, 'errorMessage': error.message };
    }
}

export const getApiCallConfig = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
}

// authToken refreshToken