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

	// useEffect and fetch funcs - IMPLEMENTATION NEEDS AN UPDATE
	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			setIsUserLoggedIn(true);
			fetchCardSets(token);
		}
		fetchPublicCardSets();
	}, []);

	const fetchCardSets = async token => {
		const response = await getCardSets(token);
		
		if (response.success) {
			console.log(response.data)
			if(response.data.length !== 0){
				setCardSets(response.data);
			}
			// setCardSets(response.data || []); wersja docelowa po dodaniu setów do bazy

		} else {
			// setError(response.errMessage);
		}
	};

	const fetchPublicCardSets = async () => {
		const response = await getPublicCardSets();

		if (response.success) {
			console.log(response.data)
			if(response.data.length !== 0){
				setPublicCardSets(response.data);
			}
			// setPublicCardSets(response.data || []); wersja docelowa po dodaniu setów do bazy

		} else {
			// setError(response.errMessage);
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
