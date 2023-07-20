import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/home/Navbar'
import About from './components/home/About'
import Home from './components/home/Home'
import BackgroundShape from './helpers/BackgroundShape'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/Dashboard/Dashboard'
import ProjectDetails from './components/Dashboard/ProjectDetails'
import Footer from './components/home/Footer'
import AddProject from './components/Dashboard/AddProject'
import NewProjectsList from './components/projects/NewProjectsList'
import PopularProjectsList from './components/projects/PopularProjectsList'

// import { useEffect } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { app, database } from './firebase/firebaseConfig';

const App = () => {
	return (
		<Router>
			<Navbar />
			<BackgroundShape />
			<Routes>
				<Route path='/' element={<Home />} />

				<Route path='/about' element={<About />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/projects/:id' element={<ProjectDetails />} />
				<Route path='/addproject' element={<AddProject />} />
				<Route path='/newprojectslist' element={<NewProjectsList />} />
				<Route path='/popularprojectslist' element={<PopularProjectsList />} />
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
