import CardSets from '../components/CardSets.jsx';
import { useState, useEffect } from 'react';
import {getCardSets, getPublicCardSets} from '../api/set-api.js';

const dummySet1 = [
	{
		id: 1,
		title: 'Spanish',
		description: 'Words translations - chapter "Family"',
	},
	{ id: 2, title: 'History', description: 'Dates from World War II' },
	{ id: 3, title: 'Math', description: 'Abbreviated multiplication table' },
	{ id: 4, title: 'Physics', description: 'Formulas for "Electromagnetism"' },
	{ id: 5, title: 'Chemistry', description: 'Abbreviated periodic table' },
];

const dummySet2 = [
	{
		id: 1,
		title: 'Biology',
		description: 'Human body',
	},
	{ id: 2, title: 'Geography', description: 'Capitals of the world' },
	{
		id: 3,
		title: 'Computer Science',
		description: 'Basic concepts of programming',
	},
];

const CardSetsPage = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
	const [cardSets, setCardSets] = useState(dummySet2);
	const [publicCardSets, setPublicCardSets] = useState(dummySet1);

	// update this when auth/login backend is ready
	useEffect(() => {
		const token = '';
		if (token) {
			setIsUserLoggedIn(true);
		}
		fetchCardSets('dummy token'); // Tymczasowo poza if-em, usunąć jak będzie backend dla użytkownika 

		fetchPublicCardSets();
	}, []);

	const fetchCardSets = async token => {
		const response = await getCardSets(token);
		
		if (response.success) {
			setCardSets(response.data || []);
		} else {
			// setError(response.errorMessage);
		}
	};

	const fetchPublicCardSets = async () => {
		const response = await getPublicCardSets();

		if (response.success) {
			setPublicCardSets(response.data || []);
		} else {
			// setError(response.errorMessage);
		}
	};

	return (
		<main className='text-white my-10'>
			{isUserLoggedIn && (
				<section className='relative bg-indigo-700 rounded-md pb-16'>
					<CardSets title='Your card sets' cardSets={cardSets} />
					<button className='absolute right-5 px-4 p-2 rounded-md transition-all hover:scale-105 hover:bg-indigo-300 text-indigo-950 bg-indigo-200'>
						Create new card set
					</button>
				</section>
			)}
			<CardSets title='Public card sets' cardSets={publicCardSets} />
		</main>
	);
};
export default CardSetsPage;
