const Header = ({ title, subtitle }) => (
	<>
		<h2 className='text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mb-4 sm:mb-6'>
			{title}
		</h2>
		<p className='text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8'>
			{subtitle}
		</p>
	</>
);
export default Header;
