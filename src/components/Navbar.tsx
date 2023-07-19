import React, { useState, useRef, useEffect, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { AiFillAlert, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { auth, onAuthStateChanged, signOut } from '../firebase/firebaseConfig'
import { saveUser } from '../redux/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {
	const menuRef = useRef<HTMLHeadingElement>(null)
	const navigate = useNavigate()

	const [isOpen, setIsOpen] = useState(false)
	const [logoutMenu, setLogoutMenu] = useState(false)

	const user = useSelector((state: RootState) => state.auth.value)
	const dispatch = useDispatch()

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				const email = user.email ? user.email.split('@')[0] : ''
				dispatch(saveUser(email))
			} else {
				dispatch(saveUser(undefined))
				navigate('/')
			}
		})
	}, [dispatch])

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	console.log(typeof user)
	const handleLogoutMenu = () => {
		setLogoutMenu(!logoutMenu)
	}

	const handleMenuClick = (event: globalThis.MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setLogoutMenu(false)
		}
	}

	const handleLogoutBtn = () => {
		signOut(auth)
		toggleMenu()
	}

	useEffect(() => {
		document.addEventListener('click', handleMenuClick)

		return () => {
			document.removeEventListener('click', handleMenuClick)
		}
	}, [])

	return (
		<header ref={menuRef}>
			<nav className='py-6 font-Montserrat'>
				<div className='lg:w-4/5 mx-auto px-6'>
					<div className='flex justify-between items-center'>
						<div>
							<Link to='/' className='flex items-center text-white'>
								<AiFillAlert className='w-6 h-6' />
								<h1 className='text-2xl font-bolder ml-3 text-lime-400'>Workflow Pro</h1>
							</Link>
						</div>
						<div className='hidden sm:block'>
							<nav>
								<ul className='space-x-4 flex'>
									<li>
										<Link to='/about' className='text-white relative group'>
											About
											<span className='absolute left-1/2 -bottom-1 h-0.5 bg-lime-400 transform -translate-x-1/2 w-0 transition-all duration-300 group-hover:w-full'></span>
										</Link>
									</li>
									{user && (
										<>
											<li>
												<Link
													to='/popularprojectslist'
													className='text-white relative group'
												>
													Browse Projects
													<span className='absolute left-1/2 -bottom-1 h-0.5 bg-lime-400 transform -translate-x-1/2 w-0 transition-all duration-300 group-hover:w-full'></span>
												</Link>
											</li>{' '}
											<li>
												<Link to='/dashboard' className='text-white relative group'>
													Dashboard
													<span className='absolute left-1/2 -bottom-1 h-0.5 bg-lime-400 transform -translate-x-1/2 w-0 transition-all duration-300 group-hover:w-full'></span>
												</Link>
											</li>
										</>
									)}

									{!user && (
										<>
											<li>
												<Link to='/login' className='text-white relative group'>
													Sign in
													<span className='absolute left-1/2 -bottom-1 h-0.5 bg-lime-400 transform -translate-x-1/2 w-0 transition-all duration-300 group-hover:w-full'></span>
												</Link>
											</li>
											<li>
												<Link to='/register' className='text-white relative group'>
													Sign up
													<span className='absolute left-1/2 -bottom-1 h-0.5 bg-lime-400 transform -translate-x-1/2 w-0 transition-all duration-300 group-hover:w-full'></span>
												</Link>
											</li>
										</>
									)}

									<li>
										<button
											onClick={handleLogoutMenu}
											className='text-white relative group'
										>
											{user && (
												<>
													{' '}
													Hi, <span className='font-semibold text-lime-400'>{user}</span>
												</>
											)}
											{logoutMenu && (
												<div className='absolute z-50 bg-slate-50 hover:text-lime-400 hover:bg-zinc-600 transition text-black -left-4 -bottom-14 '>
													<div onClick={handleLogoutBtn} className='px-6 py-3'>
														Logout
													</div>
												</div>
											)}
										</button>
									</li>
								</ul>
							</nav>
						</div>

						<div className='sm:hidden relative'>
							<button
								type='button'
								className='text-white hover:text-gray-300 focus:outline-none'
								onClick={toggleMenu}
							>
								<AiOutlineMenu size={28} />
							</button>

							<div
								className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${
									isOpen ? 'layer-on' : 'layer-off'
								}`}
							>
								<div
									className={`bg-white w-3/5 h-full px-4 py-8 absolute right-0 top-0 ${
										isOpen ? 'menu-on' : 'menu-off'
									}`}
								>
									<button
										type='button'
										className='focus:outline-none absolute right-5 top-5'
										onClick={toggleMenu}
									>
										<AiOutlineClose size={28} />
									</button>
									<ul className='space-y-4 flex flex-col h-full justify-start m-4'>
									<li>
											<Link
												to='/about'
												className='inline-block text-gray-800 hover:text-gray-600 py-2'
												onClick={toggleMenu}
											>
												About
											</Link>
										</li>
								{	user &&	<li>
											<Link
												to='/dashboard'
												className='inline-block text-gray-800 hover:text-gray-600 py-2'
												onClick={toggleMenu}
											>
												Dashboard
											</Link>
										</li>}
										<li>
											<Link
												to='/popularprojectslist'
												className='inline-block text-gray-800 hover:text-gray-600 py-2'
												onClick={toggleMenu}
											>
												Browse projects
											</Link>
										</li>
										{user && <li onClick={handleLogoutBtn}>Logout</li>}
										{!user && (
											<>
												<li>
													<Link
														to='/login'
														className='inline-block text-gray-800 hover:text-gray-600 py-2'
														onClick={toggleMenu}
													>
														Sign in
													</Link>
												</li>
												<li>
													<Link
														to='/register'
														className='inline-block text-gray-800 hover:text-gray-600 py-2'
														onClick={toggleMenu}
													>
														Sign up
													</Link>
												</li>
											</>
										)}
										<li className='flex-grow'></li>

										<li className='text-center'>
											<p className='text-gray-500 text-sm'>
												Designed &amp; developed by Pawel Bilski
											</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
