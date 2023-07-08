import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/home/Home'
import Register from './components/auth/register'

// import { useEffect } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { app, database } from './firebase/firebaseConfig';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<img
				src='/src/assets/png-image.png'
				alt='background shape'
				className='top-0 opacity-20  -z-10 absolute w-full h-full '
			/>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/about' element={<Register />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
