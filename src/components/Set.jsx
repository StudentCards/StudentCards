import { Link } from 'react-router-dom';
const Set = ({ id, title, description }) => {
	return (
		<div className='relative w-full h-full pb-12 rounded-md bg-indigo-100 text-black'>
			<h3 className='text-xl mb-4 tracking-wide font-medium'>{title}</h3>
			<p>{description}</p>
			
			<Link
				to={`/play/${id}`}
				className='absolute bottom-0 right-0 px-4 py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-400 hover:scale-95 transition-all'
			>
				PLAY
			</Link>
		</div>
	);
};

export default Set;
