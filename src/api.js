const BASE_URL = 'http://127.0.0.1:8000/';
const FLASHCARDS_URL = `${BASE_URL}flashcards/`;
const FLASHCARD_SETS_URL = `${BASE_URL}flashcard-sets/`;
const PUBLIC_FLASHCARD_SETS_URL = `${FLASHCARD_SETS_URL}public`;


export const getPrivateCardSets = async token => {
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


