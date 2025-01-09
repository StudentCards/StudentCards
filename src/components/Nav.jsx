import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {LOGOUT_URL} from "../api/api.js";

const Nav = () => {
	const [username, setUsername] = useState('');

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			setUsername(localStorage.getItem('username'));
		}
	}, []);

	const handleLogout = async () => {
		try {
			const refreshToken = localStorage.getItem("refreshToken");
			await fetch(LOGOUT_URL, {
				method: "POST", headers: {
					"Content-Type": "application/json",
				}, body: JSON.stringify({"refresh_token": refreshToken}),
			});

			// Usuń tokeny z localStorage
			localStorage.removeItem("refresh_token");
			localStorage.removeItem('authToken');

			// Przekieruj na stronę logowania
			window.location.href = "/auth";
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className=' bg-opacity-10 text-white shadow-md'>
			<nav className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16 text-md'>
					<ul className=' items-end flex space-x-6'>
						<li>
							<Link
								to='/'
								className='md:text-2xl font-bold hover:text-indigo-100'
							>
								StudentCards
							</Link>
						</li>
						<li>
							<Link to='/sets' className='hover:text-indigo-100 md:text-xl'>
								Card Sets
							</Link>
						</li>
					</ul>
					<div className='block'>
						{username === '' ? (
							<Link
								to='/auth'
								className='bg-indigo-500 px-5 py-2 rounded-md hover:bg-indigo-400 transition-colors'
							>
								Login
							</Link>
						) : (

							<div className='flex justify-end items-center'>
								<p className='text-xl mx-5 text-indigo-200 tracking-tighter'>
									{username}
								</p>
								<button
									className='bg-indigo-500 px-5 py-2 rounded-md hover:bg-indigo-400 transition-colors'
									onClick={handleLogout}
								>
									Log out
								</button>
							</div>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
