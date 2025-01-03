import CardSets from '../components/CardSets.jsx';
import { useState, useEffect } from 'react';

const dummySet1 = [
	{
		id: 1,
		name: 'Spanish',
		descripiotn: 'Words translations - chapter "Family"',
	},
	{ id: 2, name: 'History', descripiotn: 'Dates from World War II' },
	{ id: 3, name: 'Math', descripiotn: 'Abbreviated multiplication table' },
	{ id: 4, name: 'Physics', descripiotn: 'Formulas for "Electromagnetism"' },
	{ id: 5, name: 'Chemistry', descripiotn: 'Abbreviated periodic table' },
];

const dummySet2 = [
	{
		id: 1,
		name: 'Biology',
		descripiotn: 'Human body',
	},
	{ id: 2, name: 'Geography', descripiotn: 'Capitals of the world' },
	{
		id: 3,
		name: 'Computer Science',
		descripiotn: 'Basic concepts of programming',
	},
];

const CardSetsPage = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
	const [privateCardSets, setPrivateCardSets] = useState(dummySet2);
	const [publicCardSets, setPublicCardSets] = useState(dummySet1);

	// useEffect and fetch funcs - IMPLEMENTATION NEEDS AN UPDATE
	useEffect(() => {
		// will token auth be used???
		const token = localStorage.getItem('authToken');
		if (token) {
			setIsUserLoggedIn(true);
			fetchPrivateCardSets(token);
		}
		fetchPublicCardSets();
	}, []);

	const fetchPrivateCardSets = async token => {
		// try {
		// 	const response = await fetch('/api/card-sets/private', {
		// 		method: 'GET',
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 			'Content-Type': 'application/json',
		// 		},
		// 	});

		// 	if (!response.ok) {
		// 		throw new Error('Failed to fetch private card sets');
		// 	}

		// 	const data = await response.json();
		// 	setPrivateCardSets(data.cardSets || []);
		// } catch (err) {
		// 	console.log(err);
		// 	// setError(err.message);
		// }
	};

	const fetchPublicCardSets = async () => {
		// try {
		// 	const response = await fetch('/api/card-sets/public', {
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	});

		// 	if (!response.ok) {
		// 		throw new Error('Failed to fetch public card sets');
		// 	}

		// 	const data = await response.json();
		// 	setPublicCardSets(data.cardSets || []);
		// } catch (err) {
		//	console.log(err)
		// 	// 	setError(err.message);
		// }
	};
	return (
		<main className='text-white my-10'>
			{isUserLoggedIn && (
				<section className='relative bg-indigo-700 rounded-md pb-16'>
					<CardSets title='Your private card sets' cardSets={privateCardSets} />
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
