import { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { getCardSetDetails } from '../api/set-api.js';
import Flashcard from '../components/Flashcard.jsx';

function PlayPage() {
	const [flashcards, setFlashcards] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');

	const {id} = useParams();

	useEffect(() => {
		const fetchCardSetDetails = async (id) => {
			const response = await getCardSetDetails(id);
			if (response.success) {
				setFlashcards(response.data.flashcards);
				setTitle(response.data.flashcard_set.title);
				setCurrentIndex(0);
		
				flashcards.length > 0 || setMessage('This flashcard set is empty 😥');
			} else {
				// Error
			}
		}

		fetchCardSetDetails(id);

	}, [id]);

	const handleNextCard = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % flashcards.length);
	};

	const handlePreviousCard = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
		);
	};
	if (flashcards.length === 0) {
		return (
			<div className='mt-20  flex flex-col items-center justify-center'>	
				<h1 className='text-2xl text-white font-bold mb-6'>
					{message}
				</h1>
			</div>
		);
	}
	
	return (
		<div className='mt-20  flex flex-col items-center justify-center'>			
			<h1 className='text-2xl text-white font-bold mb-6'>
				{title}
			</h1>

			<div className='bg-white p-6 rounded-lg shadow-lg w-96 text-center'>
				<p className='text-lg font-semibold mb-4'>
					Card {currentIndex + 1} of {flashcards.length}
				</p>
				<Flashcard key={currentIndex} card={flashcards[currentIndex]} />

				<div className='flex justify-between pt-6'>
					<button
						onClick={handlePreviousCard}
						className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded'
					>
						Previous
					</button>
					<button
						onClick={handleNextCard}
						className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded'
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}

export default PlayPage;
