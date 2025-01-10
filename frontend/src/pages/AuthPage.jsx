import { useState, useRef } from 'react';
import Label from '../components/formComponents/Label.jsx';
import InputField from '../components/formComponents/InputField.jsx';
import Header from '../components/formComponents/Header.jsx';
import { login, register } from '../api/auth';
import validatePassword from '../utils/passwordValidation';

const AuthPage = () => {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const formRef = useRef(null);

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		setErrorMessage('');
		setSuccessMessage('');

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		if (!isLoginMode) {
			if (data.password !== data.confirmPassword) {
				setErrorMessage('Passwords do not match!');
				setLoading(false);
				return;
			}

			const passwordError = validatePassword(data.password);
			if (passwordError) {
				setErrorMessage(passwordError);
				setLoading(false);
				return;
			}

			delete data.confirmPassword;
		}

		try {
			if (isLoginMode) {
				const result = await login(data);
				localStorage.setItem('authToken', result.access_token);
				localStorage.setItem('refreshToken', result.refresh_token);
				localStorage.setItem('username', result.username);
				window.location.href = '/sets';
			} else {
				await register(data);
				setSuccessMessage('Account created successfully! Please log in.');
				formRef.current.reset();
				setIsLoginMode(true);
			}
		} catch (error) {
			setErrorMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	const toggleMode = () => {
		setIsLoginMode(!isLoginMode);
		setErrorMessage('');
		setSuccessMessage('');
		formRef.current.reset();
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
				<form ref={formRef} onSubmit={handleSubmit}>
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
					{errorMessage && (
						<p className='text-red-600 text-center mb-4'>{errorMessage}</p>
					)}
					{successMessage && (
						<p className='text-green-600 text-center mb-4'>{successMessage}</p>
					)}
					<button
						type='submit'
						className={`w-full ${
							loading ? 'bg-gray-400' : 'bg-indigo-600'
						} text-white font-bold py-2 sm:py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300`}
						disabled={loading}
					>
						{loading ? 'Processing...' : isLoginMode ? 'Log In' : 'Sign Up'}
					</button>
				</form>
				<p className='text-center text-sm sm:text-base text-gray-600 mt-6 sm:mt-8'>
					{isLoginMode
						? "Don't have an account? "
						: 'Already have an account? '}
					<button
						type='button'
						onClick={toggleMode}
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
