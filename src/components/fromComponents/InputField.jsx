const InputField = ({ ...props }) => {
	return (
		<input
			{...props}
			className='w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
			required
		></input>
	);
};

export default InputField;
