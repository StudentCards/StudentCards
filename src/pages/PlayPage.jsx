import { useState } from 'react';
import Flashcard from '../components/Flashcard.jsx';

const flashcards = [
	{ id: 1, question: 'What is the capital of France?', answer: 'Paris' },
	{ id: 2, question: 'What is 2 + 2?', answer: '4' },
	{
		id: 3,
		question: 'Who wrote "Romeo and Juliet"?',
		answer: 'William Shakespeare',
	},
];

function PlayPage() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNextCard = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % flashcards.length);
	};

	const handlePreviousCard = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
		);
	};

	return (
		<div className='mt-20  flex flex-col items-center justify-center'>
			<h1 className='text-2xl text-white font-bold mb-6'>
				Practice Flashcards
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
