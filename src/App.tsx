import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/home/Home'
import BackgroundShape from './helpers/BackgroundShape'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/Dashboard/Dashboard'
import ProjectDetails from './components/Dashboard/Project'
import PopularProjects from './components/projects/PopularProjects'

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
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/projects/:id' element={<ProjectDetails />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
