const CreateSetModal = ({ handleCreateNewSet, setIsModalOpen }) => {
	const inputClasses = 'block w-full mb-2 p-2 rounded-md border border-gray-300';
	const buttonClasses = 'px-4 py-2 rounded-md transition-all hover:scale-105';
	const saveButtonClasses = 'hover:bg-green-300 text-green-950 bg-green-200 mr-2';
	const cancelButtonClasses = 'hover:bg-yellow-300 text-yellow-950 bg-yellow-200';

	const renderButtons = () => (
		<div className='flex justify-end'>
			<button
				type='submit'
				className={`${buttonClasses} ${saveButtonClasses}`}
			>
				Save
			</button>
			<button
				type='button'
				onClick={() => setIsModalOpen(false)}
				className={`${buttonClasses} ${cancelButtonClasses}`}
			>
				Cancel
			</button>
		</div>
	);

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white text-black p-6 rounded-lg shadow-lg w-96'>
				<h2 className='text-xl font-bold text-indigo-700 mb-4'>Create New Card Set</h2>
				<form onSubmit={handleCreateNewSet}>
					<input
						type='text'
						name='title'
						placeholder='Title'
						className={inputClasses}
						required
					/>
					<textarea
						name='description'
						placeholder='Description'
						className={inputClasses}
					/>
					{renderButtons()}
				</form>
			</div>
		</div>
	);
};

export default CreateSetModal;