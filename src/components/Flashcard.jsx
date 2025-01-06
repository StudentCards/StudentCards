import { useState } from 'react';

const Flashcard = ({ card }) => {
	const [showAnswer, setShowAnswer] = useState(false);

	return (
		<div
			className={`group flex items-center justify-center h-48 p-4 rounded-lg mb-4 cursor-pointer bg-indigo-400 [perspective:1000px]`}
			onClick={() => setShowAnswer(!showAnswer)}
		>
			<div
				className={`relative w-full h-full transition-all duration-500 transform [transform-style:preserve-3d] ${
					showAnswer ? '[transform:rotateY(180deg)]' : ''
				}`}
			>
				{/* Front side */}
				<div className='absolute w-full h-full flex items-center justify-center p-4 rounded-lg bg-indigo-300 [backface-visibility:hidden]'>
					<p className='text-xl font-bold' style={{ whiteSpace: 'pre-line' }}>
						Question: {'\n'}
						{card.question}
					</p>
				</div>

				{/* Back side */}
				<div className='absolute w-full h-full flex items-center justify-center p-4 rounded-lg bg-indigo-500 [transform:rotateY(180deg)] [backface-visibility:hidden]'>
					<p className='text-xl font-bold' style={{ whiteSpace: 'pre-line' }}>
						Answer: {'\n'}
						{card.answer}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Flashcard;

