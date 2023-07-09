import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../firebase/firebaseConfig'
import { setAuthenticated, setRegistered } from '../../redux/authSlice'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState<string>('')

	const [password, setPassword] = useState<string>('')
	const dispatch = useDispatch()

	const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		try {
			await createUserWithEmailAndPassword(auth, email, password)
			console.log('rejestracja zakonczona sukcesem')
			dispatch(setRegistered(true))
			dispatch(setAuthenticated(true))
			navigate('/')
		} catch (error) {
			console.log('registration problem', error)
		}
	}

	return (
		<div className='flex items-center justify-center h-[80vh] '>
			<form onSubmit={handleSubmit} className='bg-white shadow-md p-12'>
				<h3 className='text-xl font-bold mb-4'>Sign Up</h3>
				<div className='mb-4'>
					<label htmlFor='email' className=' block mb-2'>
						Email:
					</label>
					<input
						className='w-full border border-gray-300 p-2'
						type='email'
						id='email'
						value={email}
						onChange={handleEmail}
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='password' className=' block mb-2'>
						Password{' '}
					</label>
					<input
						className='w-full border border-gray-300 p-2'
						type='password'
						id='password'
						value={password}
						onChange={handlePassword}
					/>
				</div>
				<button className='bg-lime-400 py-3 px-5 my-2 transition hover:bg-lime-500 hover:text-white'>
					Register!
				</button>
			</form>
		</div>
	)
}

export default Register
