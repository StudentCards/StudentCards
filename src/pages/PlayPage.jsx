import { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { getCardSetDetails } from '../api/set-api.js';

const PlayPage = () => {
	// Zakładamy, że `cardSet` zawiera dane zestawu, np. [{ id: 1, question: "Q1", answer: "A1" }]
	const [cardSet, setCardSet] = useState([{id: 0, question: '', answer: ''}]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [title, setTitle] = useState('');

	const {id} = useParams();

	useEffect(() => {
		const fetchCardSetDetails = async (id) => {
			const response = await getCardSetDetails(id);

			if (response.success) {
				setCardSet(response.data.flashcards);
				setTitle(response.data.flashcard_set.title);
				setCurrentCardIndex(0);
			} else {
				// Error
			}
		}

		fetchCardSetDetails(id);

	}, [id]);

	const handleNextCard = () => {
		setShowAnswer(false);
		setCurrentCardIndex(prevIndex =>
			prevIndex + 1 < cardSet.length ? prevIndex + 1 : 0
		);
	};

	const handlePreviousCard = () => {
		setShowAnswer(false);
		setCurrentCardIndex(prevIndex =>
			prevIndex - 1 >= 0 ? prevIndex - 1 : cardSet.length - 1
		);
	};

	return (
		<div className='mt-20  flex flex-col items-center justify-center'>			
			<h1 className='text-2xl text-white font-bold mb-6'>
				{title}
			</h1>

			<div className='bg-white p-6 rounded-lg shadow-lg w-96 text-center'>
				<p className='text-lg font-semibold mb-4'>
					Card {currentCardIndex + 1} of {cardSet.length}
				</p>
				<div
					className='flex items-center justify-center h-48 p-4 rounded-lg mb-4 cursor-pointer bg-indigo-300'
					onClick={() => setShowAnswer(!showAnswer)}
				>
					{showAnswer ? (
						<p className='text-xl font-bold'>Answer: {cardSet[currentCardIndex].answer}</p>
					) : (
						<p className='text-xl font-bold'>
							Question: {cardSet[currentCardIndex].question}
						</p>
					)}
				</div>

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
};

export default PlayPage;
