import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillAlert, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<header>
			<nav className='bg-gray-800 py-4'>
				<div className='max-w-7xl mx-auto px-4'>
					<div className='flex justify-between items-center'>
						<div>
							<Link to='/' className='flex items-center text-white'>
								<AiFillAlert className='w-6 h-6 mr-2' />
								<span className='font-bold text-xl ml-3'>Workflow Pro</span>
							</Link>
						</div>
						<div className='hidden sm:block'>
							<ul className='space-y-4 flex flex-col h-full justify-start'>
								<li>
									<Link
										to='/dashboard'
										className='block text-gray-800 hover:text-gray-600 py-2'
										onClick={toggleMenu}
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										to='/login'
										className='block text-gray-800 hover:text-gray-600 py-2'
										onClick={toggleMenu}
									>
										Login
									</Link>
								</li>
								<li>
									<Link
										to='/register'
										className='block text-gray-800 hover:text-gray-600 py-2'
										onClick={toggleMenu}
									>
										Register
									</Link>
								</li>

								<li className='bg-black text-center '>
									<p className='text-gray-500 text-sm bg-black'>
										Designed & developed by Pawel Bilski
									</p>
								</li>
							</ul>
						</div>
						<div className='sm:hidden relative'>
							<button
								type='button'
								className='text-white hover:text-gray-300 focus:outline-none'
								onClick={toggleMenu}
							>
								<AiOutlineMenu />
							</button>

							<div
								className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${
									isOpen ? 'layer-on' : 'menu-off'
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
										<AiOutlineClose />
									</button>
									<ul className='space-y-4 flex flex-col h-full justify-start'>
										<li>
											<Link
												to='/dashboard'
												className='block text-gray-800 hover:text-gray-600 py-2'
												onClick={toggleMenu}
											>
												Dashboard
											</Link>
										</li>
										<li>
											<Link
												to='/login'
												className='block text-gray-800 hover:text-gray-600 py-2'
												onClick={toggleMenu}
											>
												Login
											</Link>
										</li>
										<li>
											<Link
												to='/register'
												className='block text-gray-800 hover:text-gray-600 py-2'
												onClick={toggleMenu}
											>
												Register
											</Link>
										</li>
										<li className='flex-grow'></li>

										<li className=' text-center'>
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
