import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
	return (
		<main className='mx-auto max-w-4xl p-20'>
			<div className='flex flex-col justify-center items-center text-center text-white'>
				<FontAwesomeIcon
					className='animate-pulse  size-44 md:size-60 md:m-10 '
					icon={faGraduationCap}
				/>
				<h1 className='text-2xl font-bold mb-4'>Welcome to StudentCards!</h1>
				<p className='text-lg max-w-screen-sm'>
					This app will help you learn through interactive flashcards.
				</p>
				<p className='text-lg max-w-screen-sm'>
					Log in to create your own sets of questions or use available public
					examples.
				</p>
			</div>
		</main>
	);
};

export default HomePage;
