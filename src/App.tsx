import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/home/Home'

// import { useEffect } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { app, database } from './firebase/firebaseConfig';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
