import Set from '../components/Set.jsx';

const CardSets = ({ title, cardSets }) => {
	return (
		<main className='mx-10 p-4 text-white my-10'>
			<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 '>
				{title}
			</h1>
			<ul className='mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
				{cardSets.map(set => (
					<li
						key={set.id}
						className='text-md p-4 bg-indigo-100 rounded-lg shadow-md hover:shadow-xl transition-shadow'
					>
						<Set title={set.name} descripiotn={set.descripiotn} />
					</li>
				))}
			</ul>
		</main>
	);
};
export default CardSets;
