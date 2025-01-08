import Set from '../components/Set.jsx';

const CardSets = ({ title, cardSets, isLoading }) => {
	const infoStyles = 'border-b p-4 text-gray-300 text-center';
	return (
		<main className='mx-10 p-4 text-white my-10 '>
			<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 '>
				{title}
			</h1>
			{!isLoading && cardSets.length == 0 && (
				<p className={infoStyles}>
					There are no sets available yet or you have lost connection to
					database.
				</p>
			)}
			{isLoading && <p className={infoStyles}>Fetching flashcards...</p>}
			<ul className='mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
				{cardSets.map(set => (
					<li
						key={set.id}
						className='text-md p-4 bg-indigo-100 rounded-lg shadow-md hover:shadow-xl transition-shadow'
					>
						<Set id={set.id} title={set.title} description={set.description} />
					</li>
				))}
			</ul>
		</main>
	);
};
export default CardSets;
