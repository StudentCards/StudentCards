import { useState } from 'react';
import Label from '../components/fromComponents/Label';
import InputField from '../components/fromComponents/InputField';
import Header from '../components/fromComponents/Header';

const AuthPage = () => {
	const [isLoginMode, setIsLoginMode] = useState(true);

	const handleSubmit = e => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		// add confirm passwd in register mode
		if (!isLoginMode) {
			if (data.password !== data.confirmPassword) {
				console.error('Passwords do not match!');
				return;
			}
			delete data.confirmPassword; // remove unnecessary field for the backend
		}
		// w trybie register trzeba sprawdzić czy nazwa nie jest zajęta

		const preparedData = JSON.stringify(data);
		console.log(preparedData);

		// Wysyłanie danych do backendu:    DOSTOSOWAĆ IMPLEMENTACJE
		// fetch('https://api.example.com/auth', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
		//   body: preparedData,
		// })
		//   .then(response => response.json())
		//   .then(result => console.log('Success:', result))
		//   .catch(error => console.error('Error:', error));

		// CZEGO UŻYWAMY ??

		// BRAKUJE IMPLEMNTACJI CO PO ZALOGOWANIU
	};

	return (
		<div className='flex items-start justify-center my-5 md:my-20'>
			<div className='w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8'>
				<Header
					title={isLoginMode ? 'Welcome Back' : 'Create Account'}
					subtitle={
						isLoginMode ? 'Log in to your account.' : 'Sign up to get started.'
					}
				/>
				<form onSubmit={handleSubmit}>
					<div className='mb-4 sm:mb-6'>
						<Label htmlFor='email'>Username</Label>
						<InputField
							name='username'
							type='text'
							id='username'
							placeholder='Enter your user name'
						/>
					</div>
					<div className='mb-4 sm:mb-6'>
						<Label htmlFor='password'>Password</Label>
						<InputField
							name='password'
							type='password'
							id='password'
							placeholder='Enter your password'
						/>
					</div>
					{!isLoginMode && (
						<div className='mb-6'>
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<InputField
								name='confirmPassword'
								type='password'
								id='confirmPassword'
								placeholder='Confirm your password'
							/>
						</div>
					)}
					<button
						type='submit'
						className='w-full bg-indigo-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300'
					>
						{isLoginMode ? 'Log In' : 'Sign Up'}
					</button>
				</form>
				<p className='text-center text-sm sm:text-base text-gray-600 mt-6 sm:mt-8'>
					{isLoginMode
						? "Don't have an account? "
						: 'Already have an account? '}
					<button
						type='button'
						onClick={() => setIsLoginMode(!isLoginMode)}
						className='text-indigo-600 font-bold hover:underline'
					>
						{isLoginMode ? 'Sign up' : 'Log in'}
					</button>
				</p>
			</div>
		</div>
	);
};

export default AuthPage;
