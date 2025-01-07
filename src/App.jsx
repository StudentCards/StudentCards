import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import HomePage from './pages/HomePage.jsx';
import CardSetsPage from './pages/CardSetsPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import PlayPage from './pages/PlayPage.jsx';
import './index.css';

function App() {
	return (
		<Router>
			<div className='flex flex-col items-center bg-gradient-to-b from-indigo-950 to-purple-950 min-h-screen'>
				<div className='w-full'>
					<Nav />
				</div>
				<div className='w-full max-w-4xl '>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/sets' element={<CardSetsPage />} />
						<Route path='/play/:id' element={<PlayPage />} />
						<Route path='/auth' element={<AuthPage />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
