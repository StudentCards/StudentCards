import CardSets from '../components/CardSets.jsx';
import { useState, useEffect } from 'react';
import { getCardSets, getPublicCardSets } from '../api/set-api.js';
import ManageSetModal from '../components/modals/ManageSetModal.jsx';

const CardSetsPage = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

	const [cardSets, setCardSets] = useState([]);
	const [publicCardSets, setPublicCardSets] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	const emptySetData = { 'id': 0, 'title': '', 'description': '', 'is_public': false };
	const [cardSetData, setCardSetData] = useState(emptySetData);
	const [isCardSetModalOpen, setIsCardSetModalOpen] = useState(false);

	useEffect(() => {
		setIsLoading(true)
		const token = localStorage.getItem('authToken');
		if (token) {
			setIsUserLoggedIn(true);
			fetchCardSets(token);
		} else setIsUserLoggedIn(false);

		fetchPublicCardSets();
		setIsLoading(false)
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

	const handleCreateCardSet = () => {
		setIsCardSetModalOpen(true);
	};

	return (
		<main className='my-10'>
			{isUserLoggedIn && (
				<section className='relative bg-indigo-700 rounded-md pb-16'>
					<CardSets
						isLoading={isLoading}
						title='Your card sets'
						cardSets={cardSets}
					/>
					<button
						onClick={handleCreateCardSet}
						className='absolute right-5 px-4 p-2 rounded-md transition-all hover:scale-105 hover:bg-indigo-300 text-indigo-950 bg-indigo-200'
					>
						Create new card set
					</button>
				</section>
			)}
			<CardSets
				isLoading={isLoading}
				title='Public card sets'
				cardSets={publicCardSets}
			/>

			{isCardSetModalOpen &&
				<ManageSetModal selectedSet={cardSetData} setIsOpen={setIsCardSetModalOpen} />
			}
		</main >
	);
};
export default CardSetsPage;
