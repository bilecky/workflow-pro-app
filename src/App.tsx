import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/home/Home'
import Register from './components/auth/register'
import BackgroundShape from './helpers/BackgroundShape'

// import { useEffect } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { app, database } from './firebase/firebaseConfig';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<BackgroundShape />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/about' element={<Register />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
