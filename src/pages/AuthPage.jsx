import {useState} from 'react';
import Label from '../components/formComponents/Label.jsx';
import InputField from '../components/formComponents/InputField.jsx';
import Header from '../components/formComponents/Header.jsx';
import {LOGIN_URL, REGISTER_URL} from "../api/api.js";

const AuthPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    // isLoginMode == False -> register mode
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // add confirm passwd in register mode
        if (!isLoginMode) {
            if (data.password !== data.confirmPassword) {
                setErrorMessage('Passwords do not match!');
                setLoading(false);
				return;
            }
            delete data.confirmPassword; // remove unnecessary field for the backend
        }
        // w trybie register trzeba sprawdzić czy nazwa nie jest zajęta

        const preparedData = JSON.stringify(data);
        console.log(preparedData);

        const endpoint = isLoginMode
            ? LOGIN_URL
            : REGISTER_URL;

        // Wysyłanie danych do backendu
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: preparedData,
            });

            const result = await response.json();
            console.log(result)

            if (response.ok) {
                // Po zalogowaniu zapisz token w localStorage
                if (isLoginMode) {
                    localStorage.setItem('authToken', result.token);
                    // alert('Logged in successfully!');
                    // przekierowanie do /sets -- niedostępne dla niezalogowanego użytkownika
                    window.location.href = '/sets';
                } else {
                    alert('Account created successfully! Please log in.');
                    setIsLoginMode(true);
                }
            } else {
                // Obsługa błędów zwróconych przez backend
                setErrorMessage(result.detail || 'An error occurred.');
            }
        } catch (error) {
            setErrorMessage('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
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
                    {errorMessage && (
                        <p className='text-red-600 text-center mb-4'>{errorMessage}</p>
                    )}
                    <button
                        type='submit'
                        className={`w-full ${
                            loading ? 'bg-gray-400' : 'bg-indigo-600'
                        } text-white font-bold py-2 sm:py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300`}
                        disabled={loading}
                    >
                        {loading
                            ? 'Processing...'
                            : isLoginMode
                                ? 'Log In'
                                : 'Sign Up'}
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
