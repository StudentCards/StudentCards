import CardSets from '../components/CardSets.jsx';
import { useState, useEffect } from 'react';
import { getCardSets, getPublicCardSets } from '../api/set-api.js';
import CreateSetModal from '../components/CreateSetModal.jsx';

const CardSetsPage = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [cardSets, setCardSets] = useState([]);
	const [publicCardSets, setPublicCardSets] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			setIsUserLoggedIn(true);
			fetchCardSets(token);
		}
		else setIsUserLoggedIn(false);

		fetchPublicCardSets();
	}, []);

	const fetchCardSets = async token => {
		const response = await getCardSets(token);
		
		if (response.success) {
			setCardSets(response.data || [])
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

	const handleCreateNewSet = e => {
		e.preventDefault();

		const formData = new FormData(event.target);
		const title = formData.get('title');
		const description = formData.get('description');
		// is ID generation needed here or it's just next number added in database ?

		// send data to backend

		setIsModalOpen(false);
	};

	return (
		<main className='my-10'>
			{isUserLoggedIn && (
				<section className='relative bg-indigo-700 rounded-md pb-16'>
					<CardSets title='Your private card sets' cardSets={cardSets} />
					<button
						onClick={() => setIsModalOpen(true)}
						className='absolute right-5 px-4 p-2 rounded-md transition-all hover:scale-105 hover:bg-indigo-300 text-indigo-950 bg-indigo-200'
					>
						Create new card set
					</button>
				</section>
			)}
			<CardSets title='Public card sets' cardSets={publicCardSets} />
			{isModalOpen && (
				<CreateSetModal
					handleCreateNewSet={handleCreateNewSet}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
		</main>
	);
};
export default CardSetsPage;
