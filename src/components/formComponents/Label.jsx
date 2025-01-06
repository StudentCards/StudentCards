const Label = ({ children, ...props }) => {
	return (
		<label
			{...props}
			className='block text-sm sm:text-base text-gray-700 font-medium mb-2'
		>
			{children}
		</label>
	);
};

export default Label;
