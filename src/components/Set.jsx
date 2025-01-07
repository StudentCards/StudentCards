import { Link } from 'react-router-dom';
const Set = ({ id, title, description }) => {
	const btnClasses = 'absolute bottom-0  px-2 py-1 rounded-md uppercase text-white bg-indigo-500 hover:bg-indigo-400 hover:scale-95 transition-all'
	return (
		<div className='relative w-full h-full pb-12 rounded-md bg-indigo-100 text-black'>
			<h3 className='text-xl mb-4 tracking-wide font-medium'>{title}</h3>
			<p>{description}</p>

			<Link
				to={`/play/${id}`}
				className={`${btnClasses} right-0`}
			>
				play
			</Link>
			<Link
				to={`/manageSet/${id}`}
				className={`${btnClasses} right-16`}
			>
				manage
			</Link>
		</div>
	);
};

export default Set;
